import { type BaseAction } from "document-model";
import type {
  AddMilestoneInput,
  RemoveMilestoneInput,
  EditMilestoneInput,
  AddCoordinatorInput,
  RemoveCoordinatorInput,
} from "../types.js";

export type AddMilestoneAction = BaseAction<
  "ADD_MILESTONE",
  AddMilestoneInput,
  "global"
>;
export type RemoveMilestoneAction = BaseAction<
  "REMOVE_MILESTONE",
  RemoveMilestoneInput,
  "global"
>;
export type EditMilestoneAction = BaseAction<
  "EDIT_MILESTONE",
  EditMilestoneInput,
  "global"
>;
export type AddCoordinatorAction = BaseAction<
  "ADD_COORDINATOR",
  AddCoordinatorInput,
  "global"
>;
export type RemoveCoordinatorAction = BaseAction<
  "REMOVE_COORDINATOR",
  RemoveCoordinatorInput,
  "global"
>;

export type ScopeOfWorkMilestonesAction =
  | AddMilestoneAction
  | RemoveMilestoneAction
  | EditMilestoneAction
  | AddCoordinatorAction
  | RemoveCoordinatorAction;
