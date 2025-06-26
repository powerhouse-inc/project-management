/**
 * This is a scaffold file meant for customization:
 * - change it by adding new tests or modifying the existing ones
 */

import { generateMock } from "@powerhousedao/codegen";
import utils from "../../gen/utils.js";
import {
  z,
  type EditRoadmapInput,
  type AddMilestoneInput,
  type RemoveMilestoneInput,
} from "../../gen/schema/index.js";
import { reducer } from "../../gen/reducer.js";
import * as creators from "../../gen/roadmaps/creators.js";
import type { ScopeOfWorkDocument } from "../../gen/types.js";

describe("Roadmaps Operations", () => {
  let document: ScopeOfWorkDocument;

  beforeEach(() => {
    document = utils.createDocument();
  });

  it("should handle editRoadmap operation", () => {
    const input: EditRoadmapInput = generateMock(z.EditRoadmapInputSchema());

    const updatedDocument = reducer(document, creators.editRoadmap(input));

    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].type).toBe("EDIT_ROADMAP");
    expect(updatedDocument.operations.global[0].input).toStrictEqual(input);
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });
  it("should handle addMilestone operation", () => {
    const input: AddMilestoneInput = generateMock(z.AddMilestoneInputSchema());

    const updatedDocument = reducer(document, creators.addMilestone(input));

    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].type).toBe("ADD_MILESTONE");
    expect(updatedDocument.operations.global[0].input).toStrictEqual(input);
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });
  it("should handle removeMilestone operation", () => {
    const input: RemoveMilestoneInput = generateMock(
      z.RemoveMilestoneInputSchema(),
    );

    const updatedDocument = reducer(document, creators.removeMilestone(input));

    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].type).toBe("REMOVE_MILESTONE");
    expect(updatedDocument.operations.global[0].input).toStrictEqual(input);
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });
});
