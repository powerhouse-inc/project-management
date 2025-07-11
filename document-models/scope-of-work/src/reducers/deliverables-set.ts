/**
 * This is a scaffold file meant for customization:
 * - modify it by implementing the reducer functions
 * - delete the file and run the code generator again to have it reset
 */

import type { ScopeOfWorkDeliverablesSetOperations } from "../../gen/deliverables-set/operations.js";

export const reducer: ScopeOfWorkDeliverablesSetOperations = {
  editDeliverablesSetOperation(state, action, dispatch) {
    try {
      const foundRoadmap = state.roadmaps.find((roadmap) => {
        return roadmap.milestones.some((milestone) => String(milestone.id) === String(action.input.milestoneId));
      });
      if (!foundRoadmap) {
        throw new Error("Roadmap with milestone not found");
      }

      const foundMilestone = foundRoadmap.milestones.find((milestone) => String(milestone.id) === String(action.input.milestoneId));
      if (!foundMilestone || !foundMilestone.scope) {
        throw new Error("Milestone or scope not found");
      }

      const updatedScope = {
        ...foundMilestone.scope,
        status: action.input.status || foundMilestone.scope.status,
        deliverablesCompleted: action.input.deliverablesCompleted || foundMilestone.scope.deliverablesCompleted,
      };

      foundMilestone.scope = updatedScope;
      state.roadmaps = state.roadmaps.map((roadmap) => {
        return String(roadmap.id) === String(foundRoadmap.id) ? foundRoadmap : roadmap;
      });
    } catch (error) {
      console.error(error);
    }
  },
  addDeliverableInSetOperation(state, action, dispatch) {
    try {
      const foundRoadmap = state.roadmaps.find((roadmap) => {
        return roadmap.milestones.some((milestone) => String(milestone.id) === String(action.input.milestoneId));
      });
      if (!foundRoadmap) {
        throw new Error(`Roadmap with milestone ${action.input.milestoneId} not found`);
      }

      const foundMilestone = foundRoadmap.milestones.find((milestone) => String(milestone.id) === String(action.input.milestoneId));
      if (!foundMilestone) {
        throw new Error("Milestone not found");
      }

      if (!foundMilestone.scope) {
        foundMilestone.scope = {
          deliverables: [],
          status: "DRAFT" as const,
          progress: { total: 0, completed: 0 },
          deliverablesCompleted: {
            total: 0,
            completed: 0,
          },
        };
      }

      if (!foundMilestone.scope.deliverables.includes(action.input.deliverableId)) {
        foundMilestone.scope.deliverables.push(action.input.deliverableId);
      }

      state.roadmaps = state.roadmaps.map((roadmap) => {
        return String(roadmap.id) === String(foundRoadmap.id) ? foundRoadmap : roadmap;
      });
    } catch (error) {
      console.error(error);
    }
  },
  removeDeliverableInSetOperation(state, action, dispatch) {
    try {
      const foundRoadmap = state.roadmaps.find((roadmap) => {
        return roadmap.milestones.some((milestone) => String(milestone.id) === String(action.input.milestoneId));
      });
      if (!foundRoadmap) {
        throw new Error("Roadmap with milestone not found");
      }

      const foundMilestone = foundRoadmap.milestones.find((milestone) => String(milestone.id) === String(action.input.milestoneId));
      if (!foundMilestone) {
        throw new Error("Milestone not found");
      }

      if (!foundMilestone.scope) {
        throw new Error("Milestone scope not found");
      }

      foundMilestone.scope.deliverables = foundMilestone.scope.deliverables.filter((deliverableId) => String(deliverableId) !== String(action.input.deliverableId));

      state.roadmaps = state.roadmaps.map((roadmap) => {
        return String(roadmap.id) === String(foundRoadmap.id) ? foundRoadmap : roadmap;
      });
    } catch (error) {
      console.error(error);
    }
  },
  setProgressInDeliverablesSetOperation(state, action, dispatch) {
    try {
      const foundRoadmap = state.roadmaps.find((roadmap) => {
        return roadmap.milestones.some((milestone) => String(milestone.id) === String(action.input.milestoneId));
      });
      if (!foundRoadmap) {
        throw new Error("Roadmap with milestone not found");
      }

      const foundMilestone = foundRoadmap.milestones.find((milestone) => String(milestone.id) === String(action.input.milestoneId));
      if (!foundMilestone || !foundMilestone.scope) {
        throw new Error("Milestone or scope not found");
      }

      if (action.input.progress) {
        if (action.input.progress.percentage !== undefined && action.input.progress.percentage !== null) {
          foundMilestone.scope.progress = { value: action.input.progress.percentage };
        } else if (action.input.progress.storyPoints) {
          foundMilestone.scope.progress = {
            total: action.input.progress.storyPoints.total,
            completed: action.input.progress.storyPoints.completed,
          };
        } else if (action.input.progress.binary !== undefined && action.input.progress.binary !== null) {
          foundMilestone.scope.progress = { isBinary: action.input.progress.binary };
        }
      }

      state.roadmaps = state.roadmaps.map((roadmap) => {
        return String(roadmap.id) === String(foundRoadmap.id) ? foundRoadmap : roadmap;
      });
    } catch (error) {
      console.error(error);
    }
  },
};
