/**
 * This is a scaffold file meant for customization:
 * - modify it by implementing the reducer functions
 * - delete the file and run the code generator again to have it reset
 */

import type { ScopeOfWorkAgentsOperations } from "../../gen/agents/operations.js";
import type { AgentType } from "../../gen/types.js";

export const reducer: ScopeOfWorkAgentsOperations = {
  addAgentOperation(state, action, dispatch) {
    try {

      if (action.input.id === undefined || action.input.name === undefined) {
        throw new Error("Invalid input");
      }

      const agent = {
        id: action.input.id,
        name: action.input.name,
        agentType: action.input.agentType as AgentType || 'HUMAN',
        code: action.input.code || "",
        imageUrl: action.input.imageUrl || "",
      };

      state.contributors.push(agent);

    } catch (error) {
      console.error(error);
    }
  },
  removeAgentOperation(state, action, dispatch) {
    try {

      if (action.input.id === undefined) {
        throw new Error("Invalid agent id input");
      }

      const agent = state.contributors.find((agent) => agent.id === action.input.id);
      if (!agent) {
        throw new Error("Agent not found");
      }

      state.contributors = state.contributors.filter((agent) => agent.id !== action.input.id);

    } catch (error) {
      console.error(error);
    }
  },
  editAgentOperation(state, action, dispatch) {
    try {

      if (action.input.id === undefined) {
        throw new Error("Invalid agent id input");
      }

      const agent = state.contributors.find((agent) => agent.id === action.input.id);
      if (!agent) {
        throw new Error("Agent not found");
      }

      const updatedAgent = {
        ...agent,
        name: action.input.name || agent.name,
        agentType: action.input.agentType as AgentType || agent.agentType,
        code: action.input.code || agent.code,
      };

      state.contributors = state.contributors.map((agent) => agent.id === action.input.id ? updatedAgent : agent);

    } catch (error) {
      console.error(error);
    }
  },
};
