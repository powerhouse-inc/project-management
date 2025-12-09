import type { DocumentModelUtils } from "document-model";
import {
  baseCreateDocument,
  baseSaveToFileHandle,
  baseLoadFromInput,
  defaultBaseState,
  generateId,
} from "document-model/core";
import type { ScopeOfWorkGlobalState, ScopeOfWorkLocalState } from "./types.js";
import type { ScopeOfWorkPHState } from "./types.js";
import { reducer } from "./reducer.js";
import { scopeOfWorkDocumentType } from "./document-type.js";
import {
  isScopeOfWorkDocument,
  assertIsScopeOfWorkDocument,
  isScopeOfWorkState,
  assertIsScopeOfWorkState,
} from "./document-schema.js";

export const initialGlobalState: ScopeOfWorkGlobalState = {
  title: "",
  description: "",
  status: "DRAFT",
  deliverables: [],
  projects: [],
  roadmaps: [],
  contributors: [],
};
export const initialLocalState: ScopeOfWorkLocalState = {};

export const utils: DocumentModelUtils<ScopeOfWorkPHState> = {
  fileExtension: "",
  createState(state) {
    return {
      ...defaultBaseState(),
      global: { ...initialGlobalState, ...state?.global },
      local: { ...initialLocalState, ...state?.local },
    };
  },
  createDocument(state) {
    const document = baseCreateDocument(utils.createState, state);

    document.header.documentType = scopeOfWorkDocumentType;

    // for backwards compatibility, but this is NOT a valid signed document id
    document.header.id = generateId();

    return document;
  },
  saveToFileHandle(document, input) {
    return baseSaveToFileHandle(document, input);
  },
  loadFromInput(input) {
    return baseLoadFromInput(input, reducer);
  },
  isStateOfType(state) {
    return isScopeOfWorkState(state);
  },
  assertIsStateOfType(state) {
    return assertIsScopeOfWorkState(state);
  },
  isDocumentOfType(document) {
    return isScopeOfWorkDocument(document);
  },
  assertIsDocumentOfType(document) {
    return assertIsScopeOfWorkDocument(document);
  },
};

export const createDocument = utils.createDocument;
export const createState = utils.createState;
export const saveToFileHandle = utils.saveToFileHandle;
export const loadFromInput = utils.loadFromInput;
export const isStateOfType = utils.isStateOfType;
export const assertIsStateOfType = utils.assertIsStateOfType;
export const isDocumentOfType = utils.isDocumentOfType;
export const assertIsDocumentOfType = utils.assertIsDocumentOfType;
