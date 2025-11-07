/**
 * Factory methods for creating ScopeOfWorkDocument instances
 */
import type { PHAuthState, PHDocumentState, PHBaseState } from "document-model";
import { createBaseState, defaultBaseState } from "document-model/core";
import type {
  ScopeOfWorkDocument,
  ScopeOfWorkLocalState,
  ScopeOfWorkGlobalState,
  ScopeOfWorkPHState,
} from "./types.js";
import { createDocument } from "./utils.js";

export function defaultGlobalState(): ScopeOfWorkGlobalState {
  return {
    title: "",
    description: "",
    status: "DRAFT",
    deliverables: [],
    projects: [],
    roadmaps: [],
    contributors: [],
  };
}

export function defaultLocalState(): ScopeOfWorkLocalState {
  return {};
}

export function defaultPHState(): ScopeOfWorkPHState {
  return {
    ...defaultBaseState(),
    global: defaultGlobalState(),
    local: defaultLocalState(),
  };
}

export function createGlobalState(
  state?: Partial<ScopeOfWorkGlobalState>,
): ScopeOfWorkGlobalState {
  return {
    ...defaultGlobalState(),
    ...(state || {}),
  } as ScopeOfWorkGlobalState;
}

export function createLocalState(
  state?: Partial<ScopeOfWorkLocalState>,
): ScopeOfWorkLocalState {
  return {
    ...defaultLocalState(),
    ...(state || {}),
  } as ScopeOfWorkLocalState;
}

export function createState(
  baseState?: Partial<PHBaseState>,
  globalState?: Partial<ScopeOfWorkGlobalState>,
  localState?: Partial<ScopeOfWorkLocalState>,
): ScopeOfWorkPHState {
  return {
    ...createBaseState(baseState?.auth, baseState?.document),
    global: createGlobalState(globalState),
    local: createLocalState(localState),
  };
}

/**
 * Creates a ScopeOfWorkDocument with custom global and local state
 * This properly handles the PHBaseState requirements while allowing
 * document-specific state to be set.
 */
export function createScopeOfWorkDocument(
  state?: Partial<{
    auth?: Partial<PHAuthState>;
    document?: Partial<PHDocumentState>;
    global?: Partial<ScopeOfWorkGlobalState>;
    local?: Partial<ScopeOfWorkLocalState>;
  }>,
): ScopeOfWorkDocument {
  const document = createDocument(
    state
      ? createState(
          createBaseState(state.auth, state.document),
          state.global,
          state.local,
        )
      : undefined,
  );

  return document;
}
