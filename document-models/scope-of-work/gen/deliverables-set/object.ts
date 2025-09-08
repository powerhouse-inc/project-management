import { BaseDocumentClass } from "document-model";
import { ScopeOfWorkPHState } from "../ph-factories.js";
import {
  type EditDeliverablesSetInput,
  type AddDeliverableInSetInput,
  type RemoveDeliverableInSetInput,
} from "../types.js";
import {
  editDeliverablesSet,
  addDeliverableInSet,
  removeDeliverableInSet,
} from "./creators.js";
import { type ScopeOfWorkAction } from "../actions.js";

export default class ScopeOfWork_DeliverablesSet extends BaseDocumentClass<ScopeOfWorkPHState> {
  public editDeliverablesSet(input: EditDeliverablesSetInput) {
    return this.dispatch(editDeliverablesSet(input));
  }

  public addDeliverableInSet(input: AddDeliverableInSetInput) {
    return this.dispatch(addDeliverableInSet(input));
  }

  public removeDeliverableInSet(input: RemoveDeliverableInSetInput) {
    return this.dispatch(removeDeliverableInSet(input));
  }
}
