import { BaseDocumentClass } from "document-model";
import { ScopeOfWorkPHState } from "../ph-factories.js";
import { type EditScopeOfWorkInput } from "../types.js";
import { editScopeOfWork } from "./creators.js";
import { type ScopeOfWorkAction } from "../actions.js";

export default class ScopeOfWork_ScopeOfWork extends BaseDocumentClass<ScopeOfWorkPHState> {
  public editScopeOfWork(input: EditScopeOfWorkInput) {
    return this.dispatch(editScopeOfWork(input));
  }
}
