import { type BaseAction } from "document-model";
import type {
  AddAgentInput,
  RemoveAgentInput,
  EditAgentInput,
} from "../types.js";

export type AddAgentAction = BaseAction<"ADD_AGENT", AddAgentInput, "global">;
export type RemoveAgentAction = BaseAction<
  "REMOVE_AGENT",
  RemoveAgentInput,
  "global"
>;
export type EditAgentAction = BaseAction<
  "EDIT_AGENT",
  EditAgentInput,
  "global"
>;

export type ScopeOfWorkContributorsAction =
  | AddAgentAction
  | RemoveAgentAction
  | EditAgentAction;
