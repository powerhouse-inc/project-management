import type { DocumentModelModule } from "document-model";
import { createState } from "document-model";
import { defaultBaseState } from "document-model/core";
import type { ScopeOfWorkPHState } from "@powerhousedao/project-management/document-models/scope-of-work";
import {
  actions,
  documentModel,
  reducer,
  utils,
} from "@powerhousedao/project-management/document-models/scope-of-work";

/** Document model module for the Todo List document type */
export const ScopeOfWork: DocumentModelModule<ScopeOfWorkPHState> = {
  version: 1,
  reducer,
  actions,
  utils,
  documentModel: createState(defaultBaseState(), documentModel),
};
