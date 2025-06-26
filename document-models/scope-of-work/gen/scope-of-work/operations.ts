import { type SignalDispatch } from "document-model";
import { type EditScopeOfWorkAction } from "./actions.js";
import { type ScopeOfWorkState } from "../types.js";

export interface ScopeOfWorkScopeOfWorkOperations {
  editScopeOfWorkOperation: (
    state: ScopeOfWorkState,
    action: EditScopeOfWorkAction,
    dispatch?: SignalDispatch,
  ) => void;
}
