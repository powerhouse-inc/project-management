import { createAction } from "document-model";
import {
  z,
  type AddMilestoneInput,
  type RemoveMilestoneInput,
  type EditMilestoneInput,
  type AddCoordinatorInput,
  type RemoveCoordinatorInput,
} from "../types.js";
import {
  type AddMilestoneAction,
  type RemoveMilestoneAction,
  type EditMilestoneAction,
  type AddCoordinatorAction,
  type RemoveCoordinatorAction,
} from "./actions.js";

export const addMilestone = (input: AddMilestoneInput) =>
  createAction<AddMilestoneAction>(
    "ADD_MILESTONE",
    { ...input },
    undefined,
    z.AddMilestoneInputSchema,
    "global",
  );

export const removeMilestone = (input: RemoveMilestoneInput) =>
  createAction<RemoveMilestoneAction>(
    "REMOVE_MILESTONE",
    { ...input },
    undefined,
    z.RemoveMilestoneInputSchema,
    "global",
  );

export const editMilestone = (input: EditMilestoneInput) =>
  createAction<EditMilestoneAction>(
    "EDIT_MILESTONE",
    { ...input },
    undefined,
    z.EditMilestoneInputSchema,
    "global",
  );

export const addCoordinator = (input: AddCoordinatorInput) =>
  createAction<AddCoordinatorAction>(
    "ADD_COORDINATOR",
    { ...input },
    undefined,
    z.AddCoordinatorInputSchema,
    "global",
  );

export const removeCoordinator = (input: RemoveCoordinatorInput) =>
  createAction<RemoveCoordinatorAction>(
    "REMOVE_COORDINATOR",
    { ...input },
    undefined,
    z.RemoveCoordinatorInputSchema,
    "global",
  );
