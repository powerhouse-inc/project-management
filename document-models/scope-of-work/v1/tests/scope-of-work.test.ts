import { generateMock } from "@powerhousedao/common/utils";
import { describe, expect, it } from "vitest";
import {
  reducer,
  utils,
  isScopeOfWorkDocument,
  editScopeOfWork,
  EditScopeOfWorkInputSchema,
} from "@powerhousedao/project-management/document-models/scope-of-work/v1";

describe("ScopeOfWorkOperations", () => {
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
