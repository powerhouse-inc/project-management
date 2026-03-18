import { createAction } from "document-model/core";
import {
  AddMilestoneInputSchema,
  RemoveMilestoneInputSchema,
  EditMilestoneInputSchema,
  AddCoordinatorInputSchema,
  RemoveCoordinatorInputSchema,
  AddMilestoneDeliverableInputSchema,
  RemoveMilestoneDeliverableInputSchema,
} from "../schema/zod.js";
import type {
  AddMilestoneInput,
  RemoveMilestoneInput,
  EditMilestoneInput,
  AddCoordinatorInput,
  RemoveCoordinatorInput,
  AddMilestoneDeliverableInput,
  RemoveMilestoneDeliverableInput,
} from "../types.js";
import type {
  AddMilestoneAction,
  RemoveMilestoneAction,
  EditMilestoneAction,
  AddCoordinatorAction,
  RemoveCoordinatorAction,
  AddMilestoneDeliverableAction,
  RemoveMilestoneDeliverableAction,
} from "./actions.js";

export const addMilestone = (input: AddMilestoneInput) =>
  createAction<AddMilestoneAction>(
    "ADD_MILESTONE",
    { ...input },
    undefined,
    AddMilestoneInputSchema,
    "global",
  );

export const removeMilestone = (input: RemoveMilestoneInput) =>
  createAction<RemoveMilestoneAction>(
    "REMOVE_MILESTONE",
    { ...input },
    undefined,
    RemoveMilestoneInputSchema,
    "global",
  );

export const editMilestone = (input: EditMilestoneInput) =>
  createAction<EditMilestoneAction>(
    "EDIT_MILESTONE",
    { ...input },
    undefined,
    EditMilestoneInputSchema,
    "global",
  );

export const addCoordinator = (input: AddCoordinatorInput) =>
  createAction<AddCoordinatorAction>(
    "ADD_COORDINATOR",
    { ...input },
    undefined,
    AddCoordinatorInputSchema,
    "global",
  );

export const removeCoordinator = (input: RemoveCoordinatorInput) =>
  createAction<RemoveCoordinatorAction>(
    "REMOVE_COORDINATOR",
    { ...input },
    undefined,
    RemoveCoordinatorInputSchema,
    "global",
  );

export const addMilestoneDeliverable = (input: AddMilestoneDeliverableInput) =>
  createAction<AddMilestoneDeliverableAction>(
    "ADD_MILESTONE_DELIVERABLE",
    { ...input },
    undefined,
    AddMilestoneDeliverableInputSchema,
    "global",
  );

export const removeMilestoneDeliverable = (
  input: RemoveMilestoneDeliverableInput,
) =>
  createAction<RemoveMilestoneDeliverableAction>(
    "REMOVE_MILESTONE_DELIVERABLE",
    { ...input },
    undefined,
    RemoveMilestoneDeliverableInputSchema,
    "global",
  );
