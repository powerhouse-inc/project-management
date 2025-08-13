import { useMemo } from "react";
import {
  Select,
  ObjectSetTable,
  ColumnDef,
  ColumnAlignment,
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

  console.log(richContributors)

  const columns = useMemo<Array<ColumnDef<any>>>(
    () => [
      {
        field: "title",
        title: "Contributor",
        editable: true,
        align: "center" as ColumnAlignment,
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
      },
      {
        field: "role",
        title: "Role",
        editable: true,
        align: "center" as ColumnAlignment,
      },
      {
        field: "workload",
        title: "Workload",
        editable: true,
        align: "center" as ColumnAlignment,
      },
      {
        field: "agentType",
        title: "Agent Type",
        editable: true,
        align: "center" as ColumnAlignment,
        renderCell: (value: any, context: any) => {
          if (!context.row.agentType) return "";
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
                options={[
                  { label: "Human", value: "HUMAN" },
                  { label: "Group", value: "GROUP" },
                  { label: "AI", value: "AI" },
                ]}
                value={context.row.agentType}
                onChange={(value) => {
                  if (!value) return null;
                  dispatch(
                    actions.editAgent({
                      id: context.row.id,
                      agentType: value as AgentType,
                    })
                  );
                }}
              />
            </div>
          );
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
