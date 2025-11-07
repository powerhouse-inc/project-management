/**
 * This is a scaffold file meant for customization:
 * - change it by adding new tests or modifying the existing ones
 */

import { describe, it, expect, beforeEach } from "vitest";
import { generateMock } from "@powerhousedao/codegen";
import utils from "../../gen/utils.js";
import {
  z,
  type AddProjectInput,
  type UpdateProjectInput,
  type UpdateProjectOwnerInput,
  type RemoveProjectInput,
  type SetProjectMarginInput,
  type SetProjectTotalBudgetInput,
  type AddProjectDeliverableInput,
  type RemoveProjectDeliverableInput,
} from "../../gen/schema/index.js";
import { reducer } from "../../gen/reducer.js";
import * as creators from "../../gen/projects/creators.js";
import type { ScopeOfWorkDocument } from "../../gen/types.js";

describe("Projects Operations", () => {
  let document: ScopeOfWorkDocument;

  beforeEach(() => {
    document = utils.createDocument();
  });

  it("should handle addProject operation", () => {
    const input: AddProjectInput = generateMock(z.AddProjectInputSchema());

    const updatedDocument = reducer(document, creators.addProject(input));

    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "ADD_PROJECT",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });
  it("should handle updateProject operation", () => {
    const input: UpdateProjectInput = generateMock(
      z.UpdateProjectInputSchema(),
    );

    const updatedDocument = reducer(document, creators.updateProject(input));

    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "UPDATE_PROJECT",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });
  it("should handle updateProjectOwner operation", () => {
    const input: UpdateProjectOwnerInput = generateMock(
      z.UpdateProjectOwnerInputSchema(),
    );

    const updatedDocument = reducer(
      document,
      creators.updateProjectOwner(input),
    );

    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "UPDATE_PROJECT_OWNER",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });
  it("should handle removeProject operation", () => {
    const input: RemoveProjectInput = generateMock(
      z.RemoveProjectInputSchema(),
    );

    const updatedDocument = reducer(document, creators.removeProject(input));

    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "REMOVE_PROJECT",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });
  it("should handle setProjectMargin operation", () => {
    const input: SetProjectMarginInput = generateMock(
      z.SetProjectMarginInputSchema(),
    );

    const updatedDocument = reducer(document, creators.setProjectMargin(input));

    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "SET_PROJECT_MARGIN",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });
  it("should handle setProjectTotalBudget operation", () => {
    const input: SetProjectTotalBudgetInput = generateMock(
      z.SetProjectTotalBudgetInputSchema(),
    );

    const updatedDocument = reducer(
      document,
      creators.setProjectTotalBudget(input),
    );

    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "SET_PROJECT_TOTAL_BUDGET",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });
  it("should handle addProjectDeliverable operation", () => {
    const input: AddProjectDeliverableInput = generateMock(
      z.AddProjectDeliverableInputSchema(),
    );

    const updatedDocument = reducer(
      document,
      creators.addProjectDeliverable(input),
    );

    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "ADD_PROJECT_DELIVERABLE",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });
  it("should handle removeProjectDeliverable operation", () => {
    const input: RemoveProjectDeliverableInput = generateMock(
      z.RemoveProjectDeliverableInputSchema(),
    );

    const updatedDocument = reducer(
      document,
      creators.removeProjectDeliverable(input),
    );

    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "REMOVE_PROJECT_DELIVERABLE",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });
});
