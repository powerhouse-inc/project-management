import { baseActions } from "document-model";
import {
  scopeOfWorkScopeOfWorkActions,
  scopeOfWorkDeliverablesActions,
  scopeOfWorkRoadmapsActions,
  scopeOfWorkMilestonesActions,
  scopeOfWorkDeliverablesSetActions,
  scopeOfWorkContributorsActions,
  scopeOfWorkProjectsActions,
} from "./gen/creators.js";

/** Actions for the ScopeOfWork document model */

export const actions = {
  ...baseActions,
  ...scopeOfWorkScopeOfWorkActions,
  ...scopeOfWorkDeliverablesActions,
  ...scopeOfWorkRoadmapsActions,
  ...scopeOfWorkMilestonesActions,
  ...scopeOfWorkDeliverablesSetActions,
  ...scopeOfWorkContributorsActions,
  ...scopeOfWorkProjectsActions,
};
