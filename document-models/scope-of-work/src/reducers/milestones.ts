/**
 * This is a scaffold file meant for customization:
 * - modify it by implementing the reducer functions
 * - delete the file and run the code generator again to have it reset
 */

import type { ScopeOfWorkMilestonesOperations } from "../../gen/milestones/operations.js";
import type { Deliverable, Milestone } from "../../gen/types.js";
import { applyInvariants } from "./projects.js";

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
        budget: 0,
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

      // remove deliverables linked to milestone from milestone.scope.deliverables
      if (foundMilestone.scope?.deliverables) {
        foundMilestone.scope.deliverables.forEach((deliverableId) => {
          state.deliverables = state.deliverables.filter((deliverable) => String(deliverable.id) !== String(deliverableId));
        })
      }

      foundRoadmap.milestones = foundRoadmap.milestones.filter((milestone) => String(milestone.id) !== String(action.input.id));
      state.roadmaps = state.roadmaps.map((roadmap) => {
        return String(roadmap.id) === String(foundRoadmap.id) ? foundRoadmap : roadmap;
      });
      applyInvariants(state, ["budget", "margin"]);
    } catch (error) {
      console.error(error);
    }
  },
  addMilestoneDeliverableOperation(state, action, dispatch) {
    try {

      // add deliverable to deliverables 
      const newDeliverable: Deliverable = {
        id: action.input.deliverableId,
        owner: '',
        title: action.input.title,
        code: '',
        description: '',
        status: 'DRAFT',
        workProgress: {
          value: 0,
        },
        keyResults: [],
        budgetAnchor: {
          project: '',
          unit: 'Hours',
          unitCost: 0,
          quantity: 0,
          margin: 0,
        },
      }

      state.deliverables.push(newDeliverable);

      // add deliverable to milestone.scope.deliverables
      const roadmap = state.roadmaps.find((roadmap) => {
        return roadmap.milestones.find((milestone => String(milestone.id) === String(action.input.milestoneId)))
      });
      const foundMilestone = roadmap?.milestones.find((milestone) => String(milestone.id) === String(action.input.milestoneId));
      if (!foundMilestone) {
        throw new Error("Milestone not found");
      }
      if (!foundMilestone.scope) {
        throw new Error("Milestone deliverable set not found");
      }
      foundMilestone.scope.deliverables.push(newDeliverable.id);


    } catch (error) {
      console.error(error);
    }
  },
  removeMilestoneDeliverableOperation(state, action, dispatch) {
    try {
      const roadmap = state.roadmaps.find((roadmap) => {
        return roadmap.milestones.find((milestone => String(milestone.id) === String(action.input.milestoneId)))
      });
      if (!roadmap) {
        throw new Error("Roadmap not found");
      }
      const foundMilestone = roadmap.milestones.find((milestone) => String(milestone.id) === String(action.input.milestoneId));
      if (!foundMilestone) {
        throw new Error("Milestone not found");
      }
      if (!foundMilestone.scope) {
        throw new Error("Milestone deliverable set not found");
      }
      foundMilestone.scope.deliverables = foundMilestone.scope.deliverables.filter((deliverableId) => deliverableId !== action.input.deliverableId);

      state.deliverables = state.deliverables.map((deliverable) => {
        return String(deliverable.id) === String(action.input.deliverableId) ? {
          ...deliverable,
          budgetAnchor: {
            project: "",
            unit: deliverable.budgetAnchor?.unit || "Hours",
            unitCost: deliverable.budgetAnchor?.unitCost || 0,
            quantity: deliverable.budgetAnchor?.quantity || 0,
            margin: deliverable.budgetAnchor?.margin || 0,
          },
        } : deliverable;
      });

    } catch (error) {
      console.error(error);
    }
  },
};
