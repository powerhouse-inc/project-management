import { type SignalDispatch } from "document-model";
import {
  type AddProjectAction,
  type UpdateProjectAction,
  type UpdateProjectOwnerAction,
  type RemoveProjectAction,
} from "./actions.js";
import { type ScopeOfWorkState } from "../types.js";

export interface ScopeOfWorkProjectsOperations {
  addProjectOperation: (
    state: ScopeOfWorkState,
    action: AddProjectAction,
    dispatch?: SignalDispatch,
  ) => void;
  updateProjectOperation: (
    state: ScopeOfWorkState,
    action: UpdateProjectAction,
    dispatch?: SignalDispatch,
  ) => void;
  updateProjectOwnerOperation: (
    state: ScopeOfWorkState,
    action: UpdateProjectOwnerAction,
    dispatch?: SignalDispatch,
  ) => void;
  removeProjectOperation: (
    state: ScopeOfWorkState,
    action: RemoveProjectAction,
    dispatch?: SignalDispatch,
  ) => void;
}
