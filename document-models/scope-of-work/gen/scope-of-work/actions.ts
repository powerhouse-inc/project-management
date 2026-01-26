import type { Action } from "document-model";
import type { EditScopeOfWorkInput } from "../types.js";

export type EditScopeOfWorkAction = Action & {
  type: "EDIT_SCOPE_OF_WORK";
  input: EditScopeOfWorkInput;
};

export type ScopeOfWorkScopeOfWorkAction = EditScopeOfWorkAction;
