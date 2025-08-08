/**
 * This is a scaffold file meant for customization:
 * - modify it by implementing the reducer functions
 * - delete the file and run the code generator again to have it reset
 */

import { de } from "zod/v4/locales";
import type { ScopeOfWorkProjectsOperations } from "../../gen/projects/operations.js";
import type { Deliverable, DeliverablesSet, Project, ScopeOfWorkState } from "../../gen/types.js";

export const reducer: ScopeOfWorkProjectsOperations = {
  addProjectOperation(state, action, dispatch) {
    try {
      const project = {
        id: action.input.id,
        code: action.input.code,
        title: action.input.title,
        projectOwner: action.input.projectOwner || "",
        abstract: action.input.abstract || "",
        imageUrl: action.input.imageUrl || "",
        budgetType: action.input.budgetType || "CAPEX",
        currency: action.input.currency || "USD",
        budget: action.input.budget || 0,
        expenditure: {
          percentage: 0,
          actuals: 0,
          cap: 0
        },
        scope: {
          deliverables: [],
          status: "DRAFT" as const,
          progress: {
            value: 0,
          },
          deliverablesCompleted: {
            total: 0,
            completed: 0,
          },
        },
      }
      state.projects.push(project);
    } catch (error) {
      console.error(error);
    }
  },
  updateProjectOperation(state, action, dispatch) {
    try {
      const project = state.projects.find((p) => p.id === action.input.id);
      if (!project) {
        throw new Error("Project not found");
      }
      Object.assign(project, action.input);
    } catch (error) {
      console.error(error);
    }
  },
  updateProjectOwnerOperation(state, action, dispatch) {
    try {
      const project = state.projects.find((p) => p.id === action.input.id);
      if (!project) {
        throw new Error("Project not found");
      }
      project.projectOwner = action.input.projectOwner || "";
    } catch (error) {
      console.error(error);
    }
  },
  removeProjectOperation(state, action, dispatch) {
    try {
      state.projects = state.projects.filter((p) => p.id !== action.input.projectId);
    } catch (error) {
      console.error(error);
    }
  },
  setProjectMarginOperation(state, action, dispatch) {
    try {
      const project = state.projects.find((p) => p.id === action.input.projectId);
      if (!project) {
        throw new Error("Project not found");
      }

      const projectDeliverableSet = project.scope;
      if (!projectDeliverableSet) {
        throw new Error("Project deliverable set not found`");
      }
      if (projectDeliverableSet.deliverables.length < 1) {
        throw new Error("Project deliverable set has no deliverables");
      }

      const projectDeliverables = projectDeliverableSet.deliverables.map(id => state.deliverables.find(d => d.id === id)).filter(d => d !== undefined);


      projectDeliverables.forEach((deliverable: Deliverable) => {

        if (deliverable.budgetAnchor) {
          deliverable.budgetAnchor = {
            ...deliverable.budgetAnchor,
            margin: action.input.margin,
          }
        }

      });

      return applyInvariants(state, ["budget"]);

    } catch (error) {
      console.error(error);
    }
  },
  setProjectTotalBudgetOperation(state, action, dispatch) {
    try {
      const project = state.projects.find((p) => p.id === action.input.projectId);
      if (!project) {
        throw new Error("Project not found");
      }
      project.budget = action.input.totalBudget;
      return applyInvariants(state, ["margin"]);
    } catch (error) {
      console.error(error);
    }
  },
};



export const applyInvariants = (state: ScopeOfWorkState, updates: String[]) => {

  /*
  invariant: budget = totalCost * margin
   
  */

  if (updates.includes("budget")) {
    state.projects.forEach((project) => {
      if (project.scope) {
        project.budget = calculateTotalBudget(state, project.scope);
      }
    })
    state.roadmaps.forEach((roadmap) => {
      roadmap.milestones.forEach((milestone) => {
        if (milestone.scope) {
          milestone.budget = calculateTotalBudget(state, milestone.scope);
        }
      })
    })
  }

  if (updates.includes("margin")) {
    state.projects.forEach((project) => {
      if (project.scope) {
        const margin = project.budget ? project.budget / calculateTotalCost(state, project.scope!) : 0;
        const deliverables = project.scope.deliverables.map(id => state.deliverables.find(d => d.id === id));
        deliverables.forEach((deliverable: any) => {
          if (deliverable?.budgetAnchor) {
            deliverable.budgetAnchor = {
              ...deliverable.budgetAnchor,
              margin
            }
          }
        })
      }
    })
  }

}

export const calculateTotalCost = (state: ScopeOfWorkState, deliverableSet: DeliverablesSet) => {
  const deliverables = deliverableSet.deliverables.map(id => state.deliverables.find(d => d.id === id));
  const totalCost = deliverables.reduce((acc, deliverable) => {
    if (!deliverable) {
      throw new Error("Deliverable not found");
    }
    return acc + (deliverable.budgetAnchor?.unitCost || 0) * (deliverable.budgetAnchor?.quantity || 0);
  }, 0);
  return totalCost;

}

const calculateTotalBudget = (state: ScopeOfWorkState, deliverableSet: DeliverablesSet) => {
  const deliverables = deliverableSet.deliverables.map(id => state.deliverables.find(d => d.id === id));
  const totalBudget = deliverables.reduce((acc, deliverable) => {
    if (!deliverable) {
      throw new Error("Deliverable not found");
    }
    // Assume margin is a percentage (e.g., 5 means 5%)
    // Convert margin to a multiplier: (1 + margin/100)
    return acc + (deliverable.budgetAnchor?.unitCost || 0) * (deliverable.budgetAnchor?.quantity || 0) * (1 + (deliverable.budgetAnchor?.margin || 0) / 100);
  }, 0);
  return totalBudget;
}