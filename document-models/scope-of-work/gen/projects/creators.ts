import { createAction } from "document-model/core";
import {
  z,
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
  type AddProjectAction,
  type UpdateProjectAction,
  type UpdateProjectOwnerAction,
  type RemoveProjectAction,
  type SetProjectMarginAction,
  type SetProjectTotalBudgetAction,
  type AddProjectDeliverableAction,
  type RemoveProjectDeliverableAction,
} from "./actions.js";

export const addProject = (input: AddProjectInput) =>
  createAction<AddProjectAction>(
    "ADD_PROJECT",
    { ...input },
    undefined,
    z.AddProjectInputSchema,
    "global",
  );

export const updateProject = (input: UpdateProjectInput) =>
  createAction<UpdateProjectAction>(
    "UPDATE_PROJECT",
    { ...input },
    undefined,
    z.UpdateProjectInputSchema,
    "global",
  );

export const updateProjectOwner = (input: UpdateProjectOwnerInput) =>
  createAction<UpdateProjectOwnerAction>(
    "UPDATE_PROJECT_OWNER",
    { ...input },
    undefined,
    z.UpdateProjectOwnerInputSchema,
    "global",
  );

export const removeProject = (input: RemoveProjectInput) =>
  createAction<RemoveProjectAction>(
    "REMOVE_PROJECT",
    { ...input },
    undefined,
    z.RemoveProjectInputSchema,
    "global",
  );

export const setProjectMargin = (input: SetProjectMarginInput) =>
  createAction<SetProjectMarginAction>(
    "SET_PROJECT_MARGIN",
    { ...input },
    undefined,
    z.SetProjectMarginInputSchema,
    "global",
  );

export const setProjectTotalBudget = (input: SetProjectTotalBudgetInput) =>
  createAction<SetProjectTotalBudgetAction>(
    "SET_PROJECT_TOTAL_BUDGET",
    { ...input },
    undefined,
    z.SetProjectTotalBudgetInputSchema,
    "global",
  );

export const addProjectDeliverable = (input: AddProjectDeliverableInput) =>
  createAction<AddProjectDeliverableAction>(
    "ADD_PROJECT_DELIVERABLE",
    { ...input },
    undefined,
    z.AddProjectDeliverableInputSchema,
    "global",
  );

export const removeProjectDeliverable = (
  input: RemoveProjectDeliverableInput,
) =>
  createAction<RemoveProjectDeliverableAction>(
    "REMOVE_PROJECT_DELIVERABLE",
    { ...input },
    undefined,
    z.RemoveProjectDeliverableInputSchema,
    "global",
  );
