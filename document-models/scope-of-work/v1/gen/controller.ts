import { PHDocumentController } from "document-model";
import { ScopeOfWork } from "../module.js";
import type { ScopeOfWorkAction, ScopeOfWorkPHState } from "./types.js";

export const ScopeOfWorkController = PHDocumentController.forDocumentModel<
  ScopeOfWorkPHState,
  ScopeOfWorkAction
>(ScopeOfWork);
