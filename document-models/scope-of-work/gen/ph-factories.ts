/**
 * Factory methods for creating ScopeOfWorkDocument instances
 */

import {
  createBaseState,
  defaultBaseState,
  type PHAuthState,
  type PHDocumentState,
  type PHBaseState,
} from "document-model";
import type {
  ScopeOfWorkDocument,
  ScopeOfWorkLocalState,
  ScopeOfWorkState,
} from "./types.js";
import { createDocument } from "./utils.js";

export type ScopeOfWorkPHState = PHBaseState & {
  global: ScopeOfWorkState;
  local: ScopeOfWorkLocalState;
};

export function defaultGlobalState(): ScopeOfWorkState {
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
  state?: Partial<ScopeOfWorkState>,
): ScopeOfWorkState {
  return {
    ...defaultGlobalState(),
    ...(state || {}),
  } as ScopeOfWorkState;
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
  globalState?: Partial<ScopeOfWorkState>,
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
    global?: Partial<ScopeOfWorkState>;
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
