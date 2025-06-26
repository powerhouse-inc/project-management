/**
 * This is a scaffold file meant for customization:
 * - change it by adding new tests or modifying the existing ones
 */

import { generateMock } from "@powerhousedao/codegen";
import utils from "../../gen/utils.js";
import {
  z,
  type EditScopeOfWorkInput,
  type AddRoadmapInput,
  type RemoveRoadmapInput,
} from "../../gen/schema/index.js";
import { reducer } from "../../gen/reducer.js";
import * as creators from "../../gen/scope-of-work/creators.js";
import type { ScopeOfWorkDocument } from "../../gen/types.js";

describe("ScopeOfWork Operations", () => {
  let document: ScopeOfWorkDocument;

  beforeEach(() => {
    document = utils.createDocument();
  });

  it("should handle editScopeOfWork operation", () => {
    const input: EditScopeOfWorkInput = generateMock(
      z.EditScopeOfWorkInputSchema(),
    );

    const updatedDocument = reducer(document, creators.editScopeOfWork(input));

    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].type).toBe(
      "EDIT_SCOPE_OF_WORK",
    );
    expect(updatedDocument.operations.global[0].input).toStrictEqual(input);
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });
  it("should handle addRoadmap operation", () => {
    const input: AddRoadmapInput = generateMock(z.AddRoadmapInputSchema());

    const updatedDocument = reducer(document, creators.addRoadmap(input));

    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].type).toBe("ADD_ROADMAP");
    expect(updatedDocument.operations.global[0].input).toStrictEqual(input);
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });
  it("should handle removeRoadmap operation", () => {
    const input: RemoveRoadmapInput = generateMock(
      z.RemoveRoadmapInputSchema(),
    );

    const updatedDocument = reducer(document, creators.removeRoadmap(input));

    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].type).toBe("REMOVE_ROADMAP");
    expect(updatedDocument.operations.global[0].input).toStrictEqual(input);
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });
});
