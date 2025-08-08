import { type SignalDispatch } from "document-model";
import {
  type AddProjectAction,
  type UpdateProjectAction,
  type UpdateProjectOwnerAction,
  type RemoveProjectAction,
  type SetProjectMarginAction,
  type SetProjectTotalBudgetAction,
  type AddProjectDeliverableAction,
  type RemoveProjectDeliverableAction,
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
  setProjectMarginOperation: (
    state: ScopeOfWorkState,
    action: SetProjectMarginAction,
    dispatch?: SignalDispatch,
  ) => void;
  setProjectTotalBudgetOperation: (
    state: ScopeOfWorkState,
    action: SetProjectTotalBudgetAction,
    dispatch?: SignalDispatch,
  ) => void;
  addProjectDeliverableOperation: (
    state: ScopeOfWorkState,
    action: AddProjectDeliverableAction,
    dispatch?: SignalDispatch,
  ) => void;
  removeProjectDeliverableOperation: (
    state: ScopeOfWorkState,
    action: RemoveProjectDeliverableAction,
    dispatch?: SignalDispatch,
  ) => void;
}
