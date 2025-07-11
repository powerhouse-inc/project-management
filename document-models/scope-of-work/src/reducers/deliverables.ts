/**
 * This is a scaffold file meant for customization:
 * - modify it by implementing the reducer functions
 * - delete the file and run the code generator again to have it reset
 */

import type { ScopeOfWorkDeliverablesOperations } from "../../gen/deliverables/operations.js";
import type { KeyResult } from "../../gen/types.js";

export const reducer: ScopeOfWorkDeliverablesOperations = {
  addDeliverableOperation(state, action, dispatch) {
    try {

      const deliverable = {
        id: action.input.id,
        owner: action.input.owner || "",
        title: action.input.title || "",
        code: action.input.code || "",
        description: action.input.description || "",
        status: action.input.status || "DRAFT",
        workProgress: null,
        keyResults: [],
      };

      state.deliverables.push(deliverable);
    } catch (error) {
      console.error(error);
    }
  },
  removeDeliverableOperation(state, action, dispatch) {
    try {

      if (action.input.id === undefined) {
        throw new Error("Invalid deliverable id input");
      }

      const deliverable = state.deliverables.find((deliverable) => String(deliverable.id) === String(action.input.id));
      if (!deliverable) {
        throw new Error("Deliverable not found");
      }

      state.deliverables = state.deliverables.filter((deliverable) => String(deliverable.id) !== String(action.input.id));
    } catch (error) {
      console.error(error);
    }
  },
  editDeliverableOperation(state, action, dispatch) {
    try {

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

    } catch (error) {
      console.error(error);
    }
  },
  setDeliverableProgressOperation(state, action, dispatch) {
    try {
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
          action.input.workProgress.binary !== undefined && action.input.workProgress.binary !== null ? 
            { isBinary: action.input.workProgress.binary } :
          deliverable.workProgress
        : deliverable.workProgress,
      }

      state.deliverables = state.deliverables.map((deliverable) => String(deliverable.id) === String(action.input.id) ? updatedDeliverable : deliverable);

    } catch (error) {
      console.error(error);
    }
  },
  addKeyResultOperation(state, action, dispatch) {
    try {

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

    } catch (error) {
      console.error(error);
    }
  },
  removeKeyResultOperation(state, action, dispatch) {
    try {

      const updatedDeliverable = state.deliverables.find((deliverable) => String(deliverable.id) === String(action.input.deliverableId));
      if (!updatedDeliverable) {
        throw new Error("Deliverable not found");
      }

      updatedDeliverable.keyResults = updatedDeliverable.keyResults.filter((keyResult) => String(keyResult.id) !== String(action.input.id));
      state.deliverables = state.deliverables.map((deliverable) => String(deliverable.id) === String(action.input.deliverableId) ? updatedDeliverable : deliverable);

    } catch (error) {
      console.error(error);
    }
  },
  editKeyResultOperation(state, action, dispatch) {
    try {
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

    } catch (error) {
      console.error(error);
    }
  }
};
