import {
  type CreateDocument,
  type CreateState,
  type LoadFromFile,
  type LoadFromInput,
  baseCreateDocument,
  baseSaveToFile,
  baseSaveToFileHandle,
  baseLoadFromFile,
  baseLoadFromInput,
  defaultBaseState,
  generateId,
} from "document-model";
import { type ScopeOfWorkState, type ScopeOfWorkLocalState } from "./types.js";
import { ScopeOfWorkPHState } from "./ph-factories.js";
import { reducer } from "./reducer.js";

export const initialGlobalState: ScopeOfWorkState = {
  title: "",
  description: "",
  status: "DRAFT",
  deliverables: [],
  projects: [],
  roadmaps: [],
  contributors: [],
};
export const initialLocalState: ScopeOfWorkLocalState = {};

export const createState: CreateState<ScopeOfWorkPHState> = (state) => {
  return {
    ...defaultBaseState(),
    global: { ...initialGlobalState, ...(state?.global ?? {}) },
    local: { ...initialLocalState, ...(state?.local ?? {}) },
  };
};

export const createDocument: CreateDocument<ScopeOfWorkPHState> = (state) => {
  const document = baseCreateDocument(createState, state);
  document.header.documentType = "powerhouse/scopeofwork";
  // for backwards compatibility, but this is NOT a valid signed document id
  document.header.id = generateId();
  return document;
};

export const saveToFile = (document: any, path: string, name?: string) => {
  return baseSaveToFile(document, path, ".phdm", name);
};

export const saveToFileHandle = (document: any, input: any) => {
  return baseSaveToFileHandle(document, input);
};

export const loadFromFile: LoadFromFile<ScopeOfWorkPHState> = (path) => {
  return baseLoadFromFile(path, reducer);
};

export const loadFromInput: LoadFromInput<ScopeOfWorkPHState> = (input) => {
  return baseLoadFromInput(input, reducer);
};

const utils = {
  fileExtension: ".phdm",
  createState,
  createDocument,
  saveToFile,
  saveToFileHandle,
  loadFromFile,
  loadFromInput,
};

export default utils;
