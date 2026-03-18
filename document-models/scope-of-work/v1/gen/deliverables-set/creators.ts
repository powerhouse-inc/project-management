import { createAction } from "document-model/core";
import {
  EditDeliverablesSetInputSchema,
  AddDeliverableInSetInputSchema,
  RemoveDeliverableInSetInputSchema,
} from "../schema/zod.js";
import type {
  EditDeliverablesSetInput,
  AddDeliverableInSetInput,
  RemoveDeliverableInSetInput,
} from "../types.js";
import type {
  EditDeliverablesSetAction,
  AddDeliverableInSetAction,
  RemoveDeliverableInSetAction,
} from "./actions.js";

export const editDeliverablesSet = (input: EditDeliverablesSetInput) =>
  createAction<EditDeliverablesSetAction>(
    "EDIT_DELIVERABLES_SET",
    { ...input },
    undefined,
    EditDeliverablesSetInputSchema,
    "global",
  );

export const addDeliverableInSet = (input: AddDeliverableInSetInput) =>
  createAction<AddDeliverableInSetAction>(
    "ADD_DELIVERABLE_IN_SET",
    { ...input },
    undefined,
    AddDeliverableInSetInputSchema,
    "global",
  );

export const removeDeliverableInSet = (input: RemoveDeliverableInSetInput) =>
  createAction<RemoveDeliverableInSetAction>(
    "REMOVE_DELIVERABLE_IN_SET",
    { ...input },
    undefined,
    RemoveDeliverableInSetInputSchema,
    "global",
  );
