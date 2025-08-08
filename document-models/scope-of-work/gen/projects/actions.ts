import { type BaseAction } from "document-model";
import type {
  AddProjectInput,
  UpdateProjectInput,
  UpdateProjectOwnerInput,
  RemoveProjectInput,
  SetProjectMarginInput,
  SetProjectTotalBudgetInput,
} from "../types.js";

export type AddProjectAction = BaseAction<
  "ADD_PROJECT",
  AddProjectInput,
  "global"
>;
export type UpdateProjectAction = BaseAction<
  "UPDATE_PROJECT",
  UpdateProjectInput,
  "global"
>;
export type UpdateProjectOwnerAction = BaseAction<
  "UPDATE_PROJECT_OWNER",
  UpdateProjectOwnerInput,
  "global"
>;
export type RemoveProjectAction = BaseAction<
  "REMOVE_PROJECT",
  RemoveProjectInput,
  "global"
>;
export type SetProjectMarginAction = BaseAction<
  "SET_PROJECT_MARGIN",
  SetProjectMarginInput,
  "global"
>;
export type SetProjectTotalBudgetAction = BaseAction<
  "SET_PROJECT_TOTAL_BUDGET",
  SetProjectTotalBudgetInput,
  "global"
>;

export type ScopeOfWorkProjectsAction =
  | AddProjectAction
  | UpdateProjectAction
  | UpdateProjectOwnerAction
  | RemoveProjectAction
  | SetProjectMarginAction
  | SetProjectTotalBudgetAction;
