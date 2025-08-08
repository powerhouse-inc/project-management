import { BaseDocumentClass } from "document-model";
import {
  type AddMilestoneInput,
  type RemoveMilestoneInput,
  type EditMilestoneInput,
  type AddCoordinatorInput,
  type RemoveCoordinatorInput,
  type AddMilestoneDeliverableInput,
  type RemoveMilestoneDeliverableInput,
  type ScopeOfWorkState,
  type ScopeOfWorkLocalState,
} from "../types.js";
import {
  addMilestone,
  removeMilestone,
  editMilestone,
  addCoordinator,
  removeCoordinator,
  addMilestoneDeliverable,
  removeMilestoneDeliverable,
} from "./creators.js";
import { type ScopeOfWorkAction } from "../actions.js";

export default class ScopeOfWork_Milestones extends BaseDocumentClass<
  ScopeOfWorkState,
  ScopeOfWorkLocalState,
  ScopeOfWorkAction
> {
  public addMilestone(input: AddMilestoneInput) {
    return this.dispatch(addMilestone(input));
  }

  public removeMilestone(input: RemoveMilestoneInput) {
    return this.dispatch(removeMilestone(input));
  }

  public editMilestone(input: EditMilestoneInput) {
    return this.dispatch(editMilestone(input));
  }

  public addCoordinator(input: AddCoordinatorInput) {
    return this.dispatch(addCoordinator(input));
  }

  public removeCoordinator(input: RemoveCoordinatorInput) {
    return this.dispatch(removeCoordinator(input));
  }

  public addMilestoneDeliverable(input: AddMilestoneDeliverableInput) {
    return this.dispatch(addMilestoneDeliverable(input));
  }

  public removeMilestoneDeliverable(input: RemoveMilestoneDeliverableInput) {
    return this.dispatch(removeMilestoneDeliverable(input));
  }
}
