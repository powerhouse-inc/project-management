/**
 * This is a scaffold file meant for customization:
 * - change it by adding new tests or modifying the existing ones
 */

import utils from "../../gen/utils.js";
import {
  z,
  type AddAgentInput,
  type RemoveAgentInput,
  type EditAgentInput,
} from "../../gen/schema/index.js";
import { reducer } from "../../gen/reducer.js";
import * as creators from "../../gen/agents/creators.js";
import type { ScopeOfWorkDocument } from "../../gen/types.js";

describe("Agents Operations", () => {
  let document: ScopeOfWorkDocument;

  beforeEach(() => {
    document = utils.createDocument();
  });

  it("should handle addAgent operation", () => {
    const input: AddAgentInput = {
      id: "1",
      name: "John Doe",
      agentType: "HUMAN",
      code: "123456",
      imageUrl: "https://example.com/image.png",
    };

    const updatedDocument = reducer(document, creators.addAgent(input));

    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].type).toBe("ADD_AGENT");
    expect(updatedDocument.operations.global[0].input).toStrictEqual(input);
    expect(updatedDocument.operations.global[0].index).toEqual(0);
    expect(updatedDocument.state.global.agents).toHaveLength(1);
    expect(updatedDocument.state.global.agents[0]).toStrictEqual(input);
  });
  it("should handle removeAgent operation", () => {
    // First, add an agent to the document
    const addAgentInput: AddAgentInput = {
      id: "agent-1",
      name: "Test Agent",
      agentType: "HUMAN",
      code: "TEST001",
      imageUrl: "https://example.com/test.png",
    };
    
    let updatedDocument = reducer(document, creators.addAgent(addAgentInput));
    
    // Now remove the agent
    const removeInput: RemoveAgentInput = {
      id: "agent-1",
    };

    updatedDocument = reducer(updatedDocument, creators.removeAgent(removeInput));

    expect(updatedDocument.operations.global).toHaveLength(2);
    expect(updatedDocument.operations.global[1].type).toBe("REMOVE_AGENT");
    expect(updatedDocument.operations.global[1].input).toStrictEqual(removeInput);
    expect(updatedDocument.operations.global[1].index).toEqual(1);
    expect(updatedDocument.state.global.agents).toHaveLength(0);
  });
  
  it("should handle editAgent operation", () => {
    // First, add an agent to the document
    const addAgentInput: AddAgentInput = {
      id: "agent-2",
      name: "Original Name",
      agentType: "HUMAN",
      code: "ORIG001",
      imageUrl: "https://example.com/original.png",
    };
    
    let updatedDocument = reducer(document, creators.addAgent(addAgentInput));
    
    // Now edit the agent
    const editInput: EditAgentInput = {
      id: "agent-2",
      name: "Updated Name",
      agentType: "AI",
      code: "UPD001",
      imageUrl: "https://example.com/updated.png",
    };

    updatedDocument = reducer(updatedDocument, creators.editAgent(editInput));

    expect(updatedDocument.operations.global).toHaveLength(2);
    expect(updatedDocument.operations.global[1].type).toBe("EDIT_AGENT");
    expect(updatedDocument.operations.global[1].input).toStrictEqual(editInput);
    expect(updatedDocument.operations.global[1].index).toEqual(1);
    expect(updatedDocument.state.global.agents).toHaveLength(1);
    expect(updatedDocument.state.global.agents[0]).toStrictEqual({
      id: "agent-2",
      name: "Updated Name",
      agentType: "AI",
      code: "UPD001",
      imageUrl: "https://example.com/updated.png",
    });
  });
});
