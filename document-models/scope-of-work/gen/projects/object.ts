import { BaseDocumentClass } from "document-model";
import {
  type AddProjectInput,
  type UpdateProjectInput,
  type UpdateProjectOwnerInput,
  type RemoveProjectInput,
  type SetProjectMarginInput,
  type SetProjectTotalBudgetInput,
  type ScopeOfWorkState,
  type ScopeOfWorkLocalState,
} from "../types.js";
import {
  addProject,
  updateProject,
  updateProjectOwner,
  removeProject,
  setProjectMargin,
  setProjectTotalBudget,
} from "./creators.js";
import { type ScopeOfWorkAction } from "../actions.js";

export default class ScopeOfWork_Projects extends BaseDocumentClass<
  ScopeOfWorkState,
  ScopeOfWorkLocalState,
  ScopeOfWorkAction
> {
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
}
