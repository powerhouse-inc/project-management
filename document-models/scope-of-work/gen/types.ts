import type { PHDocument, BaseStateFromDocument } from "document-model";
import type { ScopeOfWorkState } from "./schema/types.js";
import type { ScopeOfWorkAction } from "./actions.js";

export { z } from "./schema/index.js";
export type * from "./schema/types.js";
type ScopeOfWorkLocalState = Record<PropertyKey, never>;
export type ExtendedScopeOfWorkState =
  BaseStateFromDocument<ScopeOfWorkDocument>;
export type ScopeOfWorkDocument = PHDocument<
  ScopeOfWorkState,
  ScopeOfWorkLocalState
>;
export type { ScopeOfWorkState, ScopeOfWorkLocalState, ScopeOfWorkAction };
