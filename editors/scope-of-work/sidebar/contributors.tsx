import { useMemo } from "react";
import {
  Select,
  ObjectSetTable,
  ColumnDef,
  ColumnAlignment,
  buildEnumCellEditor,
} from "@powerhousedao/document-engineering";
import {
  Agent,
  AgentType,
} from "../../../document-models/scope-of-work/gen/types.js";
import { actions } from "../../../document-models/scope-of-work/index.js";
import { generateId } from "document-model";

interface ContributorsProps {
  dispatch: any;
  contributors: Agent[];
}

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

  const columns = useMemo<Array<ColumnDef<any>>>(
    () => [
      {
        field: "title",
        title: "Contributor",
        editable: true,
        align: "center" as ColumnAlignment,
        width: 200,
        onSave: (newValue: any, context: any) => {
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
        renderCell: (value: any, context: any) => {
          if (value === "") {
            return (
              <div className="font-light italic text-gray-500 text-center">
                + Double-click to add new contributor (enter or click outside to
                save)
              </div>
            );
          }
          return <div className="text-center">{value}</div>;
        },
      },
      {
        field: "role",
        title: "Role",
        editable: false,
        align: "center" as ColumnAlignment,
      },
      {
        field: "workload",
        title: "Workload",
        editable: false,
        align: "center" as ColumnAlignment,
      },
      {
        field: "agentType",
        title: "Agent Type",
        editable: true,
        align: "center" as ColumnAlignment,
        valueGetter: (row: any) => row.agentType,
        onSave: (newValue: any, context: any) => {
          if (newValue !== context.row.agentType) {
            dispatch(
              actions.editAgent({
                id: context.row.id,
                agentType: newValue as AgentType,
              })
            );
            return true;
          }
          return false;
        },
        renderCellEditor: buildEnumCellEditor({
          className: "w-[130px]",
          options: [
            { label: "Human", value: "HUMAN" },
            { label: "Group", value: "GROUP" },
            { label: "AI", value: "AI" },
          ],
        }),
        renderCell: (value: any, context: any) => {
          if (!context.row.agentType) return "";
          return <div className="text-center">{context.row.agentType}</div>;
        },
      },
    ],
    [contributors]
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
          onDelete={(data: any) => {
            if (data.length > 0) {
              data.forEach((d: any) => {
                dispatch(actions.removeAgent({ id: d.id }));
              });
            }
          }}
          onAdd={(data) => {
            if (data.title) {
              const agentId = generateId();
              dispatch(
                actions.addAgent({
                  id: agentId,
                  name: data.title as string,
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
