/**
 * This is a scaffold file meant for customization:
 * - change it by adding new tests or modifying the existing ones
 */

import utils from "../../gen/utils.js";
import {
  type EditDeliverablesSetInput,
  type AddDeliverableInSetInput,
  type RemoveDeliverableInSetInput,
  type SetProgressInDeliverablesSetInput,
} from "../../gen/schema/index.js";
import { reducer } from "../../gen/reducer.js";
import * as creators from "../../gen/deliverables-set/creators.js";
import * as roadmapCreators from "../../gen/roadmaps/creators.js";
import * as milestoneCreators from "../../gen/milestones/creators.js";
import type { ScopeOfWorkDocument } from "../../gen/types.js";

describe("DeliverablesSet Operations", () => {
  let document: ScopeOfWorkDocument;

  beforeEach(() => {
    document = utils.createDocument();
  });

  it("should handle editDeliverablesSet operation", () => {
    // Add a roadmap first using the reducer
    const roadmapId = "roadmap-1";
    let updatedDocument = reducer(document, roadmapCreators.addRoadmap({
      id: roadmapId,
      title: "Test Roadmap",
      slug: "test-roadmap",
      description: "desc",
    }));

    // Add a milestone using the reducer
    const milestoneId = "milestone-1";
    updatedDocument = reducer(updatedDocument, milestoneCreators.addMilestone({
      id: milestoneId,
      roadmapId,
      sequenceCode: "001",
      title: "Milestone 1",
      description: "desc",
      deliveryTarget: "2024-12-31",
      estimatedBudgetCap: "1000",
    }));

    const input: EditDeliverablesSetInput = {
      milestoneId,
      projectId: "project-1",
      status: "IN_PROGRESS",
      deliverablesCompleted: {
        total: 5,
        completed: 2,
      },
    };

    updatedDocument = reducer(updatedDocument, creators.editDeliverablesSet(input));

    expect(updatedDocument.operations.global).toHaveLength(3);
    expect(updatedDocument.operations.global[2].type).toBe("EDIT_DELIVERABLES_SET");
    expect(updatedDocument.operations.global[2].input).toStrictEqual(input);
    expect(updatedDocument.operations.global[2].index).toEqual(2);
    
    const roadmap = updatedDocument.state.global.roadmaps.find(r => r.id === roadmapId);
    expect(roadmap).toBeDefined();
    const milestone = roadmap!.milestones.find(m => m.id === milestoneId);
    expect(milestone).toBeDefined();
    expect(milestone!.scope).toBeDefined();
    expect(milestone!.scope!.status).toBe(input.status);
    expect(milestone!.scope!.deliverablesCompleted).toStrictEqual(input.deliverablesCompleted);
  });

  it("should handle addDeliverableInSet operation", () => {
    // Add a roadmap first using the reducer
    const roadmapId = "roadmap-1";
    let updatedDocument = reducer(document, roadmapCreators.addRoadmap({
      id: roadmapId,
      title: "Test Roadmap",
      slug: "test-roadmap",
      description: "desc",
    }));

    // Add a milestone using the reducer
    const milestoneId = "milestone-1";
    updatedDocument = reducer(updatedDocument, milestoneCreators.addMilestone({
      id: milestoneId,
      roadmapId,
      sequenceCode: "001",
      title: "Milestone 1",
      description: "desc",
      deliveryTarget: "2024-12-31",
      estimatedBudgetCap: "1000",
    }));

    const input: AddDeliverableInSetInput = {
      milestoneId,
      deliverableId: "deliverable-1",
    };

    updatedDocument = reducer(updatedDocument, creators.addDeliverableInSet(input));

    expect(updatedDocument.operations.global).toHaveLength(3);
    expect(updatedDocument.operations.global[2].type).toBe("ADD_DELIVERABLE_IN_SET");
    expect(updatedDocument.operations.global[2].input).toStrictEqual(input);
    expect(updatedDocument.operations.global[2].index).toEqual(2);
    
    const roadmap = updatedDocument.state.global.roadmaps.find(r => r.id === roadmapId);
    expect(roadmap).toBeDefined();
    const milestone = roadmap!.milestones.find(m => m.id === milestoneId);
    expect(milestone).toBeDefined();
    expect(milestone!.scope).toBeDefined();
    expect(milestone!.scope!.deliverables).toContain(input.deliverableId);
  });

  it("should handle removeDeliverableInSet operation", () => {
    // Add a roadmap first using the reducer
    const roadmapId = "roadmap-1";
    let updatedDocument = reducer(document, roadmapCreators.addRoadmap({
      id: roadmapId,
      title: "Test Roadmap",
      slug: "test-roadmap",
      description: "desc",
    }));

    // Add a milestone using the reducer
    const milestoneId = "milestone-1";
    updatedDocument = reducer(updatedDocument, milestoneCreators.addMilestone({
      id: milestoneId,
      roadmapId,
      sequenceCode: "001",
      title: "Milestone 1",
      description: "desc",
      deliveryTarget: "2024-12-31",
      estimatedBudgetCap: "1000",
    }));

    // Add a deliverable to the set first
    const deliverableId = "deliverable-1";
    updatedDocument = reducer(updatedDocument, creators.addDeliverableInSet({
      milestoneId,
      deliverableId,
    }));

    const input: RemoveDeliverableInSetInput = {
      milestoneId,
      projectId: "project-1",
      deliverableId,
    };

    updatedDocument = reducer(updatedDocument, creators.removeDeliverableInSet(input));

    expect(updatedDocument.operations.global).toHaveLength(4);
    expect(updatedDocument.operations.global[3].type).toBe("REMOVE_DELIVERABLE_IN_SET");
    expect(updatedDocument.operations.global[3].input).toStrictEqual(input);
    expect(updatedDocument.operations.global[3].index).toEqual(3);
    
    const roadmap = updatedDocument.state.global.roadmaps.find(r => r.id === roadmapId);
    expect(roadmap).toBeDefined();
    const milestone = roadmap!.milestones.find(m => m.id === milestoneId);
    expect(milestone).toBeDefined();
    expect(milestone!.scope).toBeDefined();
    expect(milestone!.scope!.deliverables).not.toContain(input.deliverableId);
  });

  it("should handle setProgressInDeliverablesSet operation", () => {
    // Add a roadmap first using the reducer
    const roadmapId = "roadmap-1";
    let updatedDocument = reducer(document, roadmapCreators.addRoadmap({
      id: roadmapId,
      title: "Test Roadmap",
      slug: "test-roadmap",
      description: "desc",
    }));

    // Add a milestone using the reducer
    const milestoneId = "milestone-1";
    updatedDocument = reducer(updatedDocument, milestoneCreators.addMilestone({
      id: milestoneId,
      roadmapId,
      sequenceCode: "001",
      title: "Milestone 1",
      description: "desc",
      deliveryTarget: "2024-12-31",
      estimatedBudgetCap: "1000",
    }));

    const input: SetProgressInDeliverablesSetInput = {
      milestoneId,
      progress: {
        percentage: 75,
      },
    };

    updatedDocument = reducer(updatedDocument, creators.setProgressInDeliverablesSet(input));

    expect(updatedDocument.operations.global).toHaveLength(3);
    expect(updatedDocument.operations.global[2].type).toBe("SET_PROGRESS_IN_DELIVERABLES_SET");
    expect(updatedDocument.operations.global[2].input).toStrictEqual(input);
    expect(updatedDocument.operations.global[2].index).toEqual(2);
    
    const roadmap = updatedDocument.state.global.roadmaps.find(r => r.id === roadmapId);
    expect(roadmap).toBeDefined();
    const milestone = roadmap!.milestones.find(m => m.id === milestoneId);
    expect(milestone).toBeDefined();
    expect(milestone!.scope).toBeDefined();
    expect(milestone!.scope!.progress).toStrictEqual({ value: input.progress!.percentage });
  });
});
