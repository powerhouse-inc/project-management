import type { PHDocument } from "document-model";
import type { ScopeOfWorkAction } from "./actions.js";
import type { ScopeOfWorkPHState } from "./ph-factories.js";
import type { ScopeOfWorkState } from "./schema/types.js";

export { z } from "./schema/index.js";
export type * from "./schema/types.js";
type ScopeOfWorkLocalState = Record<PropertyKey, never>;
export type ScopeOfWorkDocument = PHDocument<ScopeOfWorkPHState>;
export type { ScopeOfWorkState, ScopeOfWorkLocalState, ScopeOfWorkAction };
