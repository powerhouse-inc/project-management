/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { type Subgraph } from "@powerhousedao/reactor-api";
import { addFile } from "document-drive";
import { actions } from "../../document-models/scope-of-work/index.js";
import { generateId } from "document-model";

const DEFAULT_DRIVE_ID = "powerhouse";

export const getResolvers = (subgraph: Subgraph): Record<string, any> => {
  const reactor = subgraph.reactor;

  return {
    Query: {
      ScopeOfWork: async (_: any, args: any, ctx: any) => {
        return {
          getDocument: async (args: any) => {
            const driveId: string = args.driveId || DEFAULT_DRIVE_ID;
            const docId: string = args.docId || "";
            const doc = await reactor.getDocument(docId);
            return {
              driveId: driveId,
              ...doc,
              ...doc.header,
              state: doc.state,
              stateJSON: doc.state,
              revision: doc.header.revision["global"] ?? 0,
            };
          },
          getDocuments: async (args: any) => {
            const driveId: string = args.driveId || DEFAULT_DRIVE_ID;
            const docsIds = await reactor.getDocuments(driveId);
            const docs = await Promise.all(
              docsIds.map(async (docId) => {
                const doc = await reactor.getDocument(docId);
                return {
                  driveId: driveId,
                  ...doc,
                  ...doc.header,
                  state: doc.state,
                  stateJSON: doc.state,
                  revision: doc.header.revision["global"] ?? 0,
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
      ScopeOfWork_createDocument: async (_: any, args: any) => {
        const driveId: string = args.driveId || DEFAULT_DRIVE_ID;
        const docId = generateId();

        await reactor.addDriveAction(
          driveId,
          addFile({
            id: docId,
            name: args.name,
            documentType: "powerhouse/scopeofwork",
            synchronizationUnits: [
              {
                branch: "main",
                scope: "global",
                syncId: generateId(),
              },
              {
                branch: "main",
                scope: "local",
                syncId: generateId(),
              },
            ],
          }),
        );

        return docId;
      },

      ScopeOfWork_editScopeOfWork: async (_: any, args: any) => {
        const driveId: string = args.driveId || DEFAULT_DRIVE_ID;
        const docId: string = args.docId || "";
        const doc = await reactor.getDocument(driveId, docId);

        await reactor.addAction(
          driveId,
          docId,
          actions.editScopeOfWork({ ...args.input }),
        );

        return (doc.header.revision["global"] ?? 0) + 1;
      },

      ScopeOfWork_addDeliverable: async (_: any, args: any) => {
        const driveId: string = args.driveId || DEFAULT_DRIVE_ID;
        const docId: string = args.docId || "";
        const doc = await reactor.getDocument(driveId, docId);

        await reactor.addAction(
          driveId,
          docId,
          actions.addDeliverable({ ...args.input }),
        );

        return (doc.header.revision["global"] ?? 0) + 1;
      },

      ScopeOfWork_removeDeliverable: async (_: any, args: any) => {
        const driveId: string = args.driveId || DEFAULT_DRIVE_ID;
        const docId: string = args.docId || "";
        const doc = await reactor.getDocument(driveId, docId);

        await reactor.addAction(
          driveId,
          docId,
          actions.removeDeliverable({ ...args.input }),
        );

        return (doc.header.revision["global"] ?? 0) + 1;
      },

      ScopeOfWork_editDeliverable: async (_: any, args: any) => {
        const driveId: string = args.driveId || DEFAULT_DRIVE_ID;
        const docId: string = args.docId || "";
        const doc = await reactor.getDocument(driveId, docId);

        await reactor.addAction(
          driveId,
          docId,
          actions.editDeliverable({ ...args.input }),
        );

        return (doc.header.revision["global"] ?? 0) + 1;
      },

      ScopeOfWork_setDeliverableProgress: async (_: any, args: any) => {
        const driveId: string = args.driveId || DEFAULT_DRIVE_ID;
        const docId: string = args.docId || "";
        const doc = await reactor.getDocument(driveId, docId);

        await reactor.addAction(
          driveId,
          docId,
          actions.setDeliverableProgress({ ...args.input }),
        );

        return (doc.header.revision["global"] ?? 0) + 1;
      },

      ScopeOfWork_addKeyResult: async (_: any, args: any) => {
        const driveId: string = args.driveId || DEFAULT_DRIVE_ID;
        const docId: string = args.docId || "";
        const doc = await reactor.getDocument(driveId, docId);

        await reactor.addAction(
          driveId,
          docId,
          actions.addKeyResult({ ...args.input }),
        );

        return (doc.header.revision["global"] ?? 0) + 1;
      },

      ScopeOfWork_removeKeyResult: async (_: any, args: any) => {
        const driveId: string = args.driveId || DEFAULT_DRIVE_ID;
        const docId: string = args.docId || "";
        const doc = await reactor.getDocument(driveId, docId);

        await reactor.addAction(
          driveId,
          docId,
          actions.removeKeyResult({ ...args.input }),
        );

        return (doc.header.revision["global"] ?? 0) + 1;
      },

      ScopeOfWork_editKeyResult: async (_: any, args: any) => {
        const driveId: string = args.driveId || DEFAULT_DRIVE_ID;
        const docId: string = args.docId || "";
        const doc = await reactor.getDocument(driveId, docId);

        await reactor.addAction(
          driveId,
          docId,
          actions.editKeyResult({ ...args.input }),
        );

        return (doc.header.revision["global"] ?? 0) + 1;
      },

      ScopeOfWork_setDeliverableBudgetAnchorProject: async (
        _: any,
        args: any,
      ) => {
        const driveId: string = args.driveId || DEFAULT_DRIVE_ID;
        const docId: string = args.docId || "";
        const doc = await reactor.getDocument(driveId, docId);

        await reactor.addAction(
          driveId,
          docId,
          actions.setDeliverableBudgetAnchorProject({ ...args.input }),
        );

        return (doc.header.revision["global"] ?? 0) + 1;
      },

      ScopeOfWork_addRoadmap: async (_: any, args: any) => {
        const driveId: string = args.driveId || DEFAULT_DRIVE_ID;
        const docId: string = args.docId || "";
        const doc = await reactor.getDocument(driveId, docId);

        await reactor.addAction(
          driveId,
          docId,
          actions.addRoadmap({ ...args.input }),
        );

        return (doc.header.revision["global"] ?? 0) + 1;
      },

      ScopeOfWork_removeRoadmap: async (_: any, args: any) => {
        const driveId: string = args.driveId || DEFAULT_DRIVE_ID;
        const docId: string = args.docId || "";
        const doc = await reactor.getDocument(driveId, docId);

        await reactor.addAction(
          driveId,
          docId,
          actions.removeRoadmap({ ...args.input }),
        );

        return (doc.header.revision["global"] ?? 0) + 1;
      },

      ScopeOfWork_editRoadmap: async (_: any, args: any) => {
        const driveId: string = args.driveId || DEFAULT_DRIVE_ID;
        const docId: string = args.docId || "";
        const doc = await reactor.getDocument(driveId, docId);

        await reactor.addAction(
          driveId,
          docId,
          actions.editRoadmap({ ...args.input }),
        );

        return (doc.header.revision["global"] ?? 0) + 1;
      },

      ScopeOfWork_addMilestone: async (_: any, args: any) => {
        const driveId: string = args.driveId || DEFAULT_DRIVE_ID;
        const docId: string = args.docId || "";
        const doc = await reactor.getDocument(driveId, docId);

        await reactor.addAction(
          driveId,
          docId,
          actions.addMilestone({ ...args.input }),
        );

        return (doc.header.revision["global"] ?? 0) + 1;
      },

      ScopeOfWork_removeMilestone: async (_: any, args: any) => {
        const driveId: string = args.driveId || DEFAULT_DRIVE_ID;
        const docId: string = args.docId || "";
        const doc = await reactor.getDocument(driveId, docId);

        await reactor.addAction(
          driveId,
          docId,
          actions.removeMilestone({ ...args.input }),
        );

        return (doc.header.revision["global"] ?? 0) + 1;
      },

      ScopeOfWork_editMilestone: async (_: any, args: any) => {
        const driveId: string = args.driveId || DEFAULT_DRIVE_ID;
        const docId: string = args.docId || "";
        const doc = await reactor.getDocument(driveId, docId);

        await reactor.addAction(
          driveId,
          docId,
          actions.editMilestone({ ...args.input }),
        );

        return (doc.header.revision["global"] ?? 0) + 1;
      },

      ScopeOfWork_addCoordinator: async (_: any, args: any) => {
        const driveId: string = args.driveId || DEFAULT_DRIVE_ID;
        const docId: string = args.docId || "";
        const doc = await reactor.getDocument(driveId, docId);

        await reactor.addAction(
          driveId,
          docId,
          actions.addCoordinator({ ...args.input }),
        );

        return (doc.header.revision["global"] ?? 0) + 1;
      },

      ScopeOfWork_removeCoordinator: async (_: any, args: any) => {
        const driveId: string = args.driveId || DEFAULT_DRIVE_ID;
        const docId: string = args.docId || "";
        const doc = await reactor.getDocument(driveId, docId);

        await reactor.addAction(
          driveId,
          docId,
          actions.removeCoordinator({ ...args.input }),
        );

        return (doc.header.revision["global"] ?? 0) + 1;
      },

      ScopeOfWork_addMilestoneDeliverable: async (_: any, args: any) => {
        const driveId: string = args.driveId || DEFAULT_DRIVE_ID;
        const docId: string = args.docId || "";
        const doc = await reactor.getDocument(driveId, docId);

        await reactor.addAction(
          driveId,
          docId,
          actions.addMilestoneDeliverable({ ...args.input }),
        );

        return (doc.header.revision["global"] ?? 0) + 1;
      },

      ScopeOfWork_removeMilestoneDeliverable: async (_: any, args: any) => {
        const driveId: string = args.driveId || DEFAULT_DRIVE_ID;
        const docId: string = args.docId || "";
        const doc = await reactor.getDocument(driveId, docId);

        await reactor.addAction(
          driveId,
          docId,
          actions.removeMilestoneDeliverable({ ...args.input }),
        );

        return (doc.header.revision["global"] ?? 0) + 1;
      },

      ScopeOfWork_editDeliverablesSet: async (_: any, args: any) => {
        const driveId: string = args.driveId || DEFAULT_DRIVE_ID;
        const docId: string = args.docId || "";
        const doc = await reactor.getDocument(driveId, docId);

        await reactor.addAction(
          driveId,
          docId,
          actions.editDeliverablesSet({ ...args.input }),
        );

        return (doc.header.revision["global"] ?? 0) + 1;
      },

      ScopeOfWork_addDeliverableInSet: async (_: any, args: any) => {
        const driveId: string = args.driveId || DEFAULT_DRIVE_ID;
        const docId: string = args.docId || "";
        const doc = await reactor.getDocument(driveId, docId);

        await reactor.addAction(
          driveId,
          docId,
          actions.addDeliverableInSet({ ...args.input }),
        );

        return (doc.header.revision["global"] ?? 0) + 1;
      },

      ScopeOfWork_removeDeliverableInSet: async (_: any, args: any) => {
        const driveId: string = args.driveId || DEFAULT_DRIVE_ID;
        const docId: string = args.docId || "";
        const doc = await reactor.getDocument(driveId, docId);

        await reactor.addAction(
          driveId,
          docId,
          actions.removeDeliverableInSet({ ...args.input }),
        );

        return (doc.header.revision["global"] ?? 0) + 1;
      },

      ScopeOfWork_addAgent: async (_: any, args: any) => {
        const driveId: string = args.driveId || DEFAULT_DRIVE_ID;
        const docId: string = args.docId || "";
        const doc = await reactor.getDocument(driveId, docId);

        await reactor.addAction(
          driveId,
          docId,
          actions.addAgent({ ...args.input }),
        );

        return (doc.header.revision["global"] ?? 0) + 1;
      },

      ScopeOfWork_removeAgent: async (_: any, args: any) => {
        const driveId: string = args.driveId || DEFAULT_DRIVE_ID;
        const docId: string = args.docId || "";
        const doc = await reactor.getDocument(driveId, docId);

        await reactor.addAction(
          driveId,
          docId,
          actions.removeAgent({ ...args.input }),
        );

        return (doc.header.revision["global"] ?? 0) + 1;
      },

      ScopeOfWork_editAgent: async (_: any, args: any) => {
        const driveId: string = args.driveId || DEFAULT_DRIVE_ID;
        const docId: string = args.docId || "";
        const doc = await reactor.getDocument(driveId, docId);

        await reactor.addAction(
          driveId,
          docId,
          actions.editAgent({ ...args.input }),
        );

        return (doc.header.revision["global"] ?? 0) + 1;
      },

      ScopeOfWork_addProject: async (_: any, args: any) => {
        const driveId: string = args.driveId || DEFAULT_DRIVE_ID;
        const docId: string = args.docId || "";
        const doc = await reactor.getDocument(driveId, docId);

        await reactor.addAction(
          driveId,
          docId,
          actions.addProject({ ...args.input }),
        );

        return (doc.header.revision["global"] ?? 0) + 1;
      },

      ScopeOfWork_updateProject: async (_: any, args: any) => {
        const driveId: string = args.driveId || DEFAULT_DRIVE_ID;
        const docId: string = args.docId || "";
        const doc = await reactor.getDocument(driveId, docId);

        await reactor.addAction(
          driveId,
          docId,
          actions.updateProject({ ...args.input }),
        );

        return (doc.header.revision["global"] ?? 0) + 1;
      },

      ScopeOfWork_updateProjectOwner: async (_: any, args: any) => {
        const driveId: string = args.driveId || DEFAULT_DRIVE_ID;
        const docId: string = args.docId || "";
        const doc = await reactor.getDocument(driveId, docId);

        await reactor.addAction(
          driveId,
          docId,
          actions.updateProjectOwner({ ...args.input }),
        );

        return (doc.header.revision["global"] ?? 0) + 1;
      },

      ScopeOfWork_removeProject: async (_: any, args: any) => {
        const driveId: string = args.driveId || DEFAULT_DRIVE_ID;
        const docId: string = args.docId || "";
        const doc = await reactor.getDocument(driveId, docId);

        await reactor.addAction(
          driveId,
          docId,
          actions.removeProject({ ...args.input }),
        );

        return (doc.header.revision["global"] ?? 0) + 1;
      },

      ScopeOfWork_setProjectMargin: async (_: any, args: any) => {
        const driveId: string = args.driveId || DEFAULT_DRIVE_ID;
        const docId: string = args.docId || "";
        const doc = await reactor.getDocument(driveId, docId);

        await reactor.addAction(
          driveId,
          docId,
          actions.setProjectMargin({ ...args.input }),
        );

        return (doc.header.revision["global"] ?? 0) + 1;
      },

      ScopeOfWork_setProjectTotalBudget: async (_: any, args: any) => {
        const driveId: string = args.driveId || DEFAULT_DRIVE_ID;
        const docId: string = args.docId || "";
        const doc = await reactor.getDocument(driveId, docId);

        await reactor.addAction(
          driveId,
          docId,
          actions.setProjectTotalBudget({ ...args.input }),
        );

        return (doc.header.revision["global"] ?? 0) + 1;
      },

      ScopeOfWork_addProjectDeliverable: async (_: any, args: any) => {
        const driveId: string = args.driveId || DEFAULT_DRIVE_ID;
        const docId: string = args.docId || "";
        const doc = await reactor.getDocument(driveId, docId);

        await reactor.addAction(
          driveId,
          docId,
          actions.addProjectDeliverable({ ...args.input }),
        );

        return (doc.header.revision["global"] ?? 0) + 1;
      },

      ScopeOfWork_removeProjectDeliverable: async (_: any, args: any) => {
        const driveId: string = args.driveId || DEFAULT_DRIVE_ID;
        const docId: string = args.docId || "";
        const doc = await reactor.getDocument(driveId, docId);

        await reactor.addAction(
          driveId,
          docId,
          actions.removeProjectDeliverable({ ...args.input }),
        );

        return (doc.header.revision["global"] ?? 0) + 1;
      },
    },
  };
};
