import type { EditorModule } from "document-model";
import { Editor } from "./editor.js";

export const module: EditorModule = {
  Component: Editor,
  documentTypes: ["powerhouse/scopeofwork"],
  config: {
    id: "scope-of-work-editor",
    name: "Scope of Work Editor",
  },
};
