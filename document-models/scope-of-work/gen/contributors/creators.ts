import { createAction } from "document-model/core";
import {
  z,
  type AddAgentInput,
  type RemoveAgentInput,
  type EditAgentInput,
} from "../types.js";
import {
  type AddAgentAction,
  type RemoveAgentAction,
  type EditAgentAction,
} from "./actions.js";

export const addAgent = (input: AddAgentInput) =>
  createAction<AddAgentAction>(
    "ADD_AGENT",
    { ...input },
    undefined,
    z.AddAgentInputSchema,
    "global",
  );

export const removeAgent = (input: RemoveAgentInput) =>
  createAction<RemoveAgentAction>(
    "REMOVE_AGENT",
    { ...input },
    undefined,
    z.RemoveAgentInputSchema,
    "global",
  );

export const editAgent = (input: EditAgentInput) =>
  createAction<EditAgentAction>(
    "EDIT_AGENT",
    { ...input },
    undefined,
    z.EditAgentInputSchema,
    "global",
  );
