/**
 * This is a scaffold file meant for customization:
 * - change it by adding new tests or modifying the existing ones
 */

import { describe, it, expect } from "vitest";
import { generateMock } from "@powerhousedao/codegen";
import {
  reducer,
  utils,
  isScopeOfWorkDocument,
  addRoadmap,
  AddRoadmapInputSchema,
  removeRoadmap,
  RemoveRoadmapInputSchema,
  editRoadmap,
  EditRoadmapInputSchema,
} from "../../index.js";

describe("Roadmaps Operations", () => {
  it("should handle addRoadmap operation", () => {
    const document = utils.createDocument();
    const input = generateMock(AddRoadmapInputSchema());

    const updatedDocument = reducer(document, addRoadmap(input));

    expect(isScopeOfWorkDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "ADD_ROADMAP",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });
  it("should handle removeRoadmap operation", () => {
    const document = utils.createDocument();
    const input = generateMock(RemoveRoadmapInputSchema());

    const updatedDocument = reducer(document, removeRoadmap(input));

    expect(isScopeOfWorkDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "REMOVE_ROADMAP",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });
  it("should handle editRoadmap operation", () => {
    const document = utils.createDocument();
    const input = generateMock(EditRoadmapInputSchema());

    const updatedDocument = reducer(document, editRoadmap(input));

    expect(isScopeOfWorkDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "EDIT_ROADMAP",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });
});
