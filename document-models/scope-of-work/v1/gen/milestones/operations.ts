import { type SignalDispatch } from "document-model";
import type {
  AddMilestoneAction,
  RemoveMilestoneAction,
  EditMilestoneAction,
  AddCoordinatorAction,
  RemoveCoordinatorAction,
  AddMilestoneDeliverableAction,
  RemoveMilestoneDeliverableAction,
} from "./actions.js";
import type { ScopeOfWorkState } from "../types.js";

export interface ScopeOfWorkMilestonesOperations {
  addMilestoneOperation: (
    state: ScopeOfWorkState,
    action: AddMilestoneAction,
    dispatch?: SignalDispatch,
  ) => void;
  removeMilestoneOperation: (
    state: ScopeOfWorkState,
    action: RemoveMilestoneAction,
    dispatch?: SignalDispatch,
  ) => void;
  editMilestoneOperation: (
    state: ScopeOfWorkState,
    action: EditMilestoneAction,
    dispatch?: SignalDispatch,
  ) => void;
  addCoordinatorOperation: (
    state: ScopeOfWorkState,
    action: AddCoordinatorAction,
    dispatch?: SignalDispatch,
  ) => void;
  removeCoordinatorOperation: (
    state: ScopeOfWorkState,
    action: RemoveCoordinatorAction,
    dispatch?: SignalDispatch,
  ) => void;
  addMilestoneDeliverableOperation: (
    state: ScopeOfWorkState,
    action: AddMilestoneDeliverableAction,
    dispatch?: SignalDispatch,
  ) => void;
  removeMilestoneDeliverableOperation: (
    state: ScopeOfWorkState,
    action: RemoveMilestoneDeliverableAction,
    dispatch?: SignalDispatch,
  ) => void;
}
