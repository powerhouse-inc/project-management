import type { DocumentDispatch } from "@powerhousedao/reactor-browser";
import {
  useDocumentsInSelectedDrive,
  useDocumentsInSelectedFolder,
  useDocumentById,
  useSelectedDocument,
} from "@powerhousedao/reactor-browser";
import type {
  ScopeOfWorkDocument,
  ScopeOfWorkAction,
} from "@powerhousedao/project-management/document-models/scope-of-work";
import { isScopeOfWorkDocument } from "./gen/document-schema.js";

/** Hook to get a ScopeOfWork document by its id */
export function useScopeOfWorkDocumentById(
  documentId: string | null | undefined,
):
  | [ScopeOfWorkDocument, DocumentDispatch<ScopeOfWorkAction>]
  | [undefined, undefined] {
  const [document, dispatch] = useDocumentById(documentId);
  if (!isScopeOfWorkDocument(document)) return [undefined, undefined];
  return [document, dispatch];
}

/** Hook to get the selected ScopeOfWork document */
export function useSelectedScopeOfWorkDocument():
  | [ScopeOfWorkDocument, DocumentDispatch<ScopeOfWorkAction>]
  | [undefined, undefined] {
  const [document, dispatch] = useSelectedDocument();
  if (!isScopeOfWorkDocument(document)) return [undefined, undefined];
  return [document, dispatch];
}

/** Hook to get all ScopeOfWork documents in the selected drive */
export function useScopeOfWorkDocumentsInSelectedDrive() {
  const documentsInSelectedDrive = useDocumentsInSelectedDrive();
  return documentsInSelectedDrive?.filter(isScopeOfWorkDocument);
}

/** Hook to get all ScopeOfWork documents in the selected folder */
export function useScopeOfWorkDocumentsInSelectedFolder() {
  const documentsInSelectedFolder = useDocumentsInSelectedFolder();
  return documentsInSelectedFolder?.filter(isScopeOfWorkDocument);
}
