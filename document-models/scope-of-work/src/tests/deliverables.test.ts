/**
 * This is a scaffold file meant for customization:
 * - change it by adding new tests or modifying the existing ones
 */

import utils from "../../gen/utils.js";
import {
  z,
  type EditDeliverableInput,
  type AddKeyResultInput,
  type RemoveKeyResultInput,
} from "../../gen/schema/index.js";
import { reducer } from "../../gen/reducer.js";
import * as creators from "../../gen/deliverables/creators.js";
import type { AddDeliverableInput, DeliverableStatus, RemoveDeliverableInput, ScopeOfWorkDocument, SetDeliverableBudgetAnchorProjectInput, SetDeliverableProgressInput } from "../../gen/types.js";

describe("Deliverables Operations", () => {
  let document: ScopeOfWorkDocument;

  beforeEach(() => {
    document = utils.createDocument();
  });

  it("should handle addDeliverable operation", () => {

    const input: AddDeliverableInput = {
      id: "1",
      owner: "1",
      title: "Test Deliverable",
      code: "TEST",
      description: "Test Description",
      status: "DRAFT",
    }

    const updatedDocument = reducer(document, creators.addDeliverable(input));

    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].type).toBe("ADD_DELIVERABLE");
    expect(updatedDocument.operations.global[0].input).toStrictEqual(input);
    expect(updatedDocument.operations.global[0].index).toEqual(0);
    expect(updatedDocument.state.global.deliverables).toHaveLength(1);
    expect(updatedDocument.state.global.deliverables[0].owner).toBe(input.owner);
  });

  it("should handle removeDeliverable operation", () => {

    const addDeliverableInput: AddDeliverableInput = {
      id: "1",
      owner: "1",
      title: "Test Deliverable",
      code: "TEST",
      description: "Test Description",
      status: "DRAFT" as DeliverableStatus,
    }

    let updatedDocument = reducer(document, creators.addDeliverable(addDeliverableInput));

    const input: RemoveDeliverableInput = {
      id: "1",
    }

    updatedDocument = reducer(updatedDocument, creators.removeDeliverable(input));


    expect(updatedDocument.operations.global).toHaveLength(2);
    expect(updatedDocument.operations.global[1].type).toBe("REMOVE_DELIVERABLE");
    expect(updatedDocument.operations.global[1].input).toStrictEqual(input);
    expect(updatedDocument.operations.global[1].index).toEqual(1);
    expect(updatedDocument.state.global.deliverables).toHaveLength(0);
  });

  it("should handle editDeliverable operation", () => {
    const addDeliverableInput: AddDeliverableInput = {
      id: "1",
      owner: "1",
      title: "Test Deliverable",
      code: "TEST",
      description: "Test Description",
      status: "DRAFT" as DeliverableStatus,
    }

    
    let updatedDocument = reducer(document, creators.addDeliverable(addDeliverableInput));

    const input: EditDeliverableInput = {
      id: "1",
      owner: "2",
      title: "Test Deliverable 2",
      code: "TEST2",
      description: "Test Description 2",
      status: "IN_PROGRESS" as DeliverableStatus,
    }

    updatedDocument = reducer(updatedDocument, creators.editDeliverable(input));


    expect(updatedDocument.operations.global).toHaveLength(2);
    expect(updatedDocument.operations.global[1].type).toBe("EDIT_DELIVERABLE");
    expect(updatedDocument.operations.global[1].input).toStrictEqual(input);
    expect(updatedDocument.operations.global[1].index).toEqual(1);
    expect(updatedDocument.state.global.deliverables[0].owner).toBe(input.owner);
    expect(updatedDocument.state.global.deliverables[0].title).toBe(input.title);
    expect(updatedDocument.state.global.deliverables[0].code).toBe(input.code);
    expect(updatedDocument.state.global.deliverables[0].description).toBe(input.description);
    expect(updatedDocument.state.global.deliverables[0].status).toBe(input.status);
  });

    it("should handle setDeliverableProgress percentage operation", () => {

      const deliverable = {
        id: "1",
        owner: "1",
        title: "Test Deliverable",
        code: "TEST",
        description: "Test Description",
        status: "DRAFT" as DeliverableStatus,
        keyResults: [],
        workProgress: null,
      }
      let updatedDocument = reducer(document, creators.addDeliverable(deliverable));

      const input: SetDeliverableProgressInput = {
        id: "1",
        workProgress: {
          percentage: 50,
        },
      }

      updatedDocument = reducer(updatedDocument, creators.setDeliverableProgress(input));

      expect(updatedDocument.operations.global).toHaveLength(2);
      expect(updatedDocument.operations.global[1].type).toBe("SET_DELIVERABLE_PROGRESS");
      expect(updatedDocument.operations.global[1].input).toStrictEqual(input);
      expect(updatedDocument.operations.global[1].index).toEqual(1);
      expect(updatedDocument.state.global.deliverables[0].workProgress).toStrictEqual({ value: input.workProgress!.percentage });
    });

    it("should handle addKeyResult operation", () => {

      const deliverable = {
        id: "1",
        owner: "1",
        title: "Test Deliverable",
        code: "TEST",
        description: "Test Description",
        status: "DRAFT" as DeliverableStatus,
        keyResults: [],
        workProgress: null,
      }
      let updatedDocument = reducer(document, creators.addDeliverable(deliverable));

      const input: AddKeyResultInput = {
        id: "1",
        deliverableId: "1",
        title: "Test Key Result",
        link: "https://test.com",
      }

      updatedDocument = reducer(updatedDocument, creators.addKeyResult(input));

      expect(updatedDocument.operations.global).toHaveLength(2);
      expect(updatedDocument.operations.global[1].type).toBe("ADD_KEY_RESULT");
      expect(updatedDocument.operations.global[1].input).toStrictEqual(input);
      expect(updatedDocument.operations.global[1].index).toEqual(1);
      expect(updatedDocument.state.global.deliverables[0].keyResults).toHaveLength(1);
      expect(updatedDocument.state.global.deliverables[0].keyResults[0].title).toBe(input.title);
      expect(updatedDocument.state.global.deliverables[0].keyResults[0].link).toBe(input.link);
    });

    it("should handle removeKeyResult operation", () => {

      const deliverable = {
        id: "1",
        owner: "1",
        title: "Test Deliverable",
        code: "TEST",
        description: "Test Description",
        status: "DRAFT" as DeliverableStatus,
        keyResults: [],
        workProgress: null,
      }
      let updatedDocument = reducer(document, creators.addDeliverable(deliverable));

      const input: AddKeyResultInput = {
        id: "1",
        deliverableId: "1",
        title: "Test Key Result",
        link: "https://test.com",
      }

      updatedDocument = reducer(updatedDocument, creators.addKeyResult(input));

      const removeInput: RemoveKeyResultInput = {
        id: "1",
        deliverableId: "1",
      }
      updatedDocument = reducer(updatedDocument, creators.removeKeyResult(removeInput));

      expect(updatedDocument.operations.global).toHaveLength(3);
      expect(updatedDocument.operations.global[2].type).toBe("REMOVE_KEY_RESULT");
      expect(updatedDocument.operations.global[2].input).toStrictEqual(removeInput);
      expect(updatedDocument.operations.global[2].index).toEqual(2);
      expect(updatedDocument.state.global.deliverables[0].keyResults).toHaveLength(0);
    });

    it("should handle setDeliverableBudgetAnchorProject operation", () => {
      const deliverable = {
        id: "1",
        owner: "1",
        title: "Test Deliverable",
        code: "TEST",
        description: "Test Description",
        status: "DRAFT" as DeliverableStatus,
        keyResults: [],
        workProgress: null,
      }

      let updatedDocument = reducer(document, creators.addDeliverable(deliverable));

      const input: SetDeliverableBudgetAnchorProjectInput = {
        deliverableId: "1",
        project: "1",
        unit: "Hours",
        unitCost: 100,
        quantity: 1,
        margin: 10,
      }

      updatedDocument = reducer(updatedDocument, creators.setDeliverableBudgetAnchorProject(input));

      expect(updatedDocument.operations.global).toHaveLength(2);
      expect(updatedDocument.operations.global[1].type).toBe("SET_DELIVERABLE_BUDGET_ANCHOR_PROJECT");
      expect(updatedDocument.operations.global[1].input).toStrictEqual(input);
      expect(updatedDocument.operations.global[1].index).toEqual(1);
      expect(updatedDocument.state.global.deliverables[0].budgetAnchor).toStrictEqual({
        project: input.project,
        unit: input.unit,
        unitCost: input.unitCost,
        quantity: input.quantity,
        margin: input.margin,
      });
    });


});
