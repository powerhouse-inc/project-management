/**
 * This is a scaffold file meant for customization:
 * - change it by adding new tests or modifying the existing ones
 */

import { describe, it, expect, beforeEach } from "vitest";
import { generateMock } from "@powerhousedao/codegen";
import utils from "../../gen/utils.js";
import { z, type EditScopeOfWorkInput } from "../../gen/schema/index.js";
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
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "EDIT_SCOPE_OF_WORK",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });
});
