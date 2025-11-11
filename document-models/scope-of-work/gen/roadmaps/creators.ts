import { createAction } from "document-model/core";
import {
  AddRoadmapInputSchema,
  RemoveRoadmapInputSchema,
  EditRoadmapInputSchema,
} from "../schema/zod.js";
import type {
  AddRoadmapInput,
  RemoveRoadmapInput,
  EditRoadmapInput,
} from "../types.js";
import type {
  AddRoadmapAction,
  RemoveRoadmapAction,
  EditRoadmapAction,
} from "./actions.js";

export const addRoadmap = (input: AddRoadmapInput) =>
  createAction<AddRoadmapAction>(
    "ADD_ROADMAP",
    { ...input },
    undefined,
    AddRoadmapInputSchema,
    "global",
  );

export const removeRoadmap = (input: RemoveRoadmapInput) =>
  createAction<RemoveRoadmapAction>(
    "REMOVE_ROADMAP",
    { ...input },
    undefined,
    RemoveRoadmapInputSchema,
    "global",
  );

export const editRoadmap = (input: EditRoadmapInput) =>
  createAction<EditRoadmapAction>(
    "EDIT_ROADMAP",
    { ...input },
    undefined,
    EditRoadmapInputSchema,
    "global",
  );
