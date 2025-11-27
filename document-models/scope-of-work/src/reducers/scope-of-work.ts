/**
 * This is a scaffold file meant for customization:
 * - modify it by implementing the reducer functions
 * - delete the file and run the code generator again to have it reset
 */

import type { ScopeOfWorkStatusInput } from "../../gen/schema/index.js";
import type { ScopeOfWorkScopeOfWorkOperations } from "@powerhousedao/project-management/document-models/scope-of-work";

export const scopeOfWorkScopeOfWorkOperations: ScopeOfWorkScopeOfWorkOperations = {
  editScopeOfWorkOperation(state, action) {
    state.title = action.input.title ?? state.title;
    state.description = action.input.description ?? state.description;
    state.status = (action.input.status as ScopeOfWorkStatusInput) ?? state.status;
  },
};
