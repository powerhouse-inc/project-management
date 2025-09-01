/**
 * This is a scaffold file meant for customization:
 * - change it by adding new tests or modifying the existing ones
 */

import utils from "../../gen/utils.js";
import {
  z,
  type EditRoadmapInput,
  type AddRoadmapInput,
  type RemoveRoadmapInput,
} from "../../gen/schema/index.js";
import { reducer } from "../../gen/reducer.js";
import * as creators from "../../gen/roadmaps/creators.js";
import type { ScopeOfWorkDocument } from "../../gen/types.js";

describe("Roadmaps Operations", () => {
  let document: ScopeOfWorkDocument;

  beforeEach(() => {
    document = utils.createDocument();
  });

  it("should handle addRoadmap operation", () => {
    const input: AddRoadmapInput = {
      id: "roadmap-1",
      title: "Test Roadmap",
      slug: "test-roadmap",
      description: "A test roadmap for testing purposes",
    };

    const updatedDocument = reducer(document, creators.addRoadmap(input));

    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe("ADD_ROADMAP");
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(input);
    expect(updatedDocument.operations.global[0].index).toEqual(0);
    expect(updatedDocument.state.global.roadmaps).toHaveLength(1);
    expect(updatedDocument.state.global.roadmaps[0].id).toBe(input.id);
    expect(updatedDocument.state.global.roadmaps[0].title).toBe(input.title);
    expect(updatedDocument.state.global.roadmaps[0].slug).toBe(input.slug);
    expect(updatedDocument.state.global.roadmaps[0].description).toBe(input.description);
    expect(updatedDocument.state.global.roadmaps[0].milestones).toHaveLength(0);
  });

  it("should handle removeRoadmap operation", () => {
    // First, add a roadmap to the document
    const addRoadmapInput: AddRoadmapInput = {
      id: "roadmap-1",
      title: "Test Roadmap",
      slug: "test-roadmap",
      description: "A test roadmap for testing purposes",
    };
    
    let updatedDocument = reducer(document, creators.addRoadmap(addRoadmapInput));
    
    // Now remove the roadmap
    const removeInput: RemoveRoadmapInput = {
      id: "roadmap-1",
    };

    updatedDocument = reducer(updatedDocument, creators.removeRoadmap(removeInput));

    expect(updatedDocument.operations.global).toHaveLength(2);
    expect(updatedDocument.operations.global[1].action.type).toBe("REMOVE_ROADMAP");
    expect(updatedDocument.operations.global[1].action.input).toStrictEqual(removeInput);
    expect(updatedDocument.operations.global[1].index).toEqual(1);
    expect(updatedDocument.state.global.roadmaps).toHaveLength(0);
  });
  
  it("should handle editRoadmap operation", () => {
    // First, add a roadmap to the document
    const addRoadmapInput: AddRoadmapInput = {
      id: "roadmap-2",
      title: "Original Title",
      slug: "original-slug",
      description: "Original description",
    };
    
    let updatedDocument = reducer(document, creators.addRoadmap(addRoadmapInput));
    
    // Now edit the roadmap
    const editInput: EditRoadmapInput = {
      id: "roadmap-2",
      title: "Updated Title",
      slug: "updated-slug",
      description: "Updated description",
    };

    updatedDocument = reducer(updatedDocument, creators.editRoadmap(editInput));

    expect(updatedDocument.operations.global).toHaveLength(2);
    expect(updatedDocument.operations.global[1].action.type).toBe("EDIT_ROADMAP");
    expect(updatedDocument.operations.global[1].action.input).toStrictEqual(editInput);
    expect(updatedDocument.operations.global[1].index).toEqual(1);
    expect(updatedDocument.state.global.roadmaps).toHaveLength(1);
    expect(updatedDocument.state.global.roadmaps[0].id).toBe("roadmap-2");
    expect(updatedDocument.state.global.roadmaps[0].title).toBe("Updated Title");
    expect(updatedDocument.state.global.roadmaps[0].slug).toBe("updated-slug");
    expect(updatedDocument.state.global.roadmaps[0].description).toBe("Updated description");
  });
});
