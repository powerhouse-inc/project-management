import { applyInvariants } from "./projects.js";
import type { Deliverable, KeyResult } from "../../gen/schema/types.js";
import type { ScopeOfWorkDeliverablesOperations } from "@powerhousedao/project-management/document-models/scope-of-work";

export const scopeOfWorkDeliverablesOperations: ScopeOfWorkDeliverablesOperations = {
  addDeliverableOperation(state, action) {

    const deliverable: Deliverable = {
      id: action.input.id,
      owner: action.input.owner || null,
      title: action.input.title || "",
      code: action.input.code || "",
      description: action.input.description || "",
      status: action.input.status || "DRAFT",
      workProgress: null,
      keyResults: [],
      budgetAnchor: {
        project: '',
        unit: "Hours",
        unitCost: 0,
        quantity: 0,
        margin: 0,
      },
    };

    state.deliverables.push(deliverable);

  },
  removeDeliverableOperation(state, action) {

    if (action.input.id === undefined) {
      throw new Error("Invalid deliverable id input");
    }

    const deliverable = state.deliverables.find((deliverable) => String(deliverable.id) === String(action.input.id));
    if (!deliverable) {
      throw new Error("Deliverable not found");
    }

    // remove deliverable from deliverable sets in milestone and project
    const roadmap = state.roadmaps.find((roadmap) => roadmap.milestones.find((milestone) => milestone?.scope?.deliverables?.includes(action.input.id)));
    const milestone = roadmap?.milestones.find((milestone) => milestone?.scope?.deliverables?.includes(action.input.id));
    if (milestone && milestone.scope) {
      milestone.scope.deliverables = milestone.scope.deliverables?.filter((deliverable) => String(deliverable) !== String(action.input.id));
    }

    const project = state.projects.find((project) => project.scope?.deliverables.includes(action.input.id));
    if (project && project.scope) {
      project.scope.deliverables = project.scope.deliverables?.filter((deliverable) => String(deliverable) !== String(action.input.id));
    }


    state.deliverables = state.deliverables.filter((deliverable) => String(deliverable.id) !== String(action.input.id));
    applyInvariants(state, ["budget", "margin", "progress"]);

  },
  editDeliverableOperation(state, action) {

    const deliverable = state.deliverables.find((deliverable) => String(deliverable.id) === String(action.input.id));
    if (!deliverable) {
      throw new Error("Deliverable not found");
    }

    const updatedDeliverable = {
      ...deliverable,
      owner: action.input.owner || deliverable.owner,
      title: action.input.title || deliverable.title,
      code: action.input.code || deliverable.code,
      description: action.input.description || deliverable.description,
      status: action.input.status || deliverable.status,
    }

    state.deliverables = state.deliverables.map((deliverable) => String(deliverable.id) === String(action.input.id) ? updatedDeliverable : deliverable);
    applyInvariants(state, ["progress"]);

  },
  setDeliverableProgressOperation(state, action) {
    const deliverable = state.deliverables.find((deliverable) => String(deliverable.id) === String(action.input.id));
    if (!deliverable) {
      throw new Error("Deliverable not found");
    }

    const updatedDeliverable = {
      ...deliverable,
      workProgress: action.input.workProgress ?
        (action.input.workProgress.percentage !== undefined && action.input.workProgress.percentage !== null) ?
          { value: action.input.workProgress.percentage } :
          action.input.workProgress.storyPoints ?
            { total: action.input.workProgress.storyPoints.total, completed: action.input.workProgress.storyPoints.completed } :
            action.input.workProgress.done !== undefined && action.input.workProgress.done !== null ?
              { done: action.input.workProgress.done } :
              deliverable.workProgress
        : deliverable.workProgress,
    }

    updatedDeliverable.status = 'IN_PROGRESS';
    if (deliverableIsCompleted(updatedDeliverable) && !["WONT_DO", "DELIVERED", "CANCELED"].includes(updatedDeliverable.status)) {
      updatedDeliverable.status = "DELIVERED";
    }

    state.deliverables = state.deliverables.map((deliverable) => String(deliverable.id) === String(action.input.id) ? updatedDeliverable : deliverable);
    applyInvariants(state, ["progress"]);


  },
  addKeyResultOperation(state, action) {

    const updatedDeliverable = state.deliverables.find((deliverable) => String(deliverable.id) === String(action.input.deliverableId));
    if (!updatedDeliverable) {
      throw new Error("Deliverable not found");
    }

    const keyResult = {
      id: action.input.id,
      title: action.input.title || "",
      link: action.input.link || "",
    }

    updatedDeliverable.keyResults.push(keyResult);
    state.deliverables = state.deliverables.map((deliverable) => String(deliverable.id) === String(action.input.deliverableId) ? updatedDeliverable : deliverable);


  },
  removeKeyResultOperation(state, action) {

    const updatedDeliverable = state.deliverables.find((deliverable) => String(deliverable.id) === String(action.input.deliverableId));
    if (!updatedDeliverable) {
      throw new Error("Deliverable not found");
    }

    updatedDeliverable.keyResults = updatedDeliverable.keyResults.filter((keyResult) => String(keyResult.id) !== String(action.input.id));
    state.deliverables = state.deliverables.map((deliverable) => String(deliverable.id) === String(action.input.deliverableId) ? updatedDeliverable : deliverable);


  },
  editKeyResultOperation(state, action) {
    if (action.input.id === undefined || action.input.deliverableId === undefined) {
      throw new Error("Invalid key result id or deliverable id input");
    }

    const updatedDeliverable = state.deliverables.find((deliverable) => String(deliverable.id) === String(action.input.deliverableId));
    if (!updatedDeliverable) {
      throw new Error("Deliverable not found");
    }

    const keyResult = updatedDeliverable.keyResults.find((keyResult) => String(keyResult.id) === String(action.input.id));

    const updatedKeyResult = {
      ...keyResult,
      title: action.input.title || keyResult?.title,
      link: action.input.link || keyResult?.link,
    }

    updatedDeliverable.keyResults = updatedDeliverable.keyResults?.map((keyResult) => String(keyResult.id) === String(action.input.id) ? updatedKeyResult : keyResult) as KeyResult[];
    state.deliverables = state.deliverables.map((deliverable) => String(deliverable.id) === String(action.input.deliverableId) ? updatedDeliverable : deliverable);

  },
  setDeliverableBudgetAnchorProjectOperation(state, action) {
    const foundDeliverable = state.deliverables.find((deliverable) => String(deliverable.id) === String(action.input.deliverableId));
    if (!foundDeliverable) {
      throw new Error("Deliverable not found");
    }

    Object.assign(foundDeliverable, { budgetAnchor: { ...foundDeliverable.budgetAnchor, ...action.input } });

    state.deliverables = state.deliverables.map((deliverable) => String(deliverable.id) === String(action.input.deliverableId) ? foundDeliverable : deliverable);

    // Only apply budget and progress invariants, not margin invariant when setting margin
    // This prevents the margin from being recalculated and overriding user input
    applyInvariants(state, ['budget', 'progress']);
  },
};


const deliverableIsCompleted = (deliverable: any) => {

  if (deliverable.workProgress?.done === true) {
    return true;
  }

  if (deliverable.workProgress?.value === 100) {
    return true;
  }

  if (deliverable.workProgress?.completed === deliverable.workProgress?.total && deliverable.workProgress?.total > 0) {
    return true;
  }

  return false;
}