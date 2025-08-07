/**
 * This is a scaffold file meant for customization:
 * - change it by adding new tests or modifying the existing ones
 */

import utils from "../../gen/utils.js";
import {
  type EditMilestoneInput,
  type AddCoordinatorInput,
  type RemoveCoordinatorInput,
  type AddMilestoneInput,
  type RemoveMilestoneInput,
} from "../../gen/schema/index.js";
import { reducer } from "../../gen/reducer.js";
import * as creators from "../../gen/milestones/creators.js";
import * as roadmapCreators from "../../gen/roadmaps/creators.js";
import type { ScopeOfWorkDocument } from "../../gen/types.js";

describe("Milestones Operations", () => {
  let document: ScopeOfWorkDocument;

  beforeEach(() => {
    document = utils.createDocument();
  });

  it("should handle addMilestone operation", () => {
    // Add a roadmap first
    const roadmapId = "roadmap-1";
    document.state.global.roadmaps.push({
      id: roadmapId,
      title: "Test Roadmap",
      slug: "test-roadmap",
      description: "desc",
      milestones: [],
    });

    const input: AddMilestoneInput = {
      id: "milestone-1",
      roadmapId,
      sequenceCode: "001",
      title: "Milestone 1",
      description: "desc",
      deliveryTarget: "2024-12-31",
    };

    const updatedDocument = reducer(document, creators.addMilestone(input));

    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].type).toBe("ADD_MILESTONE");
    expect(updatedDocument.operations.global[0].input).toStrictEqual(input);
    expect(updatedDocument.operations.global[0].index).toEqual(0);
    const roadmap = updatedDocument.state.global.roadmaps.find(r => r.id === roadmapId);
    expect(roadmap).toBeDefined();
    expect(roadmap!.milestones).toHaveLength(1);
    expect(roadmap!.milestones[0].id).toBe(input.id);
    expect(roadmap!.milestones[0].title).toBe(input.title);
  });

  it("should handle editMilestone operation", () => {
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
    updatedDocument = reducer(updatedDocument, creators.addMilestone({
      id: milestoneId,
      roadmapId,
      sequenceCode: "001",
      title: "Milestone 1",
      description: "desc",
      deliveryTarget: "2024-12-31",
    }));

    const input: EditMilestoneInput = {
      id: milestoneId,
      roadmapId,
      sequenceCode: "002",
      title: "Milestone 1 Updated",
      description: "desc updated",
      deliveryTarget: "2025-01-01",
    };

    updatedDocument = reducer(updatedDocument, creators.editMilestone(input));

    expect(updatedDocument.operations.global).toHaveLength(3);
    expect(updatedDocument.operations.global[2].type).toBe("EDIT_MILESTONE");
    expect(updatedDocument.operations.global[2].input).toStrictEqual(input);
    expect(updatedDocument.operations.global[2].index).toEqual(2);
    const roadmap = updatedDocument.state.global.roadmaps.find(r => r.id === roadmapId);
    expect(roadmap).toBeDefined();
    const milestone = roadmap!.milestones.find(m => String(m.id) === String(milestoneId));
    expect(milestone).toBeDefined();
    expect(milestone!.title).toBe(input.title);
    expect(milestone!.sequenceCode).toBe(input.sequenceCode);
    expect(milestone!.description).toBe(input.description);
    expect(milestone!.deliveryTarget).toBe(input.deliveryTarget);
  });

  it("should handle removeMilestone operation", () => {
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
    updatedDocument = reducer(updatedDocument, creators.addMilestone({
      id: milestoneId,
      roadmapId,
      sequenceCode: "001",
      title: "Milestone 1",
      description: "desc",
      deliveryTarget: "2024-12-31",
    }));

    const input: RemoveMilestoneInput = {
      id: milestoneId,
      roadmapId,
    };

    updatedDocument = reducer(updatedDocument, creators.removeMilestone(input));

    expect(updatedDocument.operations.global).toHaveLength(3);
    expect(updatedDocument.operations.global[2].type).toBe("REMOVE_MILESTONE");
    expect(updatedDocument.operations.global[2].input).toStrictEqual(input);
    expect(updatedDocument.operations.global[2].index).toEqual(2);
    const roadmap = updatedDocument.state.global.roadmaps.find(r => r.id === roadmapId);
    expect(roadmap).toBeDefined();
    expect(roadmap!.milestones).toHaveLength(0);
  });

  it("should handle addCoordinator operation", () => {
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
    updatedDocument = reducer(updatedDocument, creators.addMilestone({
      id: milestoneId,
      roadmapId,
      sequenceCode: "001",
      title: "Milestone 1",
      description: "desc",
      deliveryTarget: "2024-12-31",
    }));

    const input: AddCoordinatorInput = {
      id: "coordinator-1",
      milestoneId,
    };

    updatedDocument = reducer(updatedDocument, creators.addCoordinator(input));

    expect(updatedDocument.operations.global).toHaveLength(3);
    expect(updatedDocument.operations.global[2].type).toBe("ADD_COORDINATOR");
    expect(updatedDocument.operations.global[2].input).toStrictEqual(input);
    expect(updatedDocument.operations.global[2].index).toEqual(2);
    const roadmap = updatedDocument.state.global.roadmaps.find(r => r.id === roadmapId);
    expect(roadmap).toBeDefined();
    const milestone = roadmap!.milestones.find(m => m.id === milestoneId);
    expect(milestone).toBeDefined();
    expect(milestone!.coordinators).toContain(input.id);
  });

  it("should handle removeCoordinator operation", () => {
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
    updatedDocument = reducer(updatedDocument, creators.addMilestone({
      id: milestoneId,
      roadmapId,
      sequenceCode: "001",
      title: "Milestone 1",
      description: "desc",
      deliveryTarget: "2024-12-31",
    }));

    // Add a coordinator first
    const coordinatorId = "coordinator-1";
    updatedDocument = reducer(updatedDocument, creators.addCoordinator({
      id: coordinatorId,
      milestoneId,
    }));

    const input: RemoveCoordinatorInput = {
      id: coordinatorId,
      milestoneId,
    };

    updatedDocument = reducer(updatedDocument, creators.removeCoordinator(input));

    expect(updatedDocument.operations.global).toHaveLength(4);
    expect(updatedDocument.operations.global[3].type).toBe("REMOVE_COORDINATOR");
    expect(updatedDocument.operations.global[3].input).toStrictEqual(input);
    expect(updatedDocument.operations.global[3].index).toEqual(3);
    const roadmap = updatedDocument.state.global.roadmaps.find(r => r.id === roadmapId);
    expect(roadmap).toBeDefined();
    const milestone = roadmap!.milestones.find(m => m.id === milestoneId);
    expect(milestone).toBeDefined();
    expect(milestone!.coordinators).not.toContain(input.id);
  });
});
