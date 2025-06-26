import { type BaseAction } from "document-model";
import type {
  AddRoadmapInput,
  RemoveRoadmapInput,
  EditRoadmapInput,
} from "../types.js";

export type AddRoadmapAction = BaseAction<
  "ADD_ROADMAP",
  AddRoadmapInput,
  "global"
>;
export type RemoveRoadmapAction = BaseAction<
  "REMOVE_ROADMAP",
  RemoveRoadmapInput,
  "global"
>;
export type EditRoadmapAction = BaseAction<
  "EDIT_ROADMAP",
  EditRoadmapInput,
  "global"
>;

export type ScopeOfWorkRoadmapsAction =
  | AddRoadmapAction
  | RemoveRoadmapAction
  | EditRoadmapAction;
