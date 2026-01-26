import { type SignalDispatch } from "document-model";
import type {
  AddDeliverableAction,
  RemoveDeliverableAction,
  EditDeliverableAction,
  SetDeliverableProgressAction,
  AddKeyResultAction,
  RemoveKeyResultAction,
  EditKeyResultAction,
  SetDeliverableBudgetAnchorProjectAction,
} from "./actions.js";
import type { ScopeOfWorkState } from "../types.js";

export interface ScopeOfWorkDeliverablesOperations {
  addDeliverableOperation: (
    state: ScopeOfWorkState,
    action: AddDeliverableAction,
    dispatch?: SignalDispatch,
  ) => void;
  removeDeliverableOperation: (
    state: ScopeOfWorkState,
    action: RemoveDeliverableAction,
    dispatch?: SignalDispatch,
  ) => void;
  editDeliverableOperation: (
    state: ScopeOfWorkState,
    action: EditDeliverableAction,
    dispatch?: SignalDispatch,
  ) => void;
  setDeliverableProgressOperation: (
    state: ScopeOfWorkState,
    action: SetDeliverableProgressAction,
    dispatch?: SignalDispatch,
  ) => void;
  addKeyResultOperation: (
    state: ScopeOfWorkState,
    action: AddKeyResultAction,
    dispatch?: SignalDispatch,
  ) => void;
  removeKeyResultOperation: (
    state: ScopeOfWorkState,
    action: RemoveKeyResultAction,
    dispatch?: SignalDispatch,
  ) => void;
  editKeyResultOperation: (
    state: ScopeOfWorkState,
    action: EditKeyResultAction,
    dispatch?: SignalDispatch,
  ) => void;
  setDeliverableBudgetAnchorProjectOperation: (
    state: ScopeOfWorkState,
    action: SetDeliverableBudgetAnchorProjectAction,
    dispatch?: SignalDispatch,
  ) => void;
}
