import type { Action } from "document-model";
import type {
  AddAgentInput,
  RemoveAgentInput,
  EditAgentInput,
} from "../types.js";

export type AddAgentAction = Action & {
  type: "ADD_AGENT";
  input: AddAgentInput;
};
export type RemoveAgentAction = Action & {
  type: "REMOVE_AGENT";
  input: RemoveAgentInput;
};
export type EditAgentAction = Action & {
  type: "EDIT_AGENT";
  input: EditAgentInput;
};

export type ScopeOfWorkContributorsAction =
  | AddAgentAction
  | RemoveAgentAction
  | EditAgentAction;
