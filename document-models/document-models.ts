import type { DocumentModelModule } from "document-model";
import { ScopeOfWork } from "./scope-of-work/module.js";

export const documentModels: DocumentModelModule<any>[] = [
  ScopeOfWork,
];
