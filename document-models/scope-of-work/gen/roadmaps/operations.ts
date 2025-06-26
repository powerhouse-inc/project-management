import { type SignalDispatch } from "document-model";
import {
  type AddRoadmapAction,
  type RemoveRoadmapAction,
  type EditRoadmapAction,
} from "./actions.js";
import { type ScopeOfWorkState } from "../types.js";

export interface ScopeOfWorkRoadmapsOperations {
  addRoadmapOperation: (
    state: ScopeOfWorkState,
    action: AddRoadmapAction,
    dispatch?: SignalDispatch,
  ) => void;
  removeRoadmapOperation: (
    state: ScopeOfWorkState,
    action: RemoveRoadmapAction,
    dispatch?: SignalDispatch,
  ) => void;
  editRoadmapOperation: (
    state: ScopeOfWorkState,
    action: EditRoadmapAction,
    dispatch?: SignalDispatch,
  ) => void;
}
