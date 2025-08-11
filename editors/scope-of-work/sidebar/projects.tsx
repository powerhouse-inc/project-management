import { useMemo } from "react";
import { Project } from "../../../document-models/scope-of-work/gen/types.js";
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
  projects: Project[] | undefined;
  dispatch: any;
  setActiveNodeId: (id: string) => void;
}

const Projects: React.FC<ProjectsProps> = ({
  projects,
  dispatch,
  setActiveNodeId,
}) => {
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
                  setActiveNodeId(`project.${context.row.id}`);
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
        align: "left" as ColumnAlignment,
        onSave: (newValue: any, context: any) => {
          if (newValue !== context.row.title) {
            dispatch(
              actions.updateProject({
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
        field: "projectOwner",
        title: "Owner",
        editable: true,
        align: "center" as ColumnAlignment,
      },
      {
        field: "budget",
        title: "Budget",
        editable: true,
        align: "center" as ColumnAlignment,
        renderCell: (value: any, context: any) => {
          if (value == 0) return null;
          return (
            <div className="text-center">
              {context.row.currency} {value}
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
          Projects
        </h3>
        <ObjectSetTable
          columns={columns}
          data={projects || []}
          allowRowSelection={true}
          onDelete={(data: any) => {
            if (!projects) return;
            dispatch(actions.removeProject({ projectId: data[0].id }));
          }}
          onAdd={(data) => {
            if (data.title) {
              console.log("title", data.title);
              dispatch(
                actions.addProject({
                  id: generateId(),
                  code: "",
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

export default Projects;
