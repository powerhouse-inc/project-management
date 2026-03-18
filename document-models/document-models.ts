import type { DocumentModelModule } from "document-model";
import { ScopeOfWork as ScopeOfWorkV1 } from "./scope-of-work/v1/module.js";

export const documentModels: DocumentModelModule<any>[] = [
  ScopeOfWorkV1,
];
