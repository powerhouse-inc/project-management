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
  editDeliverablesSet,
  EditDeliverablesSetInputSchema,
  addDeliverableInSet,
  AddDeliverableInSetInputSchema,
  removeDeliverableInSet,
  RemoveDeliverableInSetInputSchema,
} from "../../index.js";

describe("DeliverablesSet Operations", () => {
  it("should handle editDeliverablesSet operation", () => {
    const document = utils.createDocument();
    const input = generateMock(EditDeliverablesSetInputSchema());

    const updatedDocument = reducer(document, editDeliverablesSet(input));

    expect(isScopeOfWorkDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "EDIT_DELIVERABLES_SET",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });
  it("should handle addDeliverableInSet operation", () => {
    const document = utils.createDocument();
    const input = generateMock(AddDeliverableInSetInputSchema());

    const updatedDocument = reducer(document, addDeliverableInSet(input));

    expect(isScopeOfWorkDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "ADD_DELIVERABLE_IN_SET",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });
  it("should handle removeDeliverableInSet operation", () => {
    const document = utils.createDocument();
    const input = generateMock(RemoveDeliverableInSetInputSchema());

    const updatedDocument = reducer(document, removeDeliverableInSet(input));

    expect(isScopeOfWorkDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "REMOVE_DELIVERABLE_IN_SET",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });
});
