/**
 * This is a scaffold file meant for customization:
 * - change it by adding new tests or modifying the existing ones
 */

import utils from "../../gen/utils.js";
import {
  z,
  type EditScopeOfWorkInput,
  type AddRoadmapInput,
  type RemoveRoadmapInput,
} from "../../gen/schema/index.js";
import { reducer } from "../../gen/reducer.js";
import * as creators from "../../gen/scope-of-work/creators.js";
import type { ScopeOfWorkDocument } from "../../gen/types.js";

describe("ScopeOfWork Operations", () => {
  let document: ScopeOfWorkDocument;

  beforeEach(() => {
    document = utils.createDocument();
  });

  it("should handle editScopeOfWork operation", () => {
    const input: EditScopeOfWorkInput = {
      title: "New Title",
      description: "New Description",
      status: "DRAFT",
    };

    const updatedDocument = reducer(document, creators.editScopeOfWork(input));

    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "EDIT_SCOPE_OF_WORK",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(input);
    expect(updatedDocument.operations.global[0].index).toEqual(0);
    expect(updatedDocument.state.global.title).toBe(input.title);
    expect(updatedDocument.state.global.description).toBe(input.description);
    expect(updatedDocument.state.global.status).toBe(input.status);
  });
});
