import { BaseDocumentClass } from "document-model";
import {
  type EditScopeOfWorkInput,
  type ScopeOfWorkState,
  type ScopeOfWorkLocalState,
} from "../types.js";
import { editScopeOfWork } from "./creators.js";
import { type ScopeOfWorkAction } from "../actions.js";

export default class ScopeOfWork_ScopeOfWork extends BaseDocumentClass<
  ScopeOfWorkState,
  ScopeOfWorkLocalState,
  ScopeOfWorkAction
> {
  public editScopeOfWork(input: EditScopeOfWorkInput) {
    return this.dispatch(editScopeOfWork(input));
  }
}
