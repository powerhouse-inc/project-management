/**
 * This is a scaffold file meant for customization:
 * - modify it by implementing the reducer functions
 * - delete the file and run the code generator again to have it reset
 */

import type { ScopeOfWorkRoadmapsOperations } from "../../gen/roadmaps/operations.js";

export const reducer: ScopeOfWorkRoadmapsOperations = {
  editRoadmapOperation(state, action, dispatch) {
    try {
      const roadmap = state.roadmaps.find((roadmap) => String(roadmap.id) === String(action.input.id));
      if (!roadmap) {
        throw new Error("Roadmap not found");
      }

      const updatedRoadmap = {
        ...roadmap,
        title: action.input.title || roadmap.title,
        slug: action.input.slug || roadmap.slug,
        description: action.input.description || roadmap.description,
      };

      state.roadmaps = state.roadmaps.map((roadmap) => String(roadmap.id) === String(action.input.id) ? updatedRoadmap : roadmap);
    } catch (error) {
      console.error(error);
    }
  },
  addRoadmapOperation(state, action, dispatch) {
    try {
      if (action.input.id === undefined || action.input.title === undefined) {
        throw new Error("Invalid input");
      }

      const roadmap = {
        id: action.input.id,
        title: action.input.title,
        slug: action.input.slug || "",
        description: action.input.description || "",
        milestones: [],
      };

      state.roadmaps.push(roadmap);
    } catch (error) {
      console.error(error);
    }
  },
  removeRoadmapOperation(state, action, dispatch) {
    try {
      if (action.input.id === undefined) {
        throw new Error("Invalid roadmap id input");
      }

      const roadmap = state.roadmaps.find((roadmap) => String(roadmap.id) === String(action.input.id));
      if (!roadmap) {
        throw new Error("Roadmap not found");
      }

      if (roadmap.milestones) {
        roadmap.milestones.forEach((milestone) => {
          if (milestone.scope?.deliverables) {
            milestone.scope.deliverables.forEach((deliverableId) => {
              state.deliverables = state.deliverables.filter((deliverable) => String(deliverable.id) !== String(deliverableId));
            });
          }
        });
      }

      state.roadmaps = state.roadmaps.filter((roadmap) => String(roadmap.id) !== String(action.input.id));
    } catch (error) {
      console.error(error);
    }
  },
};
