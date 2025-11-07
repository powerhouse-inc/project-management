/**
 * This is a scaffold file meant for customization:
 * - change it by adding new tests or modifying the existing ones
 */

import { describe, it, expect, beforeEach } from "vitest";
import { generateMock } from "@powerhousedao/codegen";
import utils from "../../gen/utils.js";
import {
  z,
  type AddRoadmapInput,
  type RemoveRoadmapInput,
  type EditRoadmapInput,
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
    const input: AddRoadmapInput = generateMock(z.AddRoadmapInputSchema());

    const updatedDocument = reducer(document, creators.addRoadmap(input));

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
    const input: RemoveRoadmapInput = generateMock(
      z.RemoveRoadmapInputSchema(),
    );

    const updatedDocument = reducer(document, creators.removeRoadmap(input));

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
    const input: EditRoadmapInput = generateMock(z.EditRoadmapInputSchema());

    const updatedDocument = reducer(document, creators.editRoadmap(input));

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
