/**
 * This is a scaffold file meant for customization:
 * - modify it by implementing the reducer functions
 * - delete the file and run the code generator again to have it reset
 */

import type { ScopeOfWorkMilestonesOperations } from "../../gen/milestones/operations.js";

export const reducer: ScopeOfWorkMilestonesOperations = {
  editMilestoneOperation(state, action, dispatch) {
    try {
      const foundRoadmap = state.roadmaps.find((roadmap) => String(roadmap.id) === String(action.input.roadmapId));
      if (!foundRoadmap) {
        throw new Error("Roadmap not found");
      }

      const foundMilestone = foundRoadmap.milestones.find((milestone) => String(milestone.id) === String(action.input.id));
      if (!foundMilestone) {
        throw new Error("Milestone not found");
      }

      const updatedMilestone = {
        ...foundMilestone,
        sequenceCode: action.input.sequenceCode || foundMilestone.sequenceCode,
        title: action.input.title || foundMilestone.title,
        description: action.input.description || foundMilestone.description,
        deliveryTarget: action.input.deliveryTarget || foundMilestone.deliveryTarget,
        estimatedBudgetCap: action.input.estimatedBudgetCap || foundMilestone.estimatedBudgetCap,
      };

      foundRoadmap.milestones = foundRoadmap.milestones.map((milestone) => String(milestone.id) === String(action.input.id) ? updatedMilestone : milestone);
      state.roadmaps = state.roadmaps.map((roadmap) => {
        return String(roadmap.id) === String(action.input.roadmapId) ? foundRoadmap : roadmap;
      });
    } catch (error) {
      console.error(error);
    }
  },
  addCoordinatorOperation(state, action, dispatch) {
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

      if (!foundMilestone.coordinators.includes(action.input.id)) {
        foundMilestone.coordinators.push(action.input.id);
      }

      state.roadmaps = state.roadmaps.map((roadmap) => {
        return String(roadmap.id) === String(foundRoadmap.id) ? foundRoadmap : roadmap;
      });
    } catch (error) {
      console.error(error);
    }
  },
  removeCoordinatorOperation(state, action, dispatch) {
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

      foundMilestone.coordinators = foundMilestone.coordinators.filter((coordinatorId) => coordinatorId !== action.input.id);

      state.roadmaps = state.roadmaps.map((roadmap) => {
        return String(roadmap.id) === String(foundRoadmap.id) ? foundRoadmap : roadmap;
      });
    } catch (error) {
      console.error(error);
    }
  },
  addMilestoneOperation(state, action, dispatch) {
    try {
      if (action.input.id === undefined || action.input.roadmapId === undefined) {
        throw new Error("Invalid input");
      }

      const foundRoadmap = state.roadmaps.find((roadmap) => String(roadmap.id) === String(action.input.roadmapId));
      if (!foundRoadmap) {
        throw new Error("Roadmap not found");
      }

      const milestone = {
        id: action.input.id,
        sequenceCode: action.input.sequenceCode || "",
        title: action.input.title || "",
        description: action.input.description || "",
        deliveryTarget: action.input.deliveryTarget || "",
        estimatedBudgetCap: action.input.estimatedBudgetCap || "",
        coordinators: [],
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
      };

      foundRoadmap.milestones.push(milestone);
      state.roadmaps = state.roadmaps.map((roadmap) => {
        return String(roadmap.id) === String(action.input.roadmapId) ? foundRoadmap : roadmap;
      });
    } catch (error) {
      console.error(error);
    }
  },
  removeMilestoneOperation(state, action, dispatch) {
    try {
      if (action.input.id === undefined || action.input.roadmapId === undefined) {
        throw new Error("Invalid input");
      }

      const foundRoadmap = state.roadmaps.find((roadmap) => String(roadmap.id) === String(action.input.roadmapId));
      if (!foundRoadmap) {
        throw new Error("Roadmap not found");
      }

      const foundMilestone = foundRoadmap.milestones.find((milestone) => String(milestone.id) === String(action.input.id));
      if (!foundMilestone) {
        throw new Error("Milestone not found");
      }

      foundRoadmap.milestones = foundRoadmap.milestones.filter((milestone) => String(milestone.id) !== String(action.input.id));
      state.roadmaps = state.roadmaps.map((roadmap) => {
        return String(roadmap.id) === String(foundRoadmap.id) ? foundRoadmap : roadmap;
      });
    } catch (error) {
      console.error(error);
    }
  },
};
