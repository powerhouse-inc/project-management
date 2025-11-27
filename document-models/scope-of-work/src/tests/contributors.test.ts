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
  addAgent,
  AddAgentInputSchema,
  removeAgent,
  RemoveAgentInputSchema,
  editAgent,
  EditAgentInputSchema,
} from "../../index.js";

describe("Contributors Operations", () => {
  it("should handle addAgent operation", () => {
    const document = utils.createDocument();
    const input = generateMock(AddAgentInputSchema());

    const updatedDocument = reducer(document, addAgent(input));

    expect(isScopeOfWorkDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe("ADD_AGENT");
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });
  it("should handle removeAgent operation", () => {
    const document = utils.createDocument();
    const input = generateMock(RemoveAgentInputSchema());

    const updatedDocument = reducer(document, removeAgent(input));

    expect(isScopeOfWorkDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "REMOVE_AGENT",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });
  it("should handle editAgent operation", () => {
    const document = utils.createDocument();
    const input = generateMock(EditAgentInputSchema());

    const updatedDocument = reducer(document, editAgent(input));

    expect(isScopeOfWorkDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe("EDIT_AGENT");
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });
});
