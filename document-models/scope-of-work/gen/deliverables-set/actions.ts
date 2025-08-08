import { type BaseAction } from "document-model";
import type {
  EditDeliverablesSetInput,
  AddDeliverableInSetInput,
  RemoveDeliverableInSetInput,
} from "../types.js";

export type EditDeliverablesSetAction = BaseAction<
  "EDIT_DELIVERABLES_SET",
  EditDeliverablesSetInput,
  "global"
>;
export type AddDeliverableInSetAction = BaseAction<
  "ADD_DELIVERABLE_IN_SET",
  AddDeliverableInSetInput,
  "global"
>;
export type RemoveDeliverableInSetAction = BaseAction<
  "REMOVE_DELIVERABLE_IN_SET",
  RemoveDeliverableInSetInput,
  "global"
>;

export type ScopeOfWorkDeliverablesSetAction =
  | EditDeliverablesSetAction
  | AddDeliverableInSetAction
  | RemoveDeliverableInSetAction;
