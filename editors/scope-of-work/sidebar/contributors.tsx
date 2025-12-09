import { useMemo, useCallback } from "react";
import {
  ObjectSetTable,
  type ColumnDef,
  type ColumnAlignment,
  PHIDInput,
} from "@powerhousedao/document-engineering";
import {
  type Agent,
  type ScopeOfWorkAction,
} from "../../../document-models/scope-of-work/gen/types.js";
import { actions } from "../../../document-models/scope-of-work/index.js";
import {
  type DocumentDispatch,
  useDrives,
  useGetDocuments,
} from "@powerhousedao/reactor-browser";
import type { FileNode } from "document-drive";

interface ContributorsProps {
  dispatch: DocumentDispatch<ScopeOfWorkAction>;
  contributors: Agent[];
}

type RichContributors = Agent & { title: string };

const Contributors: React.FC<ContributorsProps> = ({
  dispatch,
  contributors,
}) => {
  const richContributors = useMemo(() => {
    return contributors.map((contributor) => ({
      ...contributor,
      title: contributor.name,
    }));
  }, [contributors]);

  const drives = useDrives();

  // Map all builder profile FileNodes from all drives with their driveId
  const builderProfileNodesWithDriveId = useMemo(() => {
    if (!drives) return [];

    return drives.flatMap((drive) => {
      const builderProfileNodes = drive.state.global.nodes.filter(
        (node): node is FileNode =>
          node.kind === "file" &&
          "documentType" in node &&
          node.documentType === "powerhouse/builder-profile",
      );

      return builderProfileNodes.map((node) => ({
        node,
        driveId: drive.header.id,
      }));
    });
  }, [drives]);

  // Get all unique builder PHIDs from the nodes
  const builderPhids = useMemo(() => {
    return builderProfileNodesWithDriveId.map(({ node }) => node.id);
  }, [builderProfileNodesWithDriveId]);

  // Fetch all builder profile documents from all drives
  const builderProfileDocuments = useGetDocuments(builderPhids);

  // Create a map of PHID to document for quick lookup
  const builderProfileMap = useMemo(() => {
    if (!builderProfileDocuments) return new Map();

    const map = new Map();
    builderProfileDocuments.forEach((doc) => {
      if (doc.header.documentType === "powerhouse/builder-profile") {
        map.set(doc.header.id, doc);
      }
    });
    return map;
  }, [builderProfileDocuments]);

  // Helper function to get builder profile documents from all drives
  const getBuilderProfiles = useCallback(() => {
    return builderProfileNodesWithDriveId.map(({ node }) => {
      const doc = builderProfileMap.get(node.id);
      const name = doc?.state?.global?.name || node.name || node.id;

      return {
        id: node.id,
        label: name,
        value: node.id,
        title: name,
      };
    });
  }, [builderProfileNodesWithDriveId, builderProfileMap]);

  // Helper function to get builder profile data by PHID from all drives
  const getBuilderProfileByPhid = (phid: string) => {
    const doc = builderProfileMap.get(phid);
    if (!doc) return null;

    return {
      name: doc.state.global?.name || doc.header.id,
      description: doc.state.global?.description || null,
      icon: doc.state.global?.icon || null,
    };
  };

  const columns = useMemo<Array<ColumnDef<RichContributors>>>(
    () => [
      {
        field: "id",
        title: "PHID",
        editable: true,
        align: "center" as ColumnAlignment,
        width: 200,
        onSave: (newValue, context) => {
          const currentId = context.row.id || "";
          if (newValue !== currentId && newValue && currentId) {
            // First remove the old agent
            dispatch(actions.removeAgent({ id: currentId }));
            // Then add the new agent with the new PHID
            dispatch(
              actions.addAgent({
                id: newValue as string,
                name: context.row.name,
                icon: context.row.icon,
                description: context.row.description,
              })
            );
            return true;
          }
          return false;
        },
        renderCellEditor: (value, onChange, context) => (
          <PHIDInput
            value={(value as string) || ""}
            onChange={(newValue) => {
              onChange(newValue);
            }}
            onBlur={(e) => {
              const newValue = e.target.value;
              const currentValue = (value as string) || "";

              // If a PHID is entered and it's different from current value
              if (newValue && newValue !== currentValue) {
                const builderProfile = getBuilderProfileByPhid(newValue);
                const existingAgent = contributors.find(
                  (agent) => agent.id === newValue
                );

                if (!existingAgent) {
                  // If we're editing an existing row (has an ID), remove the old one first
                  if (context.row.id && context.row.id !== newValue) {
                    dispatch(actions.removeAgent({ id: context.row.id }));
                  }

                  if (builderProfile) {
                    // Create new agent with data from builder profile
                    dispatch(
                      actions.addAgent({
                        id: newValue,
                        name: builderProfile.name,
                        icon: builderProfile.icon,
                        description: builderProfile.description,
                      })
                    );
                  } else {
                    // Manual PHID entry - create agent with empty data that user can fill
                    dispatch(
                      actions.addAgent({
                        id: newValue,
                        name: "", // User will need to fill this
                        icon: null,
                        description: null,
                      })
                    );
                  }
                }
              }
            }}
            placeholder="Enter PHID"
            className="w-full"
            variant="withValueAndTitle"
            initialOptions={getBuilderProfiles()}
            fetchOptionsCallback={async (userInput: string) => {
              const builderProfiles = getBuilderProfiles();

              // Filter profiles based on user input
              if (!userInput.trim()) {
                return builderProfiles;
              }

              const filteredProfiles = builderProfiles.filter(
                (profile) =>
                  profile.label
                    .toLowerCase()
                    .includes(userInput.toLowerCase()) ||
                  profile.id.toLowerCase().includes(userInput.toLowerCase())
              );

              return filteredProfiles;
            }}
          />
        ),
        renderCell: (value) => {
          if (value === "" || !value) {
            return (
              <div className="font-light italic text-gray-500 text-center">
                + Double-click to add new contributor (enter or click outside to
                save)
              </div>
            );
          }
          return <div className="text-center font-mono text-sm">{value}</div>;
        },
      },
      {
        field: "title",
        title: "Contributor",
        editable: true,
        align: "center" as ColumnAlignment,
        width: 200,
        onSave: (newValue, context) => {
          if (newValue !== context.row.title) {
            dispatch(
              actions.editAgent({
                id: context.row.id,
                name: newValue as string,
              })
            );
            return true;
          }
          return false;
        },
        renderCell: (value) => {
          return <div className="text-center">{value}</div>;
        },
      },
      {
        field: "icon",
        title: "Icon",
        editable: true,
        align: "center" as ColumnAlignment,
        width: 150,
        onSave: (newValue, context) => {
          if (newValue !== context.row.icon) {
            dispatch(
              actions.editAgent({
                id: context.row.id,
                icon: newValue as string,
              })
            );
            return true;
          }
          return false;
        },
        renderCell: (value, context) => {
          if (!context.row.icon) {
            return null;
          }
          return (
            <div className="text-center">
              <img
                src={context.row.icon}
                alt="Agent icon"
                className="w-10 h-10 rounded-sm mx-auto object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                  e.currentTarget.nextElementSibling?.classList.remove(
                    "hidden"
                  );
                }}
              />
              <div className="hidden text-xs text-gray-500 truncate">
                {context.row.icon}
              </div>
            </div>
          );
        },
      },
      {
        field: "description",
        title: "Description",
        editable: true,
        align: "center" as ColumnAlignment,
        onSave: (newValue, context) => {
          if (newValue !== context.row.description) {
            dispatch(
              actions.editAgent({
                id: context.row.id,
                description: newValue as string,
              })
            );
            return true;
          }
          return false;
        },
        renderCell: (value, context) => {
          if (!context.row.description) {
            return null;
          }
          return (
            <div className="text-center text-sm">{context.row.description}</div>
          );
        },
      },
    ],
    [contributors, builderProfileMap, getBuilderProfiles]
  );

  return (
    <div className="border border-gray-300 p-4 rounded-md">
      <div className="mt-4">
        <h3 className="flex justify-center items-center font-bold text-gray-700 mb-2">
          Contributors
        </h3>
        <ObjectSetTable
          columns={columns}
          data={richContributors || []}
          allowRowSelection={true}
          onDelete={(data) => {
            if (data.length > 0) {
              data.forEach((d) => {
                dispatch(actions.removeAgent({ id: d.id }));
              });
            }
          }}
          onAdd={(data) => {
            // Only add if we have a title (name) - PHID will be handled by the PHIDInput onChange
            if (data.title) {
              // Generate a temporary ID if no PHID is provided
              const tempId = (data as any).id || `temp-${Date.now()}`;
              dispatch(
                actions.addAgent({
                  id: tempId,
                  name: data.title as string,
                  icon: (data as any).icon || null,
                  description: (data as any).description || null,
                })
              );
            }
          }}
        />
      </div>
    </div>
  );
};

export default Contributors;
