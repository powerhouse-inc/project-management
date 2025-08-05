import { type BaseAction } from "document-model";
import type {
  AddDeliverableInput,
  RemoveDeliverableInput,
  EditDeliverableInput,
  SetDeliverableProgressInput,
  AddKeyResultInput,
  RemoveKeyResultInput,
  EditKeyResultInput,
  SetDeliverableBudgetAnchorProjectInput,
} from "../types.js";

export type AddDeliverableAction = BaseAction<
  "ADD_DELIVERABLE",
  AddDeliverableInput,
  "global"
>;
export type RemoveDeliverableAction = BaseAction<
  "REMOVE_DELIVERABLE",
  RemoveDeliverableInput,
  "global"
>;
export type EditDeliverableAction = BaseAction<
  "EDIT_DELIVERABLE",
  EditDeliverableInput,
  "global"
>;
export type SetDeliverableProgressAction = BaseAction<
  "SET_DELIVERABLE_PROGRESS",
  SetDeliverableProgressInput,
  "global"
>;
export type AddKeyResultAction = BaseAction<
  "ADD_KEY_RESULT",
  AddKeyResultInput,
  "global"
>;
export type RemoveKeyResultAction = BaseAction<
  "REMOVE_KEY_RESULT",
  RemoveKeyResultInput,
  "global"
>;
export type EditKeyResultAction = BaseAction<
  "EDIT_KEY_RESULT",
  EditKeyResultInput,
  "global"
>;
export type SetDeliverableBudgetAnchorProjectAction = BaseAction<
  "SET_DELIVERABLE_BUDGET_ANCHOR_PROJECT",
  SetDeliverableBudgetAnchorProjectInput,
  "global"
>;

export type ScopeOfWorkDeliverablesAction =
  | AddDeliverableAction
  | RemoveDeliverableAction
  | EditDeliverableAction
  | SetDeliverableProgressAction
  | AddKeyResultAction
  | RemoveKeyResultAction
  | EditKeyResultAction
  | SetDeliverableBudgetAnchorProjectAction;
