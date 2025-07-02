import { BaseDocumentClass } from "document-model";
import {
  type AddDeliverableInput,
  type RemoveDeliverableInput,
  type EditDeliverableInput,
  type SetDeliverableProgressInput,
  type AddKeyResultInput,
  type RemoveKeyResultInput,
  type EditKeyResultInput,
  type ScopeOfWorkState,
  type ScopeOfWorkLocalState,
} from "../types.js";
import {
  addDeliverable,
  removeDeliverable,
  editDeliverable,
  setDeliverableProgress,
  addKeyResult,
  removeKeyResult,
  editKeyResult,
} from "./creators.js";
import { type ScopeOfWorkAction } from "../actions.js";

export default class ScopeOfWork_Deliverables extends BaseDocumentClass<
  ScopeOfWorkState,
  ScopeOfWorkLocalState,
  ScopeOfWorkAction
> {
  public addDeliverable(input: AddDeliverableInput) {
    return this.dispatch(addDeliverable(input));
  }

  public removeDeliverable(input: RemoveDeliverableInput) {
    return this.dispatch(removeDeliverable(input));
  }

  public editDeliverable(input: EditDeliverableInput) {
    return this.dispatch(editDeliverable(input));
  }

  public setDeliverableProgress(input: SetDeliverableProgressInput) {
    return this.dispatch(setDeliverableProgress(input));
  }

  public addKeyResult(input: AddKeyResultInput) {
    return this.dispatch(addKeyResult(input));
  }

  public removeKeyResult(input: RemoveKeyResultInput) {
    return this.dispatch(removeKeyResult(input));
  }

  public editKeyResult(input: EditKeyResultInput) {
    return this.dispatch(editKeyResult(input));
  }
}
