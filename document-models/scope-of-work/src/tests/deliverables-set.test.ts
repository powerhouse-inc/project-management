/**
 * This is a scaffold file meant for customization:
 * - change it by adding new tests or modifying the existing ones
 */

import { generateMock } from "@powerhousedao/codegen";
import utils from "../../gen/utils.js";
import {
  z,
  type EditDeliverablesSetInput,
  type AddDeliverableInSetInput,
  type RemoveDeliverableInSetInput,
  type SetProgressInDeliverablesSetInput,
} from "../../gen/schema/index.js";
import { reducer } from "../../gen/reducer.js";
import * as creators from "../../gen/deliverables-set/creators.js";
import type { ScopeOfWorkDocument } from "../../gen/types.js";

describe("DeliverablesSet Operations", () => {
  let document: ScopeOfWorkDocument;

  beforeEach(() => {
    document = utils.createDocument();
  });

  it("should handle editDeliverablesSet operation", () => {
    const input: EditDeliverablesSetInput = generateMock(
      z.EditDeliverablesSetInputSchema(),
    );

    const updatedDocument = reducer(
      document,
      creators.editDeliverablesSet(input),
    );

    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].type).toBe(
      "EDIT_DELIVERABLES_SET",
    );
    expect(updatedDocument.operations.global[0].input).toStrictEqual(input);
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });
  it("should handle addDeliverableInSet operation", () => {
    const input: AddDeliverableInSetInput = generateMock(
      z.AddDeliverableInSetInputSchema(),
    );

    const updatedDocument = reducer(
      document,
      creators.addDeliverableInSet(input),
    );

    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].type).toBe(
      "ADD_DELIVERABLE_IN_SET",
    );
    expect(updatedDocument.operations.global[0].input).toStrictEqual(input);
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });
  it("should handle removeDeliverableInSet operation", () => {
    const input: RemoveDeliverableInSetInput = generateMock(
      z.RemoveDeliverableInSetInputSchema(),
    );

    const updatedDocument = reducer(
      document,
      creators.removeDeliverableInSet(input),
    );

    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].type).toBe(
      "REMOVE_DELIVERABLE_IN_SET",
    );
    expect(updatedDocument.operations.global[0].input).toStrictEqual(input);
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });
  it("should handle setProgressInDeliverablesSet operation", () => {
    const input: SetProgressInDeliverablesSetInput = generateMock(
      z.SetProgressInDeliverablesSetInputSchema(),
    );

    const updatedDocument = reducer(
      document,
      creators.setProgressInDeliverablesSet(input),
    );

    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].type).toBe(
      "SET_PROGRESS_IN_DELIVERABLES_SET",
    );
    expect(updatedDocument.operations.global[0].input).toStrictEqual(input);
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });
});
