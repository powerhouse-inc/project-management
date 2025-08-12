import { useMemo, useState, useEffect } from "react";
import {
  Deliverable,
  Milestone,
  Project,
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
  const [currentTime, setCurrentTime] = useState(new Date());
  const [stateMilestones, setStateMilestones] = useState(milestones);
  const [stateProjects, setStateProjects] = useState(projects);

  // Update current time every second for live timestamps
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

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
      operation.type === "ADD_MILESTONE_DELIVERABLE"
  );

  // Create a map of deliverable IDs to their latest activity
  const latestActivityMap = new Map();
  latestActivity?.forEach((activity: any) => {
    if (activity.input?.id) {
      latestActivityMap.set(activity.input.id, {
        type: activity.type,
        timestamp: activity.timestamp,
        input: activity.input,
      });
    } else if (activity.input?.deliverableId) {
      latestActivityMap.set(activity.input.deliverableId, {
        type: activity.type,
        timestamp: activity.timestamp,
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
          if (!context.row?.id) return null;
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
      },
      {
        field: "status",
        title: "Status",
        editable: false,
        align: "center" as ColumnAlignment,
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
                className={`w-full ${context.row.milestoneId ? "ml-2" : ""}`}
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
                className={`w-full ${context.row.projectId ? "ml-2" : ""}`}
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
          const activityText = parseLatestActivity(context.row.latestActivity, currentTime);
          const [activity, time] = activityText.split('\n');
          return (
            <div className="text-xs">
              <div>{activity}</div>
              <div className=" text-gray-500">{time}</div>
            </div>
          );
        },
      },
    ],
    [currentTime]
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

const parseLatestActivity = (latestActivity: any, currentTime: Date) => {
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
  } else if (latestActivity.type === "EDIT_DELIVERABLE") {
    activity = `Edited ${Object.keys(latestActivity.input)[1]}`;
  }

  const timeSince =
    currentTime.getTime() - new Date(latestActivity.timestamp).getTime();
  const timeSinceInSeconds = Math.abs(timeSince / 1000);
  const timeSinceInMinutes = timeSinceInSeconds / 60;
  const timeSinceInHours = timeSinceInMinutes / 60;
  const timeSinceInDays = timeSinceInHours / 24;

  if (timeSinceInDays >= 1) {
    return `${activity}\n${Math.round(timeSinceInDays)} days ago`;
  } else if (timeSinceInHours >= 1) {
    return `${activity}\n${Math.round(timeSinceInHours)} hours ago`;
  } else if (timeSinceInMinutes >= 1) {
    return `${activity}\n${Math.round(timeSinceInMinutes)} minutes ago`;
  } else {
    return `${activity}\n${Math.round(timeSinceInSeconds)} seconds ago`;
  }
};
