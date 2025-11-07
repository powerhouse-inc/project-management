/**
 * This is a scaffold file meant for customization:
 * - change it by adding new tests or modifying the existing ones
 */

import { describe, it, expect, beforeEach } from "vitest";
import { generateMock } from "@powerhousedao/codegen";
import utils from "../../gen/utils.js";
import {
  z,
  type AddDeliverableInput,
  type RemoveDeliverableInput,
  type EditDeliverableInput,
  type SetDeliverableProgressInput,
  type AddKeyResultInput,
  type RemoveKeyResultInput,
  type EditKeyResultInput,
  type SetDeliverableBudgetAnchorProjectInput,
} from "../../gen/schema/index.js";
import { reducer } from "../../gen/reducer.js";
import * as creators from "../../gen/deliverables/creators.js";
import type { ScopeOfWorkDocument } from "../../gen/types.js";

describe("Deliverables Operations", () => {
  let document: ScopeOfWorkDocument;

  beforeEach(() => {
    document = utils.createDocument();
  });

  it("should handle addDeliverable operation", () => {
    const input: AddDeliverableInput = generateMock(
      z.AddDeliverableInputSchema(),
    );

    const updatedDocument = reducer(document, creators.addDeliverable(input));

    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "ADD_DELIVERABLE",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });
  it("should handle removeDeliverable operation", () => {
    const input: RemoveDeliverableInput = generateMock(
      z.RemoveDeliverableInputSchema(),
    );

    const updatedDocument = reducer(
      document,
      creators.removeDeliverable(input),
    );

    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "REMOVE_DELIVERABLE",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });
  it("should handle editDeliverable operation", () => {
    const input: EditDeliverableInput = generateMock(
      z.EditDeliverableInputSchema(),
    );

    const updatedDocument = reducer(document, creators.editDeliverable(input));

    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "EDIT_DELIVERABLE",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });
  it("should handle setDeliverableProgress operation", () => {
    const input: SetDeliverableProgressInput = generateMock(
      z.SetDeliverableProgressInputSchema(),
    );

    const updatedDocument = reducer(
      document,
      creators.setDeliverableProgress(input),
    );

    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "SET_DELIVERABLE_PROGRESS",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });
  it("should handle addKeyResult operation", () => {
    const input: AddKeyResultInput = generateMock(z.AddKeyResultInputSchema());

    const updatedDocument = reducer(document, creators.addKeyResult(input));

    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "ADD_KEY_RESULT",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });
  it("should handle removeKeyResult operation", () => {
    const input: RemoveKeyResultInput = generateMock(
      z.RemoveKeyResultInputSchema(),
    );

    const updatedDocument = reducer(document, creators.removeKeyResult(input));

    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "REMOVE_KEY_RESULT",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });
  it("should handle editKeyResult operation", () => {
    const input: EditKeyResultInput = generateMock(
      z.EditKeyResultInputSchema(),
    );

    const updatedDocument = reducer(document, creators.editKeyResult(input));

    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "EDIT_KEY_RESULT",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });
  it("should handle setDeliverableBudgetAnchorProject operation", () => {
    const input: SetDeliverableBudgetAnchorProjectInput = generateMock(
      z.SetDeliverableBudgetAnchorProjectInputSchema(),
    );

    const updatedDocument = reducer(
      document,
      creators.setDeliverableBudgetAnchorProject(input),
    );

    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "SET_DELIVERABLE_BUDGET_ANCHOR_PROJECT",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });
});
