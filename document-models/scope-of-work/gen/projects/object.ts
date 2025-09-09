import { BaseDocumentClass } from "document-model";
import { ScopeOfWorkPHState } from "../ph-factories.js";
import {
  type AddProjectInput,
  type UpdateProjectInput,
  type UpdateProjectOwnerInput,
  type RemoveProjectInput,
  type SetProjectMarginInput,
  type SetProjectTotalBudgetInput,
  type AddProjectDeliverableInput,
  type RemoveProjectDeliverableInput,
} from "../types.js";
import {
  addProject,
  updateProject,
  updateProjectOwner,
  removeProject,
  setProjectMargin,
  setProjectTotalBudget,
  addProjectDeliverable,
  removeProjectDeliverable,
} from "./creators.js";
import { type ScopeOfWorkAction } from "../actions.js";

export default class ScopeOfWork_Projects extends BaseDocumentClass<ScopeOfWorkPHState> {
  public addProject(input: AddProjectInput) {
    return this.dispatch(addProject(input));
  }

  public updateProject(input: UpdateProjectInput) {
    return this.dispatch(updateProject(input));
  }

  public updateProjectOwner(input: UpdateProjectOwnerInput) {
    return this.dispatch(updateProjectOwner(input));
  }

  public removeProject(input: RemoveProjectInput) {
    return this.dispatch(removeProject(input));
  }

  public setProjectMargin(input: SetProjectMarginInput) {
    return this.dispatch(setProjectMargin(input));
  }

  public setProjectTotalBudget(input: SetProjectTotalBudgetInput) {
    return this.dispatch(setProjectTotalBudget(input));
  }

  public addProjectDeliverable(input: AddProjectDeliverableInput) {
    return this.dispatch(addProjectDeliverable(input));
  }

  public removeProjectDeliverable(input: RemoveProjectDeliverableInput) {
    return this.dispatch(removeProjectDeliverable(input));
  }
}
