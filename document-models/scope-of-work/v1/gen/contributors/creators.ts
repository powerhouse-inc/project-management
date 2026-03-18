import { createAction } from "document-model/core";
import {
  AddAgentInputSchema,
  RemoveAgentInputSchema,
  EditAgentInputSchema,
} from "../schema/zod.js";
import type {
  AddAgentInput,
  RemoveAgentInput,
  EditAgentInput,
} from "../types.js";
import type {
  AddAgentAction,
  RemoveAgentAction,
  EditAgentAction,
} from "./actions.js";

export const addAgent = (input: AddAgentInput) =>
  createAction<AddAgentAction>(
    "ADD_AGENT",
    { ...input },
    undefined,
    AddAgentInputSchema,
    "global",
  );

export const removeAgent = (input: RemoveAgentInput) =>
  createAction<RemoveAgentAction>(
    "REMOVE_AGENT",
    { ...input },
    undefined,
    RemoveAgentInputSchema,
    "global",
  );

export const editAgent = (input: EditAgentInput) =>
  createAction<EditAgentAction>(
    "EDIT_AGENT",
    { ...input },
    undefined,
    EditAgentInputSchema,
    "global",
  );
