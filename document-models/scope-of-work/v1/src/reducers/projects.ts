import type {
  ScopeOfWorkState,
  Deliverable,
  DeliverablesSet,
  Progress,
  StoryPoint,
  Percentage,
  Binary,
  DeliverableStatus,
} from "../../gen/schema/types.js";
import type { ScopeOfWorkProjectsOperations } from "@powerhousedao/project-management/document-models/scope-of-work/v1";

export const scopeOfWorkProjectsOperations: ScopeOfWorkProjectsOperations = {
  addProjectOperation(state, action) {
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
        progress: {
          value: 0,
        },
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
    Object.assign(project, action.input);
  },
  updateProjectOwnerOperation(state, action) {
    const project = state.projects.find((p) => p.id === action.input.id);
    if (!project) {
      throw new Error("Project not found");
    }
    project.projectOwner = action.input.projectOwner;
  },
  removeProjectOperation(state, action) {
    // remove deliverables linked to project from project scope
    const project = state.projects.find((p) => p.id === action.input.projectId);
    if (project?.scope?.deliverables) {
      project.scope.deliverables.forEach((deliverableId) => {
        state.deliverables = state.deliverables.filter(
          (d) => d.id !== deliverableId,
        );
      });
    }

    state.projects = state.projects.filter(
      (p) => p.id !== action.input.projectId,
    );
    applyInvariants(state, ["budget", "margin"]);
  },
  setProjectMarginOperation(state, action) {
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
      .filter((d): d is Deliverable => d !== undefined);

    projectDeliverables.forEach((deliverable: Deliverable) => {
      if (deliverable.budgetAnchor) {
        deliverable.budgetAnchor = {
          ...deliverable.budgetAnchor,
          margin: action.input.margin,
        };
      }
    });

    applyInvariants(state, ["budget"]);
  },
  setProjectTotalBudgetOperation(state, action) {
    const project = state.projects.find((p) => p.id === action.input.projectId);
    if (!project) {
      throw new Error("Project not found");
    }
    project.budget = action.input.totalBudget;
    applyInvariants(state, ["margin"]);
  },
  addProjectDeliverableOperation(state, action) {
    // add deliverable to deliverables
    const newDeliverable: Deliverable = {
      id: action.input.deliverableId,
      owner: "",
      title: action.input.title,
      icon: "",
      code: "",
      description: "",
      status: "DRAFT",
      workProgress: {
        value: 0,
      },
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

    const project = state.projects.find((p) => p.id === action.input.projectId);
    if (!project) {
      throw new Error("Project not found");
    }
    if (!project.scope) {
      throw new Error("Project deliverable set not found");
    }
    project.scope.deliverables.push(newDeliverable.id);
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
    applyInvariants(state, ["budget", "margin", "progress"]);
  },
};

export const applyInvariants = (state: ScopeOfWorkState, updates: string[]) => {
  if (updates.includes("budget")) {
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
  }

  if (updates.includes("margin")) {
    state.projects.forEach((project) => {
      if (project.scope) {
        const margin = project.budget
          ? project.budget / calculateTotalCost(state, project.scope)
          : 0;
        const deliverables = project.scope.deliverables
          .map((id) => state.deliverables.find((d) => d.id === id))
          .filter((d): d is Deliverable => d !== undefined);
        deliverables.forEach((deliverable) => {
          if (deliverable.budgetAnchor) {
            deliverable.budgetAnchor = {
              ...deliverable.budgetAnchor,
              margin,
            };
          }
        });
      }
    });
  }

  if (updates.includes("progress")) {
    calculateDeliverableSetsProgress(state);
  }
};

export const calculateTotalCost = (
  state: ScopeOfWorkState,
  deliverableSet: DeliverablesSet,
) => {
  const deliverables = deliverableSet.deliverables
    .map((id) => state.deliverables.find((d) => d.id === id))
    .filter((d): d is Deliverable => d !== undefined);
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
    .filter((d): d is Deliverable => d !== undefined);
  const totalBudget = deliverables.reduce((acc, deliverable) => {
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
const isStoryPointsProgress = (progress: Progress): progress is StoryPoint => {
  return (
    "total" in progress &&
    typeof progress.total === "number" &&
    "completed" in progress &&
    typeof progress.completed === "number"
  );
};

// Helper function to determine if a deliverable uses percentage progress
const isPercentageProgress = (progress: Progress): progress is Percentage => {
  return "value" in progress && typeof progress.value === "number";
};

// Helper function to determine if a deliverable uses binary progress
const isBinaryProgress = (progress: Progress): progress is Binary => {
  return "done" in progress;
};

// Helper function to calculate percentage equivalent for any progress type
const getPercentageEquivalent = (deliverable: Deliverable): number => {
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
const shouldIgnoreDeliverable = (status: DeliverableStatus): boolean => {
  return status === "CANCELED" || status === "WONT_DO";
};

// Helper function to calculate progress for a single deliverable set
const calculateDeliverableSetProgress = (
  state: ScopeOfWorkState,
  deliverableSet: DeliverablesSet,
) => {
  // Get all deliverables in this set, filtering out ignored ones
  const deliverables = deliverableSet.deliverables
    .map((id) => state.deliverables.find((d) => d.id === id))
    .filter(
      (d): d is Deliverable =>
        d !== undefined && !shouldIgnoreDeliverable(d.status),
    );

  if (deliverables.length === 0) {
    // No valid deliverables, set default progress
    deliverableSet.progress = { value: 0 };
    deliverableSet.deliverablesCompleted = { total: 0, completed: 0 };
    return;
  }

  // Determine if ALL deliverables use story points
  const allUseStoryPoints = deliverables.every(
    (d) => d.workProgress && isStoryPointsProgress(d.workProgress),
  );

  if (allUseStoryPoints) {
    let totalStoryPoints = 0;
    let completedStoryPoints = 0;

    deliverables.forEach((deliverable) => {
      if (
        deliverable.workProgress &&
        isStoryPointsProgress(deliverable.workProgress)
      ) {
        totalStoryPoints += deliverable.workProgress.total;
        completedStoryPoints += deliverable.workProgress.completed;
      }
    });

    deliverableSet.progress = {
      total: totalStoryPoints,
      completed: completedStoryPoints,
    };
  } else {
    const percentages = deliverables.map((d) => getPercentageEquivalent(d));
    const averagePercentage =
      percentages.length > 0
        ? percentages.reduce((sum, p) => sum + p, 0) / percentages.length
        : 0;

    deliverableSet.progress = {
      value: Math.round(averagePercentage * 100) / 100,
    };
  }

  // Update deliverablesCompleted count
  const completedDeliverables = deliverables.filter(
    (d) =>
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
