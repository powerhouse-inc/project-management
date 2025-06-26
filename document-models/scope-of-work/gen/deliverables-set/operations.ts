import { type SignalDispatch } from "document-model";
import {
  type EditDeliverablesSetAction,
  type AddDeliverableInSetAction,
  type RemoveDeliverableInSetAction,
  type SetProgressInDeliverablesSetAction,
} from "./actions.js";
import { type ScopeOfWorkState } from "../types.js";

export interface ScopeOfWorkDeliverablesSetOperations {
  editDeliverablesSetOperation: (
    state: ScopeOfWorkState,
    action: EditDeliverablesSetAction,
    dispatch?: SignalDispatch,
  ) => void;
  addDeliverableInSetOperation: (
    state: ScopeOfWorkState,
    action: AddDeliverableInSetAction,
    dispatch?: SignalDispatch,
  ) => void;
  removeDeliverableInSetOperation: (
    state: ScopeOfWorkState,
    action: RemoveDeliverableInSetAction,
    dispatch?: SignalDispatch,
  ) => void;
  setProgressInDeliverablesSetOperation: (
    state: ScopeOfWorkState,
    action: SetProgressInDeliverablesSetAction,
    dispatch?: SignalDispatch,
  ) => void;
}
