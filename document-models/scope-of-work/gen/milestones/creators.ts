import { createAction } from "document-model/core";
import {
  z,
  type AddMilestoneInput,
  type RemoveMilestoneInput,
  type EditMilestoneInput,
  type AddCoordinatorInput,
  type RemoveCoordinatorInput,
  type AddMilestoneDeliverableInput,
  type RemoveMilestoneDeliverableInput,
} from "../types.js";
import {
  type AddMilestoneAction,
  type RemoveMilestoneAction,
  type EditMilestoneAction,
  type AddCoordinatorAction,
  type RemoveCoordinatorAction,
  type AddMilestoneDeliverableAction,
  type RemoveMilestoneDeliverableAction,
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

export const addMilestoneDeliverable = (input: AddMilestoneDeliverableInput) =>
  createAction<AddMilestoneDeliverableAction>(
    "ADD_MILESTONE_DELIVERABLE",
    { ...input },
    undefined,
    z.AddMilestoneDeliverableInputSchema,
    "global",
  );

export const removeMilestoneDeliverable = (
  input: RemoveMilestoneDeliverableInput,
) =>
  createAction<RemoveMilestoneDeliverableAction>(
    "REMOVE_MILESTONE_DELIVERABLE",
    { ...input },
    undefined,
    z.RemoveMilestoneDeliverableInputSchema,
    "global",
  );
