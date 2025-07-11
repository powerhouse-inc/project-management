import type { EditorModule } from "document-model";
import Editor from "./editor.js";
import type { ScopeOfWorkDocument } from "../../document-models/scope-of-work/index.js";

export const module: EditorModule<ScopeOfWorkDocument> = {
  Component: Editor,
  documentTypes: ["powerhouse/scopeofwork"],
  config: {
    id: "editor-id",
    disableExternalControls: true,
    documentToolbarEnabled: true,
    showSwitchboardLink: true,
  },
};

export default module;
