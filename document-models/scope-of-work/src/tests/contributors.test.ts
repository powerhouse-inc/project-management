/**
 * This is a scaffold file meant for customization:
 * - change it by adding new tests or modifying the existing ones
 */

import { describe, it, expect, beforeEach } from "vitest";
import { generateMock } from "@powerhousedao/codegen";
import utils from "../../gen/utils.js";
import {
  z,
  type AddAgentInput,
  type RemoveAgentInput,
  type EditAgentInput,
} from "../../gen/schema/index.js";
import { reducer } from "../../gen/reducer.js";
import * as creators from "../../gen/contributors/creators.js";
import type { ScopeOfWorkDocument } from "../../gen/types.js";

describe("Contributors Operations", () => {
  let document: ScopeOfWorkDocument;

  beforeEach(() => {
    document = utils.createDocument();
  });

  it("should handle addAgent operation", () => {
    const input: AddAgentInput = generateMock(z.AddAgentInputSchema());

    const updatedDocument = reducer(document, creators.addAgent(input));

    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].type).toBe("ADD_AGENT");
    expect(updatedDocument.operations.global[0].input).toStrictEqual(input);
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });
  it("should handle removeAgent operation", () => {
    const input: RemoveAgentInput = generateMock(z.RemoveAgentInputSchema());

    const updatedDocument = reducer(document, creators.removeAgent(input));

    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].type).toBe("REMOVE_AGENT");
    expect(updatedDocument.operations.global[0].input).toStrictEqual(input);
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });
  it("should handle editAgent operation", () => {
    const input: EditAgentInput = generateMock(z.EditAgentInputSchema());

    const updatedDocument = reducer(document, creators.editAgent(input));

    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].type).toBe("EDIT_AGENT");
    expect(updatedDocument.operations.global[0].input).toStrictEqual(input);
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });
});
