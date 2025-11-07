import {
  useDocumentOfType,
  useSelectedDocumentOfType,
} from "@powerhousedao/reactor-browser";
import type {
  ScopeOfWorkAction,
  ScopeOfWorkDocument,
} from "../../document-models/scope-of-work/index.js";

export function useScopeOfWorkDocument(documentId: string | null | undefined) {
  return useDocumentOfType<ScopeOfWorkDocument, ScopeOfWorkAction>(
    documentId,
    "powerhouse/scopeofwork",
  );
}

export function useSelectedScopeOfWorkDocument() {
  return useSelectedDocumentOfType<ScopeOfWorkDocument, ScopeOfWorkAction>(
    "powerhouse/scopeofwork",
  );
}
