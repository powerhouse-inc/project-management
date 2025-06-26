/**
 * This is a scaffold file meant for customization:
 * - change it by adding new tests or modifying the existing ones
 */

import { generateMock } from "@powerhousedao/codegen";
import utils from "../../gen/utils.js";
import {
  z,
  type EditDeliverableInput,
  type AddKeyResultInput,
  type RemoveKeyResultInput,
  type SetProgressModeInput,
} from "../../gen/schema/index.js";
import { reducer } from "../../gen/reducer.js";
import * as creators from "../../gen/deliverables/creators.js";
import type { ScopeOfWorkDocument } from "../../gen/types.js";

describe("Deliverables Operations", () => {
  let document: ScopeOfWorkDocument;

  beforeEach(() => {
    document = utils.createDocument();
  });

  it("should handle editDeliverable operation", () => {
    const input: EditDeliverableInput = generateMock(
      z.EditDeliverableInputSchema(),
    );

    const updatedDocument = reducer(document, creators.editDeliverable(input));

    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].type).toBe("EDIT_DELIVERABLE");
    expect(updatedDocument.operations.global[0].input).toStrictEqual(input);
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });
  it("should handle addKeyResult operation", () => {
    const input: AddKeyResultInput = generateMock(z.AddKeyResultInputSchema());

    const updatedDocument = reducer(document, creators.addKeyResult(input));

    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].type).toBe("ADD_KEY_RESULT");
    expect(updatedDocument.operations.global[0].input).toStrictEqual(input);
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });
  it("should handle removeKeyResult operation", () => {
    const input: RemoveKeyResultInput = generateMock(
      z.RemoveKeyResultInputSchema(),
    );

    const updatedDocument = reducer(document, creators.removeKeyResult(input));

    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].type).toBe("REMOVE_KEY_RESULT");
    expect(updatedDocument.operations.global[0].input).toStrictEqual(input);
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });
  it("should handle setProgressMode operation", () => {
    const input: SetProgressModeInput = generateMock(
      z.SetProgressModeInputSchema(),
    );

    const updatedDocument = reducer(document, creators.setProgressMode(input));

    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].type).toBe("SET_PROGRESS_MODE");
    expect(updatedDocument.operations.global[0].input).toStrictEqual(input);
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });
});
