import { type BaseAction } from "document-model";
import type {
  AddProjectInput,
  UpdateProjectInput,
  UpdateProjectOwnerInput,
  RemoveProjectInput,
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

export type ScopeOfWorkProjectsAction =
  | AddProjectAction
  | UpdateProjectAction
  | UpdateProjectOwnerAction
  | RemoveProjectAction;
