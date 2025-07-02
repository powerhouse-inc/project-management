import {
  type StateReducer,
  isDocumentAction,
  createReducer,
} from "document-model";
import { type ScopeOfWorkDocument, z } from "./types.js";

import { reducer as ScopeOfWorkReducer } from "../src/reducers/scope-of-work.js";
import { reducer as DeliverablesReducer } from "../src/reducers/deliverables.js";
import { reducer as RoadmapsReducer } from "../src/reducers/roadmaps.js";
import { reducer as MilestonesReducer } from "../src/reducers/milestones.js";
import { reducer as DeliverablesSetReducer } from "../src/reducers/deliverables-set.js";
import { reducer as AgentsReducer } from "../src/reducers/agents.js";

const stateReducer: StateReducer<ScopeOfWorkDocument> = (
  state,
  action,
  dispatch,
) => {
  if (isDocumentAction(action)) {
    return state;
  }

  switch (action.type) {
    case "EDIT_SCOPE_OF_WORK":
      z.EditScopeOfWorkInputSchema().parse(action.input);
      ScopeOfWorkReducer.editScopeOfWorkOperation(
        state[action.scope],
        action,
        dispatch,
      );
      break;

    case "ADD_DELIVERABLE":
      z.AddDeliverableInputSchema().parse(action.input);
      DeliverablesReducer.addDeliverableOperation(
        state[action.scope],
        action,
        dispatch,
      );
      break;

    case "REMOVE_DELIVERABLE":
      z.RemoveDeliverableInputSchema().parse(action.input);
      DeliverablesReducer.removeDeliverableOperation(
        state[action.scope],
        action,
        dispatch,
      );
      break;

    case "EDIT_DELIVERABLE":
      z.EditDeliverableInputSchema().parse(action.input);
      DeliverablesReducer.editDeliverableOperation(
        state[action.scope],
        action,
        dispatch,
      );
      break;

    case "SET_DELIVERABLE_PROGRESS":
      z.SetDeliverableProgressInputSchema().parse(action.input);
      DeliverablesReducer.setDeliverableProgressOperation(
        state[action.scope],
        action,
        dispatch,
      );
      break;

    case "ADD_KEY_RESULT":
      z.AddKeyResultInputSchema().parse(action.input);
      DeliverablesReducer.addKeyResultOperation(
        state[action.scope],
        action,
        dispatch,
      );
      break;

    case "REMOVE_KEY_RESULT":
      z.RemoveKeyResultInputSchema().parse(action.input);
      DeliverablesReducer.removeKeyResultOperation(
        state[action.scope],
        action,
        dispatch,
      );
      break;

    case "EDIT_KEY_RESULT":
      z.EditKeyResultInputSchema().parse(action.input);
      DeliverablesReducer.editKeyResultOperation(
        state[action.scope],
        action,
        dispatch,
      );
      break;

    case "ADD_ROADMAP":
      z.AddRoadmapInputSchema().parse(action.input);
      RoadmapsReducer.addRoadmapOperation(
        state[action.scope],
        action,
        dispatch,
      );
      break;

    case "REMOVE_ROADMAP":
      z.RemoveRoadmapInputSchema().parse(action.input);
      RoadmapsReducer.removeRoadmapOperation(
        state[action.scope],
        action,
        dispatch,
      );
      break;

    case "EDIT_ROADMAP":
      z.EditRoadmapInputSchema().parse(action.input);
      RoadmapsReducer.editRoadmapOperation(
        state[action.scope],
        action,
        dispatch,
      );
      break;

    case "ADD_MILESTONE":
      z.AddMilestoneInputSchema().parse(action.input);
      MilestonesReducer.addMilestoneOperation(
        state[action.scope],
        action,
        dispatch,
      );
      break;

    case "REMOVE_MILESTONE":
      z.RemoveMilestoneInputSchema().parse(action.input);
      MilestonesReducer.removeMilestoneOperation(
        state[action.scope],
        action,
        dispatch,
      );
      break;

    case "EDIT_MILESTONE":
      z.EditMilestoneInputSchema().parse(action.input);
      MilestonesReducer.editMilestoneOperation(
        state[action.scope],
        action,
        dispatch,
      );
      break;

    case "ADD_COORDINATOR":
      z.AddCoordinatorInputSchema().parse(action.input);
      MilestonesReducer.addCoordinatorOperation(
        state[action.scope],
        action,
        dispatch,
      );
      break;

    case "REMOVE_COORDINATOR":
      z.RemoveCoordinatorInputSchema().parse(action.input);
      MilestonesReducer.removeCoordinatorOperation(
        state[action.scope],
        action,
        dispatch,
      );
      break;

    case "EDIT_DELIVERABLES_SET":
      z.EditDeliverablesSetInputSchema().parse(action.input);
      DeliverablesSetReducer.editDeliverablesSetOperation(
        state[action.scope],
        action,
        dispatch,
      );
      break;

    case "ADD_DELIVERABLE_IN_SET":
      z.AddDeliverableInSetInputSchema().parse(action.input);
      DeliverablesSetReducer.addDeliverableInSetOperation(
        state[action.scope],
        action,
        dispatch,
      );
      break;

    case "REMOVE_DELIVERABLE_IN_SET":
      z.RemoveDeliverableInSetInputSchema().parse(action.input);
      DeliverablesSetReducer.removeDeliverableInSetOperation(
        state[action.scope],
        action,
        dispatch,
      );
      break;

    case "SET_PROGRESS_IN_DELIVERABLES_SET":
      z.SetProgressInDeliverablesSetInputSchema().parse(action.input);
      DeliverablesSetReducer.setProgressInDeliverablesSetOperation(
        state[action.scope],
        action,
        dispatch,
      );
      break;

    case "ADD_AGENT":
      z.AddAgentInputSchema().parse(action.input);
      AgentsReducer.addAgentOperation(state[action.scope], action, dispatch);
      break;

    case "REMOVE_AGENT":
      z.RemoveAgentInputSchema().parse(action.input);
      AgentsReducer.removeAgentOperation(state[action.scope], action, dispatch);
      break;

    case "EDIT_AGENT":
      z.EditAgentInputSchema().parse(action.input);
      AgentsReducer.editAgentOperation(state[action.scope], action, dispatch);
      break;

    default:
      return state;
  }
};

export const reducer = createReducer<ScopeOfWorkDocument>(stateReducer);
