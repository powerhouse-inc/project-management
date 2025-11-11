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
  editScopeOfWork,
  EditScopeOfWorkInputSchema,
} from "../../index.js";

describe("ScopeOfWork Operations", () => {
  it("should handle editScopeOfWork operation", () => {
    const document = utils.createDocument();
    const input = generateMock(EditScopeOfWorkInputSchema());

    const updatedDocument = reducer(document, editScopeOfWork(input));

    expect(isScopeOfWorkDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "EDIT_SCOPE_OF_WORK",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });
});
