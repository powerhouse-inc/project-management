import type { EditorModule } from "document-model";
import { lazy } from "react";

/** Document editor module for the Todo List document type */
export const ScopeOfWork: EditorModule = {
  Component: lazy(() => import("./editor.js")),
  documentTypes: ["powerhouse/scopeofwork"],
  config: {
    id: "scope-of-work",
    name: "scope-of-work",
  },
};
