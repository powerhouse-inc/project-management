import {
  useDocumentOfType,
  useSelectedDocumentId,
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
  const selectedDocumentId = useSelectedDocumentId();
  return useScopeOfWorkDocument(selectedDocumentId);
}
