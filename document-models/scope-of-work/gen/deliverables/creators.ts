import { createAction } from "document-model/core";
import {
  z,
  type AddDeliverableInput,
  type RemoveDeliverableInput,
  type EditDeliverableInput,
  type SetDeliverableProgressInput,
  type AddKeyResultInput,
  type RemoveKeyResultInput,
  type EditKeyResultInput,
  type SetDeliverableBudgetAnchorProjectInput,
} from "../types.js";
import {
  type AddDeliverableAction,
  type RemoveDeliverableAction,
  type EditDeliverableAction,
  type SetDeliverableProgressAction,
  type AddKeyResultAction,
  type RemoveKeyResultAction,
  type EditKeyResultAction,
  type SetDeliverableBudgetAnchorProjectAction,
} from "./actions.js";

export const addDeliverable = (input: AddDeliverableInput) =>
  createAction<AddDeliverableAction>(
    "ADD_DELIVERABLE",
    { ...input },
    undefined,
    z.AddDeliverableInputSchema,
    "global",
  );

export const removeDeliverable = (input: RemoveDeliverableInput) =>
  createAction<RemoveDeliverableAction>(
    "REMOVE_DELIVERABLE",
    { ...input },
    undefined,
    z.RemoveDeliverableInputSchema,
    "global",
  );

export const editDeliverable = (input: EditDeliverableInput) =>
  createAction<EditDeliverableAction>(
    "EDIT_DELIVERABLE",
    { ...input },
    undefined,
    z.EditDeliverableInputSchema,
    "global",
  );

export const setDeliverableProgress = (input: SetDeliverableProgressInput) =>
  createAction<SetDeliverableProgressAction>(
    "SET_DELIVERABLE_PROGRESS",
    { ...input },
    undefined,
    z.SetDeliverableProgressInputSchema,
    "global",
  );

export const addKeyResult = (input: AddKeyResultInput) =>
  createAction<AddKeyResultAction>(
    "ADD_KEY_RESULT",
    { ...input },
    undefined,
    z.AddKeyResultInputSchema,
    "global",
  );

export const removeKeyResult = (input: RemoveKeyResultInput) =>
  createAction<RemoveKeyResultAction>(
    "REMOVE_KEY_RESULT",
    { ...input },
    undefined,
    z.RemoveKeyResultInputSchema,
    "global",
  );

export const editKeyResult = (input: EditKeyResultInput) =>
  createAction<EditKeyResultAction>(
    "EDIT_KEY_RESULT",
    { ...input },
    undefined,
    z.EditKeyResultInputSchema,
    "global",
  );

export const setDeliverableBudgetAnchorProject = (
  input: SetDeliverableBudgetAnchorProjectInput,
) =>
  createAction<SetDeliverableBudgetAnchorProjectAction>(
    "SET_DELIVERABLE_BUDGET_ANCHOR_PROJECT",
    { ...input },
    undefined,
    z.SetDeliverableBudgetAnchorProjectInputSchema,
    "global",
  );
