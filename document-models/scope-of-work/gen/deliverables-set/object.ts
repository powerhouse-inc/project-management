import { BaseDocumentClass } from "document-model";
import {
  type EditDeliverablesSetInput,
  type AddDeliverableInSetInput,
  type RemoveDeliverableInSetInput,
  type SetProgressInDeliverablesSetInput,
  type ScopeOfWorkState,
  type ScopeOfWorkLocalState,
} from "../types.js";
import {
  editDeliverablesSet,
  addDeliverableInSet,
  removeDeliverableInSet,
  setProgressInDeliverablesSet,
} from "./creators.js";
import { type ScopeOfWorkAction } from "../actions.js";

export default class ScopeOfWork_DeliverablesSet extends BaseDocumentClass<
  ScopeOfWorkState,
  ScopeOfWorkLocalState,
  ScopeOfWorkAction
> {
  public editDeliverablesSet(input: EditDeliverablesSetInput) {
    return this.dispatch(editDeliverablesSet(input));
  }

  public addDeliverableInSet(input: AddDeliverableInSetInput) {
    return this.dispatch(addDeliverableInSet(input));
  }

  public removeDeliverableInSet(input: RemoveDeliverableInSetInput) {
    return this.dispatch(removeDeliverableInSet(input));
  }

  public setProgressInDeliverablesSet(
    input: SetProgressInDeliverablesSetInput,
  ) {
    return this.dispatch(setProgressInDeliverablesSet(input));
  }
}
