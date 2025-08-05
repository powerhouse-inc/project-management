/**
 * This is a scaffold file meant for customization:
 * - modify it by implementing the reducer functions
 * - delete the file and run the code generator again to have it reset
 */

import type { ScopeOfWorkProjectsOperations } from "../../gen/projects/operations.js";

export const reducer: ScopeOfWorkProjectsOperations = {
  addProjectOperation(state, action, dispatch) {
    try {
      const project = {
        id: action.input.id,
        code: action.input.code,
        title: action.input.title,
        projectOwner: action.input.projectOwner || "",
        abstract: action.input.abstract || "",
        imageUrl: action.input.imageUrl || "",
        budgetType: action.input.budgetType || "CAPEX",
        currency: action.input.currency || "USD",
        budget: action.input.budget || 0,
        expenditure: {
          percentage: 0,
          actuals: 0,
          cap: 0
        },
        scope: {
          deliverables: [],
          status: "DRAFT" as const,
          progress: {
            value: 0,
          },
          deliverablesCompleted: {
            total: 0,
            completed: 0,
          },
        },
      }
      state.projects.push(project);
    } catch (error) {
      console.error(error);
    }
  },
  updateProjectOperation(state, action, dispatch) {
    try {
      const project = state.projects.find((p) => p.id === action.input.id);
      if (!project) {
        throw new Error("Project not found");
      }
      Object.assign(project, action.input);
    } catch (error) {
      console.error(error);
    }
  },
  updateProjectOwnerOperation(state, action, dispatch) {
    try {
      const project = state.projects.find((p) => p.id === action.input.id);
      if (!project) {
        throw new Error("Project not found");
      }
      project.projectOwner = action.input.projectOwner || "";
    } catch (error) {
      console.error(error);
    }
  },
  removeProjectOperation(state, action, dispatch) {
    try {
      state.projects = state.projects.filter((p) => p.id !== action.input.projectId);
    } catch (error) {
      console.error(error);
    }
  },
};
