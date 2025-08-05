import { useMemo, useState, useEffect } from "react";
import {
  Deliverable,
  Milestone,
  Project,
} from "../../../document-models/scope-of-work/gen/types.js";
import {
  TextInput,
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

  // Update current time every second for live timestamps
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const latestActivity = document.operations.global.filter(
    (operation: any) =>
      operation.type === "EDIT_DELIVERABLE" ||
      operation.type === "ADD_DELIVERABLE"
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
    }
  });

  const richDeliverables = useMemo(
    () =>
      [
        // From milestones
        ...(milestones?.flatMap(
          (milestone) =>
            milestone.scope?.deliverables?.map((deliverableId) => {
              const deliverable = deliverables?.find(
                (d) => d.id === deliverableId
              );
              if (!deliverable) return null;
              return {
                ...deliverable,
                milestoneId: milestone.id,
                milestoneTitle: milestone.title,
                latestActivity: latestActivityMap.get(deliverableId),
              };
            }) || []
        ) || []),
        // From projects
        ...(projects?.flatMap(
          (project) =>
            project.scope?.deliverables?.map((deliverableId) => {
              const deliverable = deliverables?.find(
                (d) => d.id === deliverableId
              );
              if (!deliverable) return null;
              return {
                ...deliverable,
                projectId: project.id,
                projectTitle: project.title,
                latestActivity: latestActivityMap.get(deliverableId),
              };
            }) || []
        ) || []),
      ].filter(Boolean),
    [milestones, projects, deliverables, latestActivityMap]
  );

  const columns = useMemo<Array<ColumnDef<any>>>(
    () => [
      {
        field: "link",
        width: 20,
        align: "center" as ColumnAlignment,
        renderCell: (value: any, context: any) => {
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
          return <div className="text-left">{value}</div>;
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
          if (!context.row.milestoneTitle) return "";
          return (
            <div className="flex items-center justify-center">
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
              <span className="text-sm ml-2"> {value}</span>
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
            if (!context.row.projectTitle) return "";
            return (
              <div className="flex items-center justify-center">
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
                <span className="text-sm ml-2"> {value}</span>
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
          return parseLatestActivity(context.row.latestActivity, currentTime);
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
          // onAdd={(data) => {
          //   if (data.title) {
          //     console.log("title", data.title);
          //     dispatch(
          //       actions.addDeliverable({
          //         id: generateId(),
          //         title: data.title as string,
          //       })
          //     );
          //   }
          // }}
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

  if (latestActivity.type === "ADD_DELIVERABLE") {
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
    return `${activity} ${Math.round(timeSinceInDays)} days ago`;
  } else if (timeSinceInHours >= 1) {
    return `${activity} ${Math.round(timeSinceInHours)} hours ago`;
  } else if (timeSinceInMinutes >= 1) {
    return `${activity} ${Math.round(timeSinceInMinutes)} minutes ago`;
  } else {
    return `${activity} ${Math.round(timeSinceInSeconds)} seconds ago`;
  }
};
