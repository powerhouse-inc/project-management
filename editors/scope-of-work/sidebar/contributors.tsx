import { useMemo } from "react";
import {
  ObjectSetTable,
  ColumnDef,
  ColumnAlignment,
  buildEnumCellEditor,
} from "@powerhousedao/document-engineering";
import {
  Agent,
  AgentType,
  ScopeOfWorkAction,
} from "../../../document-models/scope-of-work/gen/types.js";
import { actions } from "../../../document-models/scope-of-work/index.js";
import { generateId } from "document-model";
import { DocumentDispatch } from "@powerhousedao/reactor-browser";

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

  const columns = useMemo<Array<ColumnDef<RichContributors>>>(
    () => [
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
        renderCell: (value, context) => {
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
        valueGetter: (row) => row.agentType,
        onSave: (newValue, context) => {
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
        renderCell: (value, context) => {
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
          onDelete={(data) => {
            if (data.length > 0) {
              data.forEach((d) => {
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
