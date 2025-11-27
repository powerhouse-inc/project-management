import { baseActions } from "document-model";
import {
  scopeOfWorkActions,
  deliverablesActions,
  roadmapsActions,
  milestonesActions,
  deliverablesSetActions,
  contributorsActions,
  projectsActions,
} from "./gen/creators.js";

/** Actions for the ScopeOfWork document model */
export const actions = {
  ...baseActions,
  ...scopeOfWorkActions,
  ...deliverablesActions,
  ...roadmapsActions,
  ...milestonesActions,
  ...deliverablesSetActions,
  ...contributorsActions,
  ...projectsActions,
};
