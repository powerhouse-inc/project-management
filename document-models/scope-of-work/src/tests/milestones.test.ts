/**
 * This is a scaffold file meant for customization:
 * - change it by adding new tests or modifying the existing ones
 */

import { generateMock } from "@powerhousedao/codegen";
import utils from "../../gen/utils.js";
import {
  z,
  type EditMilestoneInput,
  type AddCoordinatorInput,
  type RemoveCoordinatorInput,
  type AddDeliverablesInput,
  type RemoveDeliverablesInput,
} from "../../gen/schema/index.js";
import { reducer } from "../../gen/reducer.js";
import * as creators from "../../gen/milestones/creators.js";
import type { ScopeOfWorkDocument } from "../../gen/types.js";

describe("Milestones Operations", () => {
  let document: ScopeOfWorkDocument;

  beforeEach(() => {
    document = utils.createDocument();
  });

  it("should handle editMilestone operation", () => {
    const input: EditMilestoneInput = generateMock(
      z.EditMilestoneInputSchema(),
    );

    const updatedDocument = reducer(document, creators.editMilestone(input));

    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].type).toBe("EDIT_MILESTONE");
    expect(updatedDocument.operations.global[0].input).toStrictEqual(input);
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });
  it("should handle addCoordinator operation", () => {
    const input: AddCoordinatorInput = generateMock(
      z.AddCoordinatorInputSchema(),
    );

    const updatedDocument = reducer(document, creators.addCoordinator(input));

    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].type).toBe("ADD_COORDINATOR");
    expect(updatedDocument.operations.global[0].input).toStrictEqual(input);
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });
  it("should handle removeCoordinator operation", () => {
    const input: RemoveCoordinatorInput = generateMock(
      z.RemoveCoordinatorInputSchema(),
    );

    const updatedDocument = reducer(
      document,
      creators.removeCoordinator(input),
    );

    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].type).toBe(
      "REMOVE_COORDINATOR",
    );
    expect(updatedDocument.operations.global[0].input).toStrictEqual(input);
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });
  it("should handle addDeliverables operation", () => {
    const input: AddDeliverablesInput = generateMock(
      z.AddDeliverablesInputSchema(),
    );

    const updatedDocument = reducer(document, creators.addDeliverables(input));

    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].type).toBe("ADD_DELIVERABLES");
    expect(updatedDocument.operations.global[0].input).toStrictEqual(input);
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });
  it("should handle removeDeliverables operation", () => {
    const input: RemoveDeliverablesInput = generateMock(
      z.RemoveDeliverablesInputSchema(),
    );

    const updatedDocument = reducer(
      document,
      creators.removeDeliverables(input),
    );

    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].type).toBe(
      "REMOVE_DELIVERABLES",
    );
    expect(updatedDocument.operations.global[0].input).toStrictEqual(input);
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });
});
