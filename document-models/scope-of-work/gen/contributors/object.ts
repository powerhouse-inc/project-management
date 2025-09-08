import { BaseDocumentClass } from "document-model";
import { ScopeOfWorkPHState } from "../ph-factories.js";
import {
  type AddAgentInput,
  type RemoveAgentInput,
  type EditAgentInput,
} from "../types.js";
import { addAgent, removeAgent, editAgent } from "./creators.js";
import { type ScopeOfWorkAction } from "../actions.js";

export default class ScopeOfWork_Contributors extends BaseDocumentClass<ScopeOfWorkPHState> {
  public addAgent(input: AddAgentInput) {
    return this.dispatch(addAgent(input));
  }

  public removeAgent(input: RemoveAgentInput) {
    return this.dispatch(removeAgent(input));
  }

  public editAgent(input: EditAgentInput) {
    return this.dispatch(editAgent(input));
  }
}
