import { type Subgraph } from "@powerhousedao/reactor-api";
import { addFile } from "document-drive";
import {
  actions,
  type EditScopeOfWorkInput,
  type AddDeliverableInput,
  type RemoveDeliverableInput,
  type EditDeliverableInput,
  type SetDeliverableProgressInput,
  type AddKeyResultInput,
  type RemoveKeyResultInput,
  type EditKeyResultInput,
  type SetDeliverableBudgetAnchorProjectInput,
  type AddRoadmapInput,
  type RemoveRoadmapInput,
  type EditRoadmapInput,
  type AddMilestoneInput,
  type RemoveMilestoneInput,
  type EditMilestoneInput,
  type AddCoordinatorInput,
  type RemoveCoordinatorInput,
  type AddMilestoneDeliverableInput,
  type RemoveMilestoneDeliverableInput,
  type EditDeliverablesSetInput,
  type AddDeliverableInSetInput,
  type RemoveDeliverableInSetInput,
  type AddAgentInput,
  type RemoveAgentInput,
  type EditAgentInput,
  type AddProjectInput,
  type UpdateProjectInput,
  type UpdateProjectOwnerInput,
  type RemoveProjectInput,
  type SetProjectMarginInput,
  type SetProjectTotalBudgetInput,
  type AddProjectDeliverableInput,
  type RemoveProjectDeliverableInput,
  type ScopeOfWorkDocument,
} from "../../document-models/scope-of-work/index.js";
import { setName } from "document-model";

export const getResolvers = (subgraph: Subgraph): Record<string, unknown> => {
  const reactor = subgraph.reactor;

  return {
    Query: {
      ScopeOfWork: async () => {
        return {
          getDocument: async (args: { docId: string; driveId: string }) => {
            const { docId, driveId } = args;

            if (!docId) {
              throw new Error("Document id is required");
            }

            if (driveId) {
              const docIds = await reactor.getDocuments(driveId);
              if (!docIds.includes(docId)) {
                throw new Error(
                  `Document with id ${docId} is not part of ${driveId}`,
                );
              }
            }

            const doc = await reactor.getDocument<ScopeOfWorkDocument>(docId);
            return {
              driveId: driveId,
              ...doc,
              ...doc.header,
              created: doc.header.createdAtUtcIso,
              lastModified: doc.header.lastModifiedAtUtcIso,
              state: doc.state.global,
              stateJSON: doc.state.global,
              revision: doc.header?.revision?.global ?? 0,
            };
          },
          getDocuments: async (args: { driveId: string }) => {
            const { driveId } = args;
            const docsIds = await reactor.getDocuments(driveId);
            const docs = await Promise.all(
              docsIds.map(async (docId) => {
                const doc =
                  await reactor.getDocument<ScopeOfWorkDocument>(docId);
                return {
                  driveId: driveId,
                  ...doc,
                  ...doc.header,
                  created: doc.header.createdAtUtcIso,
                  lastModified: doc.header.lastModifiedAtUtcIso,
                  state: doc.state.global,
                  stateJSON: doc.state.global,
                  revision: doc.header?.revision?.global ?? 0,
                };
              }),
            );

            return docs.filter(
              (doc) => doc.header.documentType === "powerhouse/scopeofwork",
            );
          },
        };
      },
    },
    Mutation: {
      ScopeOfWork_createDocument: async (
        _: unknown,
        args: { name: string; driveId?: string },
      ) => {
        const { driveId, name } = args;
        const document = await reactor.addDocument("powerhouse/scopeofwork");

        if (driveId) {
          await reactor.addAction(
            driveId,
            addFile({
              name,
              id: document.header.id,
              documentType: "powerhouse/scopeofwork",
            }),
          );
        }

        if (name) {
          await reactor.addAction(document.header.id, setName(name));
        }

        return document.header.id;
      },

      ScopeOfWork_editScopeOfWork: async (
        _: unknown,
        args: { docId: string; input: EditScopeOfWorkInput },
      ) => {
        const { docId, input } = args;
        const doc = await reactor.getDocument<ScopeOfWorkDocument>(docId);
        if (!doc) {
          throw new Error("Document not found");
        }

        const result = await reactor.addAction(
          docId,
          actions.editScopeOfWork(input),
        );

        if (result.status !== "SUCCESS") {
          throw new Error(result.error?.message ?? "Failed to editScopeOfWork");
        }

        return true;
      },

      ScopeOfWork_addDeliverable: async (
        _: unknown,
        args: { docId: string; input: AddDeliverableInput },
      ) => {
        const { docId, input } = args;
        const doc = await reactor.getDocument<ScopeOfWorkDocument>(docId);
        if (!doc) {
          throw new Error("Document not found");
        }

        const result = await reactor.addAction(
          docId,
          actions.addDeliverable(input),
        );

        if (result.status !== "SUCCESS") {
          throw new Error(result.error?.message ?? "Failed to addDeliverable");
        }

        return true;
      },

      ScopeOfWork_removeDeliverable: async (
        _: unknown,
        args: { docId: string; input: RemoveDeliverableInput },
      ) => {
        const { docId, input } = args;
        const doc = await reactor.getDocument<ScopeOfWorkDocument>(docId);
        if (!doc) {
          throw new Error("Document not found");
        }

        const result = await reactor.addAction(
          docId,
          actions.removeDeliverable(input),
        );

        if (result.status !== "SUCCESS") {
          throw new Error(
            result.error?.message ?? "Failed to removeDeliverable",
          );
        }

        return true;
      },

      ScopeOfWork_editDeliverable: async (
        _: unknown,
        args: { docId: string; input: EditDeliverableInput },
      ) => {
        const { docId, input } = args;
        const doc = await reactor.getDocument<ScopeOfWorkDocument>(docId);
        if (!doc) {
          throw new Error("Document not found");
        }

        const result = await reactor.addAction(
          docId,
          actions.editDeliverable(input),
        );

        if (result.status !== "SUCCESS") {
          throw new Error(result.error?.message ?? "Failed to editDeliverable");
        }

        return true;
      },

      ScopeOfWork_setDeliverableProgress: async (
        _: unknown,
        args: { docId: string; input: SetDeliverableProgressInput },
      ) => {
        const { docId, input } = args;
        const doc = await reactor.getDocument<ScopeOfWorkDocument>(docId);
        if (!doc) {
          throw new Error("Document not found");
        }

        const result = await reactor.addAction(
          docId,
          actions.setDeliverableProgress(input),
        );

        if (result.status !== "SUCCESS") {
          throw new Error(
            result.error?.message ?? "Failed to setDeliverableProgress",
          );
        }

        return true;
      },

      ScopeOfWork_addKeyResult: async (
        _: unknown,
        args: { docId: string; input: AddKeyResultInput },
      ) => {
        const { docId, input } = args;
        const doc = await reactor.getDocument<ScopeOfWorkDocument>(docId);
        if (!doc) {
          throw new Error("Document not found");
        }

        const result = await reactor.addAction(
          docId,
          actions.addKeyResult(input),
        );

        if (result.status !== "SUCCESS") {
          throw new Error(result.error?.message ?? "Failed to addKeyResult");
        }

        return true;
      },

      ScopeOfWork_removeKeyResult: async (
        _: unknown,
        args: { docId: string; input: RemoveKeyResultInput },
      ) => {
        const { docId, input } = args;
        const doc = await reactor.getDocument<ScopeOfWorkDocument>(docId);
        if (!doc) {
          throw new Error("Document not found");
        }

        const result = await reactor.addAction(
          docId,
          actions.removeKeyResult(input),
        );

        if (result.status !== "SUCCESS") {
          throw new Error(result.error?.message ?? "Failed to removeKeyResult");
        }

        return true;
      },

      ScopeOfWork_editKeyResult: async (
        _: unknown,
        args: { docId: string; input: EditKeyResultInput },
      ) => {
        const { docId, input } = args;
        const doc = await reactor.getDocument<ScopeOfWorkDocument>(docId);
        if (!doc) {
          throw new Error("Document not found");
        }

        const result = await reactor.addAction(
          docId,
          actions.editKeyResult(input),
        );

        if (result.status !== "SUCCESS") {
          throw new Error(result.error?.message ?? "Failed to editKeyResult");
        }

        return true;
      },

      ScopeOfWork_setDeliverableBudgetAnchorProject: async (
        _: unknown,
        args: { docId: string; input: SetDeliverableBudgetAnchorProjectInput },
      ) => {
        const { docId, input } = args;
        const doc = await reactor.getDocument<ScopeOfWorkDocument>(docId);
        if (!doc) {
          throw new Error("Document not found");
        }

        const result = await reactor.addAction(
          docId,
          actions.setDeliverableBudgetAnchorProject(input),
        );

        if (result.status !== "SUCCESS") {
          throw new Error(
            result.error?.message ??
              "Failed to setDeliverableBudgetAnchorProject",
          );
        }

        return true;
      },

      ScopeOfWork_addRoadmap: async (
        _: unknown,
        args: { docId: string; input: AddRoadmapInput },
      ) => {
        const { docId, input } = args;
        const doc = await reactor.getDocument<ScopeOfWorkDocument>(docId);
        if (!doc) {
          throw new Error("Document not found");
        }

        const result = await reactor.addAction(
          docId,
          actions.addRoadmap(input),
        );

        if (result.status !== "SUCCESS") {
          throw new Error(result.error?.message ?? "Failed to addRoadmap");
        }

        return true;
      },

      ScopeOfWork_removeRoadmap: async (
        _: unknown,
        args: { docId: string; input: RemoveRoadmapInput },
      ) => {
        const { docId, input } = args;
        const doc = await reactor.getDocument<ScopeOfWorkDocument>(docId);
        if (!doc) {
          throw new Error("Document not found");
        }

        const result = await reactor.addAction(
          docId,
          actions.removeRoadmap(input),
        );

        if (result.status !== "SUCCESS") {
          throw new Error(result.error?.message ?? "Failed to removeRoadmap");
        }

        return true;
      },

      ScopeOfWork_editRoadmap: async (
        _: unknown,
        args: { docId: string; input: EditRoadmapInput },
      ) => {
        const { docId, input } = args;
        const doc = await reactor.getDocument<ScopeOfWorkDocument>(docId);
        if (!doc) {
          throw new Error("Document not found");
        }

        const result = await reactor.addAction(
          docId,
          actions.editRoadmap(input),
        );

        if (result.status !== "SUCCESS") {
          throw new Error(result.error?.message ?? "Failed to editRoadmap");
        }

        return true;
      },

      ScopeOfWork_addMilestone: async (
        _: unknown,
        args: { docId: string; input: AddMilestoneInput },
      ) => {
        const { docId, input } = args;
        const doc = await reactor.getDocument<ScopeOfWorkDocument>(docId);
        if (!doc) {
          throw new Error("Document not found");
        }

        const result = await reactor.addAction(
          docId,
          actions.addMilestone(input),
        );

        if (result.status !== "SUCCESS") {
          throw new Error(result.error?.message ?? "Failed to addMilestone");
        }

        return true;
      },

      ScopeOfWork_removeMilestone: async (
        _: unknown,
        args: { docId: string; input: RemoveMilestoneInput },
      ) => {
        const { docId, input } = args;
        const doc = await reactor.getDocument<ScopeOfWorkDocument>(docId);
        if (!doc) {
          throw new Error("Document not found");
        }

        const result = await reactor.addAction(
          docId,
          actions.removeMilestone(input),
        );

        if (result.status !== "SUCCESS") {
          throw new Error(result.error?.message ?? "Failed to removeMilestone");
        }

        return true;
      },

      ScopeOfWork_editMilestone: async (
        _: unknown,
        args: { docId: string; input: EditMilestoneInput },
      ) => {
        const { docId, input } = args;
        const doc = await reactor.getDocument<ScopeOfWorkDocument>(docId);
        if (!doc) {
          throw new Error("Document not found");
        }

        const result = await reactor.addAction(
          docId,
          actions.editMilestone(input),
        );

        if (result.status !== "SUCCESS") {
          throw new Error(result.error?.message ?? "Failed to editMilestone");
        }

        return true;
      },

      ScopeOfWork_addCoordinator: async (
        _: unknown,
        args: { docId: string; input: AddCoordinatorInput },
      ) => {
        const { docId, input } = args;
        const doc = await reactor.getDocument<ScopeOfWorkDocument>(docId);
        if (!doc) {
          throw new Error("Document not found");
        }

        const result = await reactor.addAction(
          docId,
          actions.addCoordinator(input),
        );

        if (result.status !== "SUCCESS") {
          throw new Error(result.error?.message ?? "Failed to addCoordinator");
        }

        return true;
      },

      ScopeOfWork_removeCoordinator: async (
        _: unknown,
        args: { docId: string; input: RemoveCoordinatorInput },
      ) => {
        const { docId, input } = args;
        const doc = await reactor.getDocument<ScopeOfWorkDocument>(docId);
        if (!doc) {
          throw new Error("Document not found");
        }

        const result = await reactor.addAction(
          docId,
          actions.removeCoordinator(input),
        );

        if (result.status !== "SUCCESS") {
          throw new Error(
            result.error?.message ?? "Failed to removeCoordinator",
          );
        }

        return true;
      },

      ScopeOfWork_addMilestoneDeliverable: async (
        _: unknown,
        args: { docId: string; input: AddMilestoneDeliverableInput },
      ) => {
        const { docId, input } = args;
        const doc = await reactor.getDocument<ScopeOfWorkDocument>(docId);
        if (!doc) {
          throw new Error("Document not found");
        }

        const result = await reactor.addAction(
          docId,
          actions.addMilestoneDeliverable(input),
        );

        if (result.status !== "SUCCESS") {
          throw new Error(
            result.error?.message ?? "Failed to addMilestoneDeliverable",
          );
        }

        return true;
      },

      ScopeOfWork_removeMilestoneDeliverable: async (
        _: unknown,
        args: { docId: string; input: RemoveMilestoneDeliverableInput },
      ) => {
        const { docId, input } = args;
        const doc = await reactor.getDocument<ScopeOfWorkDocument>(docId);
        if (!doc) {
          throw new Error("Document not found");
        }

        const result = await reactor.addAction(
          docId,
          actions.removeMilestoneDeliverable(input),
        );

        if (result.status !== "SUCCESS") {
          throw new Error(
            result.error?.message ?? "Failed to removeMilestoneDeliverable",
          );
        }

        return true;
      },

      ScopeOfWork_editDeliverablesSet: async (
        _: unknown,
        args: { docId: string; input: EditDeliverablesSetInput },
      ) => {
        const { docId, input } = args;
        const doc = await reactor.getDocument<ScopeOfWorkDocument>(docId);
        if (!doc) {
          throw new Error("Document not found");
        }

        const result = await reactor.addAction(
          docId,
          actions.editDeliverablesSet(input),
        );

        if (result.status !== "SUCCESS") {
          throw new Error(
            result.error?.message ?? "Failed to editDeliverablesSet",
          );
        }

        return true;
      },

      ScopeOfWork_addDeliverableInSet: async (
        _: unknown,
        args: { docId: string; input: AddDeliverableInSetInput },
      ) => {
        const { docId, input } = args;
        const doc = await reactor.getDocument<ScopeOfWorkDocument>(docId);
        if (!doc) {
          throw new Error("Document not found");
        }

        const result = await reactor.addAction(
          docId,
          actions.addDeliverableInSet(input),
        );

        if (result.status !== "SUCCESS") {
          throw new Error(
            result.error?.message ?? "Failed to addDeliverableInSet",
          );
        }

        return true;
      },

      ScopeOfWork_removeDeliverableInSet: async (
        _: unknown,
        args: { docId: string; input: RemoveDeliverableInSetInput },
      ) => {
        const { docId, input } = args;
        const doc = await reactor.getDocument<ScopeOfWorkDocument>(docId);
        if (!doc) {
          throw new Error("Document not found");
        }

        const result = await reactor.addAction(
          docId,
          actions.removeDeliverableInSet(input),
        );

        if (result.status !== "SUCCESS") {
          throw new Error(
            result.error?.message ?? "Failed to removeDeliverableInSet",
          );
        }

        return true;
      },

      ScopeOfWork_addAgent: async (
        _: unknown,
        args: { docId: string; input: AddAgentInput },
      ) => {
        const { docId, input } = args;
        const doc = await reactor.getDocument<ScopeOfWorkDocument>(docId);
        if (!doc) {
          throw new Error("Document not found");
        }

        const result = await reactor.addAction(docId, actions.addAgent(input));

        if (result.status !== "SUCCESS") {
          throw new Error(result.error?.message ?? "Failed to addAgent");
        }

        return true;
      },

      ScopeOfWork_removeAgent: async (
        _: unknown,
        args: { docId: string; input: RemoveAgentInput },
      ) => {
        const { docId, input } = args;
        const doc = await reactor.getDocument<ScopeOfWorkDocument>(docId);
        if (!doc) {
          throw new Error("Document not found");
        }

        const result = await reactor.addAction(
          docId,
          actions.removeAgent(input),
        );

        if (result.status !== "SUCCESS") {
          throw new Error(result.error?.message ?? "Failed to removeAgent");
        }

        return true;
      },

      ScopeOfWork_editAgent: async (
        _: unknown,
        args: { docId: string; input: EditAgentInput },
      ) => {
        const { docId, input } = args;
        const doc = await reactor.getDocument<ScopeOfWorkDocument>(docId);
        if (!doc) {
          throw new Error("Document not found");
        }

        const result = await reactor.addAction(docId, actions.editAgent(input));

        if (result.status !== "SUCCESS") {
          throw new Error(result.error?.message ?? "Failed to editAgent");
        }

        return true;
      },

      ScopeOfWork_addProject: async (
        _: unknown,
        args: { docId: string; input: AddProjectInput },
      ) => {
        const { docId, input } = args;
        const doc = await reactor.getDocument<ScopeOfWorkDocument>(docId);
        if (!doc) {
          throw new Error("Document not found");
        }

        const result = await reactor.addAction(
          docId,
          actions.addProject(input),
        );

        if (result.status !== "SUCCESS") {
          throw new Error(result.error?.message ?? "Failed to addProject");
        }

        return true;
      },

      ScopeOfWork_updateProject: async (
        _: unknown,
        args: { docId: string; input: UpdateProjectInput },
      ) => {
        const { docId, input } = args;
        const doc = await reactor.getDocument<ScopeOfWorkDocument>(docId);
        if (!doc) {
          throw new Error("Document not found");
        }

        const result = await reactor.addAction(
          docId,
          actions.updateProject(input),
        );

        if (result.status !== "SUCCESS") {
          throw new Error(result.error?.message ?? "Failed to updateProject");
        }

        return true;
      },

      ScopeOfWork_updateProjectOwner: async (
        _: unknown,
        args: { docId: string; input: UpdateProjectOwnerInput },
      ) => {
        const { docId, input } = args;
        const doc = await reactor.getDocument<ScopeOfWorkDocument>(docId);
        if (!doc) {
          throw new Error("Document not found");
        }

        const result = await reactor.addAction(
          docId,
          actions.updateProjectOwner(input),
        );

        if (result.status !== "SUCCESS") {
          throw new Error(
            result.error?.message ?? "Failed to updateProjectOwner",
          );
        }

        return true;
      },

      ScopeOfWork_removeProject: async (
        _: unknown,
        args: { docId: string; input: RemoveProjectInput },
      ) => {
        const { docId, input } = args;
        const doc = await reactor.getDocument<ScopeOfWorkDocument>(docId);
        if (!doc) {
          throw new Error("Document not found");
        }

        const result = await reactor.addAction(
          docId,
          actions.removeProject(input),
        );

        if (result.status !== "SUCCESS") {
          throw new Error(result.error?.message ?? "Failed to removeProject");
        }

        return true;
      },

      ScopeOfWork_setProjectMargin: async (
        _: unknown,
        args: { docId: string; input: SetProjectMarginInput },
      ) => {
        const { docId, input } = args;
        const doc = await reactor.getDocument<ScopeOfWorkDocument>(docId);
        if (!doc) {
          throw new Error("Document not found");
        }

        const result = await reactor.addAction(
          docId,
          actions.setProjectMargin(input),
        );

        if (result.status !== "SUCCESS") {
          throw new Error(
            result.error?.message ?? "Failed to setProjectMargin",
          );
        }

        return true;
      },

      ScopeOfWork_setProjectTotalBudget: async (
        _: unknown,
        args: { docId: string; input: SetProjectTotalBudgetInput },
      ) => {
        const { docId, input } = args;
        const doc = await reactor.getDocument<ScopeOfWorkDocument>(docId);
        if (!doc) {
          throw new Error("Document not found");
        }

        const result = await reactor.addAction(
          docId,
          actions.setProjectTotalBudget(input),
        );

        if (result.status !== "SUCCESS") {
          throw new Error(
            result.error?.message ?? "Failed to setProjectTotalBudget",
          );
        }

        return true;
      },

      ScopeOfWork_addProjectDeliverable: async (
        _: unknown,
        args: { docId: string; input: AddProjectDeliverableInput },
      ) => {
        const { docId, input } = args;
        const doc = await reactor.getDocument<ScopeOfWorkDocument>(docId);
        if (!doc) {
          throw new Error("Document not found");
        }

        const result = await reactor.addAction(
          docId,
          actions.addProjectDeliverable(input),
        );

        if (result.status !== "SUCCESS") {
          throw new Error(
            result.error?.message ?? "Failed to addProjectDeliverable",
          );
        }

        return true;
      },

      ScopeOfWork_removeProjectDeliverable: async (
        _: unknown,
        args: { docId: string; input: RemoveProjectDeliverableInput },
      ) => {
        const { docId, input } = args;
        const doc = await reactor.getDocument<ScopeOfWorkDocument>(docId);
        if (!doc) {
          throw new Error("Document not found");
        }

        const result = await reactor.addAction(
          docId,
          actions.removeProjectDeliverable(input),
        );

        if (result.status !== "SUCCESS") {
          throw new Error(
            result.error?.message ?? "Failed to removeProjectDeliverable",
          );
        }

        return true;
      },
    },
  };
};
