import { createAction } from "document-model/core";
import {
  AddProjectInputSchema,
  UpdateProjectInputSchema,
  UpdateProjectOwnerInputSchema,
  RemoveProjectInputSchema,
  SetProjectMarginInputSchema,
  SetProjectTotalBudgetInputSchema,
  AddProjectDeliverableInputSchema,
  RemoveProjectDeliverableInputSchema,
} from "../schema/zod.js";
import type {
  AddProjectInput,
  UpdateProjectInput,
  UpdateProjectOwnerInput,
  RemoveProjectInput,
  SetProjectMarginInput,
  SetProjectTotalBudgetInput,
  AddProjectDeliverableInput,
  RemoveProjectDeliverableInput,
} from "../types.js";
import type {
  AddProjectAction,
  UpdateProjectAction,
  UpdateProjectOwnerAction,
  RemoveProjectAction,
  SetProjectMarginAction,
  SetProjectTotalBudgetAction,
  AddProjectDeliverableAction,
  RemoveProjectDeliverableAction,
} from "./actions.js";

export const addProject = (input: AddProjectInput) =>
  createAction<AddProjectAction>(
    "ADD_PROJECT",
    { ...input },
    undefined,
    AddProjectInputSchema,
    "global",
  );

export const updateProject = (input: UpdateProjectInput) =>
  createAction<UpdateProjectAction>(
    "UPDATE_PROJECT",
    { ...input },
    undefined,
    UpdateProjectInputSchema,
    "global",
  );

export const updateProjectOwner = (input: UpdateProjectOwnerInput) =>
  createAction<UpdateProjectOwnerAction>(
    "UPDATE_PROJECT_OWNER",
    { ...input },
    undefined,
    UpdateProjectOwnerInputSchema,
    "global",
  );

export const removeProject = (input: RemoveProjectInput) =>
  createAction<RemoveProjectAction>(
    "REMOVE_PROJECT",
    { ...input },
    undefined,
    RemoveProjectInputSchema,
    "global",
  );

export const setProjectMargin = (input: SetProjectMarginInput) =>
  createAction<SetProjectMarginAction>(
    "SET_PROJECT_MARGIN",
    { ...input },
    undefined,
    SetProjectMarginInputSchema,
    "global",
  );

export const setProjectTotalBudget = (input: SetProjectTotalBudgetInput) =>
  createAction<SetProjectTotalBudgetAction>(
    "SET_PROJECT_TOTAL_BUDGET",
    { ...input },
    undefined,
    SetProjectTotalBudgetInputSchema,
    "global",
  );

export const addProjectDeliverable = (input: AddProjectDeliverableInput) =>
  createAction<AddProjectDeliverableAction>(
    "ADD_PROJECT_DELIVERABLE",
    { ...input },
    undefined,
    AddProjectDeliverableInputSchema,
    "global",
  );

export const removeProjectDeliverable = (
  input: RemoveProjectDeliverableInput,
) =>
  createAction<RemoveProjectDeliverableAction>(
    "REMOVE_PROJECT_DELIVERABLE",
    { ...input },
    undefined,
    RemoveProjectDeliverableInputSchema,
    "global",
  );
