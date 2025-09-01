// TODO: remove eslint-disable rules once refactor is done
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
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
import { reducer as ContributorsReducer } from "../src/reducers/contributors.js";
import { reducer as ProjectsReducer } from "../src/reducers/projects.js";

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
        (state as any)[action.scope],
        action as any,
        dispatch,
      );
      break;

    case "ADD_DELIVERABLE":
      z.AddDeliverableInputSchema().parse(action.input);
      DeliverablesReducer.addDeliverableOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );
      break;

    case "REMOVE_DELIVERABLE":
      z.RemoveDeliverableInputSchema().parse(action.input);
      DeliverablesReducer.removeDeliverableOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );
      break;

    case "EDIT_DELIVERABLE":
      z.EditDeliverableInputSchema().parse(action.input);
      DeliverablesReducer.editDeliverableOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );
      break;

    case "SET_DELIVERABLE_PROGRESS":
      z.SetDeliverableProgressInputSchema().parse(action.input);
      DeliverablesReducer.setDeliverableProgressOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );
      break;

    case "ADD_KEY_RESULT":
      z.AddKeyResultInputSchema().parse(action.input);
      DeliverablesReducer.addKeyResultOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );
      break;

    case "REMOVE_KEY_RESULT":
      z.RemoveKeyResultInputSchema().parse(action.input);
      DeliverablesReducer.removeKeyResultOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );
      break;

    case "EDIT_KEY_RESULT":
      z.EditKeyResultInputSchema().parse(action.input);
      DeliverablesReducer.editKeyResultOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );
      break;

    case "SET_DELIVERABLE_BUDGET_ANCHOR_PROJECT":
      z.SetDeliverableBudgetAnchorProjectInputSchema().parse(action.input);
      DeliverablesReducer.setDeliverableBudgetAnchorProjectOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );
      break;

    case "ADD_ROADMAP":
      z.AddRoadmapInputSchema().parse(action.input);
      RoadmapsReducer.addRoadmapOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );
      break;

    case "REMOVE_ROADMAP":
      z.RemoveRoadmapInputSchema().parse(action.input);
      RoadmapsReducer.removeRoadmapOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );
      break;

    case "EDIT_ROADMAP":
      z.EditRoadmapInputSchema().parse(action.input);
      RoadmapsReducer.editRoadmapOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );
      break;

    case "ADD_MILESTONE":
      z.AddMilestoneInputSchema().parse(action.input);
      MilestonesReducer.addMilestoneOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );
      break;

    case "REMOVE_MILESTONE":
      z.RemoveMilestoneInputSchema().parse(action.input);
      MilestonesReducer.removeMilestoneOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );
      break;

    case "EDIT_MILESTONE":
      z.EditMilestoneInputSchema().parse(action.input);
      MilestonesReducer.editMilestoneOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );
      break;

    case "ADD_COORDINATOR":
      z.AddCoordinatorInputSchema().parse(action.input);
      MilestonesReducer.addCoordinatorOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );
      break;

    case "REMOVE_COORDINATOR":
      z.RemoveCoordinatorInputSchema().parse(action.input);
      MilestonesReducer.removeCoordinatorOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );
      break;

    case "ADD_MILESTONE_DELIVERABLE":
      z.AddMilestoneDeliverableInputSchema().parse(action.input);
      MilestonesReducer.addMilestoneDeliverableOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );
      break;

    case "REMOVE_MILESTONE_DELIVERABLE":
      z.RemoveMilestoneDeliverableInputSchema().parse(action.input);
      MilestonesReducer.removeMilestoneDeliverableOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );
      break;

    case "EDIT_DELIVERABLES_SET":
      z.EditDeliverablesSetInputSchema().parse(action.input);
      DeliverablesSetReducer.editDeliverablesSetOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );
      break;

    case "ADD_DELIVERABLE_IN_SET":
      z.AddDeliverableInSetInputSchema().parse(action.input);
      DeliverablesSetReducer.addDeliverableInSetOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );
      break;

    case "REMOVE_DELIVERABLE_IN_SET":
      z.RemoveDeliverableInSetInputSchema().parse(action.input);
      DeliverablesSetReducer.removeDeliverableInSetOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );
      break;

    case "ADD_AGENT":
      z.AddAgentInputSchema().parse(action.input);
      ContributorsReducer.addAgentOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );
      break;

    case "REMOVE_AGENT":
      z.RemoveAgentInputSchema().parse(action.input);
      ContributorsReducer.removeAgentOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );
      break;

    case "EDIT_AGENT":
      z.EditAgentInputSchema().parse(action.input);
      ContributorsReducer.editAgentOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );
      break;

    case "ADD_PROJECT":
      z.AddProjectInputSchema().parse(action.input);
      ProjectsReducer.addProjectOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );
      break;

    case "UPDATE_PROJECT":
      z.UpdateProjectInputSchema().parse(action.input);
      ProjectsReducer.updateProjectOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );
      break;

    case "UPDATE_PROJECT_OWNER":
      z.UpdateProjectOwnerInputSchema().parse(action.input);
      ProjectsReducer.updateProjectOwnerOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );
      break;

    case "REMOVE_PROJECT":
      z.RemoveProjectInputSchema().parse(action.input);
      ProjectsReducer.removeProjectOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );
      break;

    case "SET_PROJECT_MARGIN":
      z.SetProjectMarginInputSchema().parse(action.input);
      ProjectsReducer.setProjectMarginOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );
      break;

    case "SET_PROJECT_TOTAL_BUDGET":
      z.SetProjectTotalBudgetInputSchema().parse(action.input);
      ProjectsReducer.setProjectTotalBudgetOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );
      break;

    case "ADD_PROJECT_DELIVERABLE":
      z.AddProjectDeliverableInputSchema().parse(action.input);
      ProjectsReducer.addProjectDeliverableOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );
      break;

    case "REMOVE_PROJECT_DELIVERABLE":
      z.RemoveProjectDeliverableInputSchema().parse(action.input);
      ProjectsReducer.removeProjectDeliverableOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );
      break;

    default:
      return state;
  }
};

export const reducer = createReducer<ScopeOfWorkDocument>(stateReducer);
