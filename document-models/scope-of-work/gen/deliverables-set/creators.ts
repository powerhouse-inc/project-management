import { createAction } from "document-model";
import {
  z,
  type EditDeliverablesSetInput,
  type AddDeliverableInSetInput,
  type RemoveDeliverableInSetInput,
} from "../types.js";
import {
  type EditDeliverablesSetAction,
  type AddDeliverableInSetAction,
  type RemoveDeliverableInSetAction,
} from "./actions.js";

export const editDeliverablesSet = (input: EditDeliverablesSetInput) =>
  createAction<EditDeliverablesSetAction>(
    "EDIT_DELIVERABLES_SET",
    { ...input },
    undefined,
    z.EditDeliverablesSetInputSchema,
    "global",
  );

export const addDeliverableInSet = (input: AddDeliverableInSetInput) =>
  createAction<AddDeliverableInSetAction>(
    "ADD_DELIVERABLE_IN_SET",
    { ...input },
    undefined,
    z.AddDeliverableInSetInputSchema,
    "global",
  );

export const removeDeliverableInSet = (input: RemoveDeliverableInSetInput) =>
  createAction<RemoveDeliverableInSetAction>(
    "REMOVE_DELIVERABLE_IN_SET",
    { ...input },
    undefined,
    z.RemoveDeliverableInSetInputSchema,
    "global",
  );
