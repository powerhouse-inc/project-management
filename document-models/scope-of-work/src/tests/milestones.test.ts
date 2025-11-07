/**
 * This is a scaffold file meant for customization:
 * - change it by adding new tests or modifying the existing ones
 */

import { describe, it, expect, beforeEach } from "vitest";
import { generateMock } from "@powerhousedao/codegen";
import utils from "../../gen/utils.js";
import {
  z,
  type AddMilestoneInput,
  type RemoveMilestoneInput,
  type EditMilestoneInput,
  type AddCoordinatorInput,
  type RemoveCoordinatorInput,
  type AddMilestoneDeliverableInput,
  type RemoveMilestoneDeliverableInput,
} from "../../gen/schema/index.js";
import { reducer } from "../../gen/reducer.js";
import * as creators from "../../gen/milestones/creators.js";
import type { ScopeOfWorkDocument } from "../../gen/types.js";

describe("Milestones Operations", () => {
  let document: ScopeOfWorkDocument;

  beforeEach(() => {
    document = utils.createDocument();
  });

  it("should handle addMilestone operation", () => {
    const input: AddMilestoneInput = generateMock(z.AddMilestoneInputSchema());

    const updatedDocument = reducer(document, creators.addMilestone(input));

    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "ADD_MILESTONE",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });
  it("should handle removeMilestone operation", () => {
    const input: RemoveMilestoneInput = generateMock(
      z.RemoveMilestoneInputSchema(),
    );

    const updatedDocument = reducer(document, creators.removeMilestone(input));

    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "REMOVE_MILESTONE",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });
  it("should handle editMilestone operation", () => {
    const input: EditMilestoneInput = generateMock(
      z.EditMilestoneInputSchema(),
    );

    const updatedDocument = reducer(document, creators.editMilestone(input));

    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "EDIT_MILESTONE",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });
  it("should handle addCoordinator operation", () => {
    const input: AddCoordinatorInput = generateMock(
      z.AddCoordinatorInputSchema(),
    );

    const updatedDocument = reducer(document, creators.addCoordinator(input));

    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "ADD_COORDINATOR",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
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
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "REMOVE_COORDINATOR",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });
  it("should handle addMilestoneDeliverable operation", () => {
    const input: AddMilestoneDeliverableInput = generateMock(
      z.AddMilestoneDeliverableInputSchema(),
    );

    const updatedDocument = reducer(
      document,
      creators.addMilestoneDeliverable(input),
    );

    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "ADD_MILESTONE_DELIVERABLE",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });
  it("should handle removeMilestoneDeliverable operation", () => {
    const input: RemoveMilestoneDeliverableInput = generateMock(
      z.RemoveMilestoneDeliverableInputSchema(),
    );

    const updatedDocument = reducer(
      document,
      creators.removeMilestoneDeliverable(input),
    );

    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "REMOVE_MILESTONE_DELIVERABLE",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });
});
