import { createAction } from "document-model/core";
import { z, type EditScopeOfWorkInput } from "../types.js";
import { type EditScopeOfWorkAction } from "./actions.js";

export const editScopeOfWork = (input: EditScopeOfWorkInput) =>
  createAction<EditScopeOfWorkAction>(
    "EDIT_SCOPE_OF_WORK",
    { ...input },
    undefined,
    z.EditScopeOfWorkInputSchema,
    "global",
  );
