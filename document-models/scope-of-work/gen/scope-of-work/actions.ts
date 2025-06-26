import { type BaseAction } from "document-model";
import type { EditScopeOfWorkInput } from "../types.js";

export type EditScopeOfWorkAction = BaseAction<
  "EDIT_SCOPE_OF_WORK",
  EditScopeOfWorkInput,
  "global"
>;

export type ScopeOfWorkScopeOfWorkAction = EditScopeOfWorkAction;
