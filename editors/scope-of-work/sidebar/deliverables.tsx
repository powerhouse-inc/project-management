import { useMemo } from "react";
import { Deliverable, Milestone, Project } from "../../../document-models/scope-of-work/gen/types.js";
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

const Deliverables: React.FC<ProjectsProps> = ({ deliverables, dispatch, milestones, projects, setActiveNodeId, document }) => {
  console.log('document', document.operations);

  const latestActivity = document.operations.global.filter((operation: any) => operation.type === 'EDIT_DELIVERABLE' || operation.type === 'ADD_DELIVERABLE');
  console.log('latestActivity', latestActivity);

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

  const richDeliverables = [
    // From milestones
    ...(milestones?.flatMap(milestone =>
      milestone.scope?.deliverables?.map(deliverableId => {
        const deliverable = deliverables?.find(d => d.id === deliverableId);
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
    ...(projects?.flatMap(project =>
      project.scope?.deliverables?.map(deliverableId => {
        const deliverable = deliverables?.find(d => d.id === deliverableId);
        if (!deliverable) return null;
        return {
          ...deliverable,
          projectId: project.id,
          projectTitle: project.title,
          latestActivity: latestActivityMap.get(deliverableId),
        };
      }) || []
    ) || []),
  ].filter(Boolean);

  console.log('richDeliverables', richDeliverables);

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
      },
      {
        field: "projectTitle",
        title: "Project",
        editable: false,
        align: "center" as ColumnAlignment,
      },
      {
        field: "latestActivity",
        title: "Latest Activity",
        editable: false,
        align: "center" as ColumnAlignment,
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
          onAdd={(data) => {
            if (data.title) {
              console.log("title", data.title);
              dispatch(
                actions.addDeliverable({
                  id: generateId(),
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
