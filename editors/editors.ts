import type { EditorModule } from "document-model";
import { ScopeOfWork } from "./scope-of-work/module.js";

export const editors: EditorModule[] = [ScopeOfWork];
