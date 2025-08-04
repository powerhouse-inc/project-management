import { createAction } from "document-model";
import {
  z,
  type AddProjectInput,
  type UpdateProjectInput,
  type UpdateProjectOwnerInput,
} from "../types.js";
import {
  type AddProjectAction,
  type UpdateProjectAction,
  type UpdateProjectOwnerAction,
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
