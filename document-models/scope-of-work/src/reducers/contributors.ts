/**
 * This is a scaffold file meant for customization:
 * - modify it by implementing the reducer functions
 * - delete the file and run the code generator again to have it reset
 */

import type { ScopeOfWorkContributorsOperations } from "../../gen/contributors/operations.js";

export const reducer: ScopeOfWorkContributorsOperations = {
  addAgentOperation(state, action, dispatch) {


    if (action.input.id === undefined || action.input.name === undefined) {
      throw new Error("Invalid input");
    }

    const agent = {
      id: action.input.id,
      name: action.input.name,
      icon: action.input.icon || "",
      description: action.input.description || "",
    };

    state.contributors.push(agent);


  },
  removeAgentOperation(state, action, dispatch) {

    if (action.input.id === undefined) {
      throw new Error("Invalid agent id input");
    }

    const agent = state.contributors.find((agent) => agent.id === action.input.id);
    if (!agent) {
      throw new Error("Agent not found");
    }

    state.contributors = state.contributors.filter((agent) => agent.id !== action.input.id);


  },
  editAgentOperation(state, action, dispatch) {

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
      icon: action.input.icon || agent.icon,
      description: action.input.description || agent.description,
    };

    state.contributors = state.contributors.map((agent) => agent.id === action.input.id ? updatedAgent : agent);

  }

};
