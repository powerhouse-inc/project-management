import { type SignalDispatch } from "document-model";
import type {
  AddAgentAction,
  RemoveAgentAction,
  EditAgentAction,
} from "./actions.js";
import type { ScopeOfWorkState } from "../types.js";

export interface ScopeOfWorkContributorsOperations {
  addAgentOperation: (
    state: ScopeOfWorkState,
    action: AddAgentAction,
    dispatch?: SignalDispatch,
  ) => void;
  removeAgentOperation: (
    state: ScopeOfWorkState,
    action: RemoveAgentAction,
    dispatch?: SignalDispatch,
  ) => void;
  editAgentOperation: (
    state: ScopeOfWorkState,
    action: EditAgentAction,
    dispatch?: SignalDispatch,
  ) => void;
}
