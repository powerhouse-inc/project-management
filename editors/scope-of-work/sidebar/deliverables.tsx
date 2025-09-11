import { useMemo, useState, useEffect } from "react";
import {
  Deliverable,
  Milestone,
  Project,
  PmDeliverableStatusInput,
} from "../../../document-models/scope-of-work/gen/types.js";
import {
  Select,
  ObjectSetTable,
  ColumnDef,
  ColumnAlignment,
} from "@powerhousedao/document-engineering";
import { Icon } from "@powerhousedao/design-system";
import { actions } from "../../../document-models/scope-of-work/index.js";
import { generateId } from "document-model";
import { statusOptions } from "./deliverable.js";

interface ProjectsProps {
  deliverables: Deliverable[] | undefined;
  dispatch: any;
  milestones: Milestone[] | undefined;
  projects: Project[] | undefined;
  setActiveNodeId: (id: string) => void;
  document: any;
}

const Deliverables: React.FC<ProjectsProps> = ({
  deliverables,
  dispatch,
  milestones,
  projects,
  setActiveNodeId,
  document,
}) => {
  const [stateMilestones, setStateMilestones] = useState(milestones);
  const [stateProjects, setStateProjects] = useState(projects);

  useEffect(() => {
    setStateMilestones(milestones);
    setStateProjects(projects);
  }, [milestones, projects, deliverables]);

  const latestActivity = document.operations.global.filter(
    (operation: any) =>
      operation.type === "EDIT_DELIVERABLE" ||
      operation.type === "ADD_DELIVERABLE" ||
      operation.type === "REMOVE_DELIVERABLE" ||
      operation.type === "ADD_PROJECT_DELIVERABLE" ||
      operation.type === "ADD_MILESTONE_DELIVERABLE" ||
      operation.type === "ADD_DELIVERABLE_IN_SET" ||
      operation.type === "REMOVE_DELIVERABLE_IN_SET"
  );

  // Create a map of deliverable IDs to their latest activity
  const latestActivityMap = new Map();
  latestActivity?.forEach((activity: any) => {
    if (activity.input?.id) {
      latestActivityMap.set(activity.input.id, {
        type: activity.type,
        timestamp: activity.timestamp || activity.timestampUtcMs,
        input: activity.input,
      });
    } else if (activity.input?.deliverableId) {
      latestActivityMap.set(activity.input.deliverableId, {
        type: activity.type,
        timestamp: activity.timestamp || activity.timestampUtcMs,
        input: activity.input,
      });
    }
  });

  const richDeliverables = useMemo(() => {
    // Create a map to track processed deliverable IDs to avoid duplicates
    const processedIds = new Set();
    const result: any[] = [];

    // Helper function to add deliverable if not already processed
    const addDeliverableIfNotProcessed = (
      deliverable: any,
      milestoneId: string | null,
      milestoneTitle: string | null,
      projectId: string | null,
      projectTitle: string | null
    ) => {
      if (!deliverable || processedIds.has(deliverable.id)) return;

      processedIds.add(deliverable.id);
      result.push({
        ...deliverable,
        milestoneId,
        milestoneTitle,
        projectId,
        projectTitle,
        latestActivity: latestActivityMap.get(deliverable.id),
      });
    };

    // Process deliverables from milestones
    milestones?.forEach((milestone) => {
      milestone.scope?.deliverables?.forEach((deliverableId) => {
        const deliverable = deliverables?.find((d) => d.id === deliverableId);
        if (!deliverable) return;

        // Check if this deliverable is also in a project
        const project = projects?.find((p) =>
          p.scope?.deliverables?.includes(deliverableId)
        );

        addDeliverableIfNotProcessed(
          deliverable,
          milestone.id,
          milestone.title,
          project?.id || null,
          project?.title || null
        );
      });
    });

    // Process deliverables from projects (only if not already processed)
    projects?.forEach((project) => {
      project.scope?.deliverables?.forEach((deliverableId) => {
        const deliverable = deliverables?.find((d) => d.id === deliverableId);
        if (!deliverable) return;

        // Check if this deliverable is also in a milestone
        const milestone = milestones?.find((m) =>
          m.scope?.deliverables?.includes(deliverableId)
        );

        addDeliverableIfNotProcessed(
          deliverable,
          milestone?.id || null,
          milestone?.title || null,
          project.id,
          project.title
        );
      });
    });

    // Process standalone deliverables (only if not already processed)
    deliverables?.forEach((deliverable) => {
      addDeliverableIfNotProcessed(deliverable, null, null, null, null);
    });

    return result.sort((a, b) => {
      if (a?.title && b?.title) {
        return a.title.localeCompare(b.title);
      }
      return 0;
    });
  }, [milestones, projects, deliverables, latestActivityMap]);

  const columns = useMemo<Array<ColumnDef<any>>>(
    () => [
      {
        field: "link",
        width: 20,
        align: "center" as ColumnAlignment,
        renderCell: (value: any, context: any) => {
          if (!context.row?.id) return <div className="w-2"></div>;
          return (
            <div className="text-center">
              <Icon
                className="hover:cursor-pointer"
                name="Moved"
                size={18}
                onClick={() => {
                  setActiveNodeId(`deliverable.${context.row.id}`);
                }}
              />
            </div>
          );
        },
      },
      {
        field: "title",
        title: "Title",
        editable: true,
        align: "center" as ColumnAlignment,
        onSave: (newValue: any, context: any) => {
          if (newValue !== context.row.title) {
            dispatch(
              actions.editDeliverable({
                id: context.row.id,
                title: newValue as string,
              })
            );
            return true;
          }
          return false;
        },
        renderCell: (value: any, context: any) => {
          if (value === "") {
            return (
              <div className="font-light italic text-left text-gray-500">
                + Double-click to add new deliverable (enter or click outside to
                save)
              </div>
            );
          }
          return <div className="text-left">{value}</div>;
        },
      },
      {
        field: "status",
        title: "Status",
        editable: false,
        align: "center" as ColumnAlignment,
        renderCell: (value: any, context: any) => {
          if (!context.row.status) return "";
          return (
            <div>
              <Select
                className={String.raw`
                  [&]:!pl-2
                  [&]:!pt-0
                  [&]:!pb-0
                  [&_.select\\_\\_search]:!p-0
                  [&_.select\\_\\_trigger]:!text-xs
                  [&_.select\\_\\_value]:!text-xs
                  [&_.select\\_\\_trigger]:!text-[12px]
                  [&_.select\\_\\_value]:!text-[12px]
                  [&_*]:!text-xs
                  [&_*]:!text-[12px]
                  [&_.select\\_\\_trigger]:!p-0
                  [&_.select\\_\\_value]:!p-0
                  [&_.select\\_\\_item]:!p-0
                  [&_.select\\_\\_content]:!p-0
                  [&_*]:!p-0
                `}
                contentClassName={String.raw`
                  [&_.select\\_\\_content]:!w-full
                  [&_.select\\_\\_list-item]:!text-xs
                  [&_.select\\_\\_content]:!text-[12px]
                  [&_.select\\_\\_list-item]:!text-[12px]
                  [&_*]:!text-xs
                  [&_*]:!text-[12px]
                `}
                options={statusOptions}
                value={context.row.status}
                onChange={(value) => {
                  if (!value) return null;
                  dispatch(
                    actions.editDeliverable({
                      id: context.row.id,
                      status: value as PmDeliverableStatusInput,
                    })
                  );
                }}
              />
            </div>
          );
        },
      },
      {
        field: "milestoneTitle",
        title: "Milestone",
        editable: false,
        align: "center" as ColumnAlignment,
        renderCell: (value: any, context: any) => {
          if (!context.row.title) return "";
          return (
            <div className="flex items-center justify-center">
              {context.row.milestoneId && (
                <span>
                  <Icon
                    className="hover:cursor-pointer"
                    name="Moved"
                    size={12}
                    onClick={() => {
                      setActiveNodeId(`milestone.${context.row.milestoneId}`);
                    }}
                  />
                </span>
              )}
              <Select
                className={String.raw`
                ${context.row.milestoneId ? "ml-2" : ""}
                  [&]:!pl-2
                  [&]:!pt-0
                  [&]:!pb-0
                  [&]:!w-[120px]
                  [&]:!max-w-[120px]
                  [&_.select\\_\\_search]:!p-0
                  [&_.select\\_\\_trigger]:!text-xs
                  [&_.select\\_\\_value]:!text-xs
                  [&_.select\\_\\_trigger]:!text-[12px]
                  [&_.select\\_\\_value]:!text-[12px]
                  [&_*]:!text-xs
                  [&_*]:!text-[12px]
                  [&_.select\\_\\_trigger]:!p-0
                  [&_.select\\_\\_value]:!p-0
                  [&_.select\\_\\_item]:!p-0
                  [&_.select\\_\\_content]:!p-0
                  [&_*]:!p-0
                  [&_.select\\_\\_trigger]:!w-[150px]
                  [&_.select\\_\\_trigger]:!max-w-[150px]
                  [&_.select\\_\\_value]:!w-[150px]
                  [&_.select\\_\\_value]:!max-w-[150px]
                  [&_.select\\_\\_value]:!truncate
                `}
                contentClassName={String.raw`
                  [&_.select\\_\\_content]:!w-fit
                  [&_.select\\_\\_content]:!min-w-[150px]
                  [&_.select\\_\\_content]:!max-w-[500px]
                  [&_.select\\_\\_content]:!bg-white
                  [&_.select\\_\\_content]:!border
                  [&_.select\\_\\_content]:!border-[0.5px]
                  [&_.select\\_\\_content]:!border-gray-300
                  [&_.select\\_\\_content]:!rounded-md
                  [&_.select\\_\\_list-item]:!text-xs
                  [&_.select\\_\\_content]:!text-[12px]
                  [&_.select\\_\\_list-item]:!text-[12px]
                  [&_*]:!text-xs
                  [&_*]:!text-[12px]
                  [&_.select\\_\\_list-item]:!whitespace-nowrap
                  [&_.select\\_\\_list-item]:!overflow-visible
                  [&_.select\\_\\_list-item]:!text-ellipsis-none
                  [&_.select\\_\\_list-item]:bg-white
                  [&_.select\\_\\_list-item]:hover:bg-gray-100
                  [&_.select\\_\\_content]:bg-white
                  [&_.select\\_\\_item]:bg-white
                `}
                options={
                  stateMilestones?.map((milestone) => ({
                    label: milestone.title,
                    value: milestone.id,
                  })) || []
                }
                value={context.row.milestoneId || undefined}
                placeholder="Set milestone..."
                onChange={(value) => {
                  // If there's an existing milestone, remove it first
                  if (context.row.milestoneId) {
                    dispatch(
                      actions.removeDeliverableInSet({
                        deliverableId: context.row.id,
                        milestoneId: context.row.milestoneId,
                      })
                    );
                  }
                  // Add the new milestone
                  if (value) {
                    dispatch(
                      actions.addDeliverableInSet({
                        deliverableId: context.row.id,
                        milestoneId: value as string,
                      })
                    );
                  }
                }}
              />
            </div>
          );
        },
      },
      {
        field: "projectTitle",
        title: "Project",
        editable: false,
        align: "center" as ColumnAlignment,
        renderCell: (value: any, context: any) => {
          if (!context.row.title) return "";
          return (
            <div className="flex items-center justify-center">
              {context.row.projectId && (
                <span>
                  <Icon
                    className="hover:cursor-pointer"
                    name="Moved"
                    size={12}
                    onClick={() => {
                      setActiveNodeId(`project.${context.row.projectId}`);
                    }}
                  />
                </span>
              )}
              <Select
                className={String.raw`
                  ${context.row.projectId ? "ml-2" : ""}
                    [&]:!pl-2
                    [&]:!pt-0
                    [&]:!pb-0
                    [&]:!w-[120px]
                    [&]:!max-w-[120px]
                    [&_.select\\_\\_search]:!p-0
                    [&_.select\\_\\_trigger]:!text-xs
                    [&_.select\\_\\_value]:!text-xs
                    [&_.select\\_\\_trigger]:!text-[12px]
                    [&_.select\\_\\_value]:!text-[12px]
                    [&_*]:!text-xs
                    [&_*]:!text-[12px]
                    [&_.select\\_\\_trigger]:!p-0
                    [&_.select\\_\\_value]:!p-0
                    [&_.select\\_\\_item]:!p-0
                    [&_.select\\_\\_content]:!p-0
                    [&_*]:!p-0
                    [&_.select\\_\\_trigger]:!w-[150px]
                    [&_.select\\_\\_trigger]:!max-w-[150px]
                    [&_.select\\_\\_value]:!w-[150px]
                    [&_.select\\_\\_value]:!max-w-[150px]
                    [&_.select\\_\\_value]:!truncate
                  `}
                contentClassName={String.raw`
                    [&_.select\\_\\_content]:!w-fit
                    [&_.select\\_\\_content]:!min-w-[150px]
                    [&_.select\\_\\_content]:!max-w-[500px]
                    [&_.select\\_\\_content]:!bg-white
                    [&_.select\\_\\_content]:!border
                    [&_.select\\_\\_content]:!border-[0.5px]
                    [&_.select\\_\\_content]:!border-gray-300
                    [&_.select\\_\\_content]:!rounded-md
                    [&_.select\\_\\_list-item]:!text-xs
                    [&_.select\\_\\_content]:!text-[12px]
                    [&_.select\\_\\_list-item]:!text-[12px]
                    [&_*]:!text-xs
                    [&_*]:!text-[12px]
                    [&_.select\\_\\_list-item]:!whitespace-nowrap
                    [&_.select\\_\\_list-item]:!overflow-visible
                    [&_.select\\_\\_list-item]:!text-ellipsis-none
                    [&_.select\\_\\_list-item]:bg-white
                    [&_.select\\_\\_list-item]:hover:bg-gray-100
                    [&_.select\\_\\_content]:bg-white
                    [&_.select\\_\\_item]:bg-white
                  `}
                options={
                  stateProjects?.map((project) => ({
                    label: project.title,
                    value: project.id,
                  })) || []
                }
                value={context.row.projectId || undefined}
                placeholder="Set project..."
                onChange={(value) => {
                  // If there's an existing project, remove it first
                  if (context.row.projectId) {
                    dispatch(
                      actions.removeDeliverableInSet({
                        deliverableId: context.row.id,
                        projectId: context.row.projectId,
                      })
                    );
                  }
                  // Add the new project
                  if (value) {
                    dispatch(
                      actions.addDeliverableInSet({
                        deliverableId: context.row.id,
                        projectId: value as string,
                      })
                    );
                  }
                }}
              />
            </div>
          );
        },
      },
      {
        field: "latestActivity",
        title: "Latest Activity",
        editable: false,
        align: "center" as ColumnAlignment,
        renderCell: (value: any, context: any) => {
          if (!context.row.latestActivity) return "";
          const activityText = parseLatestActivity(context.row.latestActivity);
          const [activity, time] = activityText.split("\n");
          return (
            <div className="text-xs">
              <div>{activity}</div>
              <div className=" text-gray-500">{time}</div>
            </div>
          );
        },
      },
    ],
    []
  );

  return (
    <div className="border border-gray-300 p-4 rounded-md">
      <div className="mt-4">
        <h3 className="flex justify-center items-center font-bold text-gray-700 mb-2">
          Deliverables
        </h3>
        <ObjectSetTable
          columns={columns}
          data={richDeliverables || []}
          allowRowSelection={true}
          onDelete={(data: any) => {
            if (data.length > 0) {
              data.forEach((d: any) => {
                dispatch(actions.removeDeliverable({ id: d.id }));
              });
            }
          }}
          onAdd={(data) => {
            if (data.title) {
              const deliverableId = generateId();
              dispatch(
                actions.addDeliverable({
                  id: deliverableId,
                  title: data.title as string,
                })
              );
            }
          }}
        />
      </div>
    </div>
  );
};

export default Deliverables;

const parseLatestActivity = (latestActivity: any) => {
  if (!latestActivity) {
    return "";
  }

  let activity;

  if (
    latestActivity.type === "ADD_DELIVERABLE" ||
    latestActivity.type === "ADD_PROJECT_DELIVERABLE" ||
    latestActivity.type === "ADD_MILESTONE_DELIVERABLE"
  ) {
    activity = "Added Deliverable";
  } else if (
    latestActivity.type === "EDIT_DELIVERABLE" ||
    latestActivity.type === "ADD_DELIVERABLE_IN_SET" ||
    latestActivity.type === "REMOVE_DELIVERABLE_IN_SET"
  ) {
    activity = `Edited ${Object.keys(latestActivity.input)[1]}`;
  }

  // Always show the activity, even if timestamp fails
  let timeDisplay = "";

  if (latestActivity.timestamp) {
    const currentTime = new Date();
    let activityTime;

    // Try different timestamp parsing approaches
    if (typeof latestActivity.timestamp === "string") {
      // Handle string timestamps
      activityTime = new Date(latestActivity.timestamp);
    } else if (typeof latestActivity.timestamp === "number") {
      // Handle numeric timestamps (could be milliseconds or seconds)
      if (latestActivity.timestamp > 1e10) {
        // Looks like milliseconds
        activityTime = new Date(latestActivity.timestamp);
      } else {
        // Looks like seconds, convert to milliseconds
        activityTime = new Date(latestActivity.timestamp * 1000);
      }
    } else if (latestActivity.timestamp instanceof Date) {
      // Already a Date object
      activityTime = latestActivity.timestamp;
    } else {
      // Try to convert anyway
      activityTime = new Date(latestActivity.timestamp);
    }

    // Check if the date is valid
    if (!isNaN(activityTime.getTime())) {
      const timeSince = currentTime.getTime() - activityTime.getTime();
      const timeSinceInMinutes = Math.abs(timeSince / (1000 * 60));
      const timeSinceInHours = timeSinceInMinutes / 60;
      const timeSinceInDays = timeSinceInHours / 24;

      if (timeSinceInDays >= 1) {
        timeDisplay = `${Math.round(timeSinceInDays)} days ago`;
      } else if (timeSinceInHours >= 1) {
        timeDisplay = `${Math.round(timeSinceInHours)} hours ago`;
      } else if (timeSinceInMinutes >= 1) {
        timeDisplay = `${Math.round(timeSinceInMinutes)} minutes ago`;
      } else {
        timeDisplay = "Just now";
      }
    } else {
      // Debug: log the problematic timestamp with more details
      console.log("Invalid timestamp format:", {
        timestamp: latestActivity.timestamp,
        type: typeof latestActivity.timestamp,
        parsed: activityTime,
        isValid: !isNaN(activityTime.getTime()),
      });
      timeDisplay = "Recently";
    }
  }

  return `${activity}\n${timeDisplay}`;
};
