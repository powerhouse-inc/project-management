import type { ScopeOfWorkProjectsOperations } from "document-models/scope-of-work/v1";
import {
  InvalidProjectBudgetError,
  InvalidProjectMarginError,
  ProjectAlreadyExistsError,
  ProjectDeliverableAlreadyExistsError,
  ProjectNotFoundError,
} from "../../gen/projects/error.js";
import type {
  Deliverable,
  DeliverablesSet,
  ScopeOfWorkState,
} from "../../gen/schema/types.js";
import { deleteDeliverables } from "./lookup.js";
import { percentageProgress, storyPointsProgress } from "./progress.js";
import { isSet } from "./util.js";

export const scopeOfWorkProjectsOperations: ScopeOfWorkProjectsOperations = {
  addProjectOperation(state, action) {
    if (state.projects.some((p) => p.id === action.input.id)) {
      throw new ProjectAlreadyExistsError(
        `Project with ID ${action.input.id} already exists`,
      );
    }

    const project = {
      id: action.input.id,
      code: action.input.code,
      title: action.input.title,
      slug: action.input.slug || "",
      projectOwner: action.input.projectOwner || null,
      abstract: action.input.abstract || null,
      imageUrl: action.input.imageUrl || null,
      budgetType: action.input.budgetType || "CAPEX",
      currency: action.input.currency || "USD",
      budget: action.input.budget || 0,
      expenditure: {
        percentage: 0,
        actuals: 0,
        cap: 0,
      },
      scope: {
        deliverables: [],
        status: "DRAFT" as const,
        progress: percentageProgress(0),
        deliverablesCompleted: {
          total: 0,
          completed: 0,
        },
      },
    };
    state.projects.push(project);
  },
  updateProjectOperation(state, action) {
    const project = state.projects.find((p) => p.id === action.input.id);
    if (!project) {
      throw new Error("Project not found");
    }

    const { input } = action;
    // required fields ignore an explicit null; nullable fields accept it as "clear"
    if (isSet(input.title)) project.title = input.title;
    if (isSet(input.code)) project.code = input.code;
    if (isSet(input.slug)) project.slug = input.slug;
    if (input.abstract !== undefined) project.abstract = input.abstract;
    if (input.imageUrl !== undefined) project.imageUrl = input.imageUrl;
    if (input.budgetType !== undefined) project.budgetType = input.budgetType;
    if (input.currency !== undefined) project.currency = input.currency;
    if (input.budget !== undefined) project.budget = input.budget;
  },
  updateProjectOwnerOperation(state, action) {
    const project = state.projects.find((p) => p.id === action.input.id);
    if (!project) {
      throw new Error("Project not found");
    }
    project.projectOwner = action.input.projectOwner;
  },
  removeProjectOperation(state, action) {
    const project = state.projects.find((p) => p.id === action.input.projectId);
    if (!project) {
      throw new ProjectNotFoundError("Project not found");
    }

    // the project's deliverables go with it, wherever else they were listed
    deleteDeliverables(state, [...(project.scope?.deliverables ?? [])]);

    state.projects = state.projects.filter(
      (p) => p.id !== action.input.projectId,
    );
    applyInvariants(state);
  },
  setProjectMarginOperation(state, action) {
    if (action.input.margin < 0) {
      throw new InvalidProjectMarginError("Margin must be zero or positive");
    }

    const project = state.projects.find((p) => p.id === action.input.projectId);
    if (!project) {
      throw new Error("Project not found");
    }

    const projectDeliverableSet = project.scope;
    if (!projectDeliverableSet) {
      throw new Error("Project deliverable set not found`");
    }
    if (projectDeliverableSet.deliverables.length < 1) {
      throw new Error("Project deliverable set has no deliverables");
    }

    const projectDeliverables = projectDeliverableSet.deliverables
      .map((id) => state.deliverables.find((d) => d.id === id))
      .filter((d) => d !== undefined);

    projectDeliverables.forEach((deliverable: Deliverable) => {
      if (deliverable.budgetAnchor) {
        deliverable.budgetAnchor = {
          ...deliverable.budgetAnchor,
          margin: action.input.margin,
        };
      }
    });

    applyInvariants(state);
  },
  setProjectTotalBudgetOperation(state, action) {
    const { totalBudget } = action.input;
    if (totalBudget < 0) {
      throw new InvalidProjectBudgetError(
        "Total budget must be zero or positive",
      );
    }

    const project = state.projects.find((p) => p.id === action.input.projectId);
    if (!project) {
      throw new Error("Project not found");
    }

    const cost = project.scope ? calculateTotalCost(state, project.scope) : 0;
    if (cost === 0 && totalBudget > 0) {
      throw new InvalidProjectBudgetError(
        "Cannot set a total budget on a project without costed deliverables",
      );
    }
    if (totalBudget < cost) {
      throw new InvalidProjectBudgetError(
        `Total budget cannot be lower than the total cost (${cost})`,
      );
    }

    // budget = cost × (1 + margin/100)  ⇒  margin = (budget / cost − 1) × 100
    const margin = cost > 0 ? (totalBudget / cost - 1) * 100 : 0;
    for (const id of project.scope?.deliverables ?? []) {
      const deliverable = state.deliverables.find((d) => d.id === id);
      if (deliverable?.budgetAnchor) {
        deliverable.budgetAnchor = { ...deliverable.budgetAnchor, margin };
      }
    }

    project.budget = totalBudget;
    applyInvariants(state);
  },
  addProjectDeliverableOperation(state, action) {
    // resolve the target first: a throw after mutating would leave an orphan deliverable behind
    const project = state.projects.find((p) => p.id === action.input.projectId);
    if (!project) {
      throw new Error("Project not found");
    }
    if (!project.scope) {
      throw new Error("Project deliverable set not found");
    }
    if (
      state.deliverables.some(
        (d) => String(d.id) === String(action.input.deliverableId),
      )
    ) {
      throw new ProjectDeliverableAlreadyExistsError(
        `Deliverable with ID ${action.input.deliverableId} already exists`,
      );
    }

    const newDeliverable: Deliverable = {
      id: action.input.deliverableId,
      owner: "",
      title: action.input.title,
      icon: "",
      code: "",
      description: "",
      status: "DRAFT",
      workProgress: percentageProgress(0),
      keyResults: [],
      budgetAnchor: {
        project: action.input.projectId,
        unit: "Hours",
        unitCost: 0,
        quantity: 0,
        margin: 0,
      },
    };

    state.deliverables.push(newDeliverable);
    project.scope.deliverables.push(newDeliverable.id);
    applyInvariants(state);
  },
  removeProjectDeliverableOperation(state, action) {
    const project = state.projects.find((p) => p.id === action.input.projectId);
    if (!project) {
      throw new Error("Project not found");
    }
    if (!project.scope) {
      throw new Error("Project deliverable set not found");
    }
    project.scope.deliverables = project.scope.deliverables.filter(
      (d) => d !== action.input.deliverableId,
    );

    state.deliverables = state.deliverables.map((deliverable) => {
      return String(deliverable.id) === String(action.input.deliverableId)
        ? {
            ...deliverable,
            budgetAnchor: {
              project: "",
              unit: deliverable.budgetAnchor?.unit || "Hours",
              unitCost: deliverable.budgetAnchor?.unitCost || 0,
              quantity: deliverable.budgetAnchor?.quantity || 0,
              margin: deliverable.budgetAnchor?.margin || 0,
            },
          }
        : deliverable;
    });
    applyInvariants(state);
  },
};

/**
 * Re-derive everything that depends on the deliverables, in dependency order:
 * budgets (from the anchors) for every project and milestone, then progress.
 * Every operation that touches a deliverable or a scope calls this.
 */
export const applyInvariants = (state: ScopeOfWorkState) => {
  state.projects.forEach((project) => {
    if (project.scope) {
      project.budget = calculateTotalBudget(state, project.scope);
    }
  });
  state.roadmaps.forEach((roadmap) => {
    roadmap.milestones.forEach((milestone) => {
      if (milestone.scope) {
        milestone.budget = calculateTotalBudget(state, milestone.scope);
      }
    });
  });

  calculateDeliverableSetsProgress(state);
};

export const calculateTotalCost = (
  state: ScopeOfWorkState,
  deliverableSet: DeliverablesSet,
) => {
  const deliverables = deliverableSet.deliverables
    .map((id) => state.deliverables.find((d) => d.id === id))
    .filter((deliverable) => deliverable !== undefined);
  const totalCost = deliverables.reduce((acc, deliverable) => {
    return (
      acc +
      (deliverable.budgetAnchor?.unitCost || 0) *
        (deliverable.budgetAnchor?.quantity || 0)
    );
  }, 0);
  return totalCost === 0 ? 0 : Number(totalCost.toFixed(2));
};

const calculateTotalBudget = (
  state: ScopeOfWorkState,
  deliverableSet: DeliverablesSet,
) => {
  const deliverables = deliverableSet.deliverables
    .map((id) => state.deliverables.find((d) => d.id === id))
    .filter((deliverable) => deliverable !== undefined);
  const totalBudget = deliverables.reduce((acc, deliverable) => {
    // margin is a percentage (e.g. 5 means 5%): multiplier (1 + margin/100)
    return (
      acc +
      (deliverable.budgetAnchor?.unitCost || 0) *
        (deliverable.budgetAnchor?.quantity || 0) *
        (1 + (deliverable.budgetAnchor?.margin || 0) / 100)
    );
  }, 0);
  return totalBudget === 0 ? 0 : Number(totalBudget.toFixed(2));
};

// Helper function to determine if a deliverable uses story points
const isStoryPointsProgress = (
  progress: any,
): progress is { total: number; completed: number } => {
  return (
    progress &&
    typeof progress.total === "number" &&
    typeof progress.completed === "number"
  );
};

// Helper function to determine if a deliverable uses percentage progress
const isPercentageProgress = (progress: any): progress is { value: number } => {
  return progress && typeof progress.value === "number";
};

// Helper function to determine if a deliverable uses binary progress
const isBinaryProgress = (progress: any): progress is { done: boolean } => {
  return progress && typeof progress.done === "boolean";
};

// Helper function to calculate percentage equivalent for any progress type
const getPercentageEquivalent = (deliverable: any): number => {
  if (!deliverable.workProgress) {
    return 0;
  }

  const progress = deliverable.workProgress;

  if (isPercentageProgress(progress)) {
    return progress.value;
  }

  if (isStoryPointsProgress(progress)) {
    return progress.total > 0 ? (progress.completed / progress.total) * 100 : 0;
  }

  if (isBinaryProgress(progress)) {
    if (deliverable.status === "IN_PROGRESS") {
      return 50;
    }
    return progress.done ? 100 : 0;
  }

  return 0;
};

// Helper function to check if deliverable should be ignored
const shouldIgnoreDeliverable = (deliverable: any): boolean => {
  return deliverable.status === "CANCELED" || deliverable.status === "WONT_DO";
};

// Helper function to calculate progress for a single deliverable set
const calculateDeliverableSetProgress = (
  state: ScopeOfWorkState,
  deliverableSet: any,
) => {
  // Get all deliverables in this set, filtering out ignored ones
  const deliverables = deliverableSet.deliverables
    .map((id: string) => state.deliverables.find((d) => d.id === id))
    .filter(
      (deliverable: any) =>
        deliverable && !shouldIgnoreDeliverable(deliverable),
    );

  if (deliverables.length === 0) {
    // No valid deliverables, set default progress
    deliverableSet.progress = percentageProgress(0);
    deliverableSet.deliverablesCompleted = { total: 0, completed: 0 };
    return;
  }

  // Determine if ALL deliverables use story points
  const allUseStoryPoints = deliverables.every(
    (d: any) => d.workProgress && isStoryPointsProgress(d.workProgress),
  );

  if (allUseStoryPoints) {
    // 3.a) If StoryPoints only => deliverableSet.progress.completed = Sum (completed[i]), deliverableSet.progress.total = Sum (total[i])
    let totalStoryPoints = 0;
    let completedStoryPoints = 0;

    deliverables.forEach((deliverable: any) => {
      if (isStoryPointsProgress(deliverable.workProgress)) {
        totalStoryPoints += deliverable.workProgress.total;
        completedStoryPoints += deliverable.workProgress.completed;
      }
    });

    deliverableSet.progress = storyPointsProgress(
      totalStoryPoints,
      completedStoryPoints,
    );
  } else {
    // 3.b) If !storyPointsOnly => AVERAGE (percentageCompletedEquivalent[i])
    const percentages = deliverables.map((d: any) =>
      getPercentageEquivalent(d),
    );
    // the empty-set case returned early above, so percentages is never empty
    const averagePercentage =
      percentages.reduce((sum: number, p: number) => sum + p, 0) /
      percentages.length;

    deliverableSet.progress = percentageProgress(
      Math.round(averagePercentage * 100) / 100, // 2 decimal places
    );
  }

  // Update deliverablesCompleted count
  const completedDeliverables = deliverables.filter(
    (d: any) =>
      d.status === "DELIVERED" ||
      (d.workProgress &&
        isBinaryProgress(d.workProgress) &&
        d.workProgress.done),
  );

  deliverableSet.deliverablesCompleted = {
    total: deliverables.length,
    completed: completedDeliverables.length,
  };
};

const calculateDeliverableSetsProgress = (state: ScopeOfWorkState) => {
  // run through all deliverable sets in milestones, projects and calculate the progress from each deliverable
  // The progress has to be calculated for each deliverableSet inside a milestone or project
  /* For every set
    1) Remove / ignore CANCELLED or WONT_DO deliverables
    2) Determine storyPointsOnly = true or false
      if storyPointsOnly = true => set progress to StoryPoints on deliverableSet
      if storyPointsOnly = false => set progress to Percentage on deliverableSet
    (completed / total) * 100
    3.a) If StoryPoints only => deliverableSet.progress.completed = Sum (completed[i]), deliverableSet.progress.total = Sum (total[i])
    3.b) If !storyPointsOnly => AVERAGE (percentageCompletedEquivalent[i])
    percentageCompletedEquivalent[i] = 
    Progress.percentage ? percentageValue
    Progress.storyPoints ? completed / total
    Progress.binary ? (status = IN_PROGESS ) : 50% : ( completed ? 100 : 0 ))

  */

  // Process all deliverable sets in projects
  state.projects.forEach((project) => {
    if (project.scope) {
      calculateDeliverableSetProgress(state, project.scope);
    }
  });

  // Process all deliverable sets in milestones
  state.roadmaps.forEach((roadmap) => {
    roadmap.milestones.forEach((milestone) => {
      if (milestone.scope) {
        calculateDeliverableSetProgress(state, milestone.scope);
      }
    });
  });
};
