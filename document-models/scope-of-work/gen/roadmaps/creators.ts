import { createAction } from "document-model/core";
import {
  z,
  type AddRoadmapInput,
  type RemoveRoadmapInput,
  type EditRoadmapInput,
} from "../types.js";
import {
  type AddRoadmapAction,
  type RemoveRoadmapAction,
  type EditRoadmapAction,
} from "./actions.js";

export const addRoadmap = (input: AddRoadmapInput) =>
  createAction<AddRoadmapAction>(
    "ADD_ROADMAP",
    { ...input },
    undefined,
    z.AddRoadmapInputSchema,
    "global",
  );

export const removeRoadmap = (input: RemoveRoadmapInput) =>
  createAction<RemoveRoadmapAction>(
    "REMOVE_ROADMAP",
    { ...input },
    undefined,
    z.RemoveRoadmapInputSchema,
    "global",
  );

export const editRoadmap = (input: EditRoadmapInput) =>
  createAction<EditRoadmapAction>(
    "EDIT_ROADMAP",
    { ...input },
    undefined,
    z.EditRoadmapInputSchema,
    "global",
  );
