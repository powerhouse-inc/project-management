import {
  DatePicker,
  ObjectSetTable,
  ColumnDef,
  Textarea,
  TextInput,
  ColumnAlignment,
  Select,
} from "@powerhousedao/document-engineering";
import {
  Milestone,
  Roadmap,
  Deliverable,
  DeliverableStatusInput,
} from "../../../document-models/scope-of-work/index.js";
import { actions } from "../../../document-models/scope-of-work/index.js";
import { useEffect, useMemo, useState } from "react";
import { generateId } from "document-model";
interface DeliverablesProps {
  deliverables: Deliverable[];
  dispatch: any;
}

const statusOptions = [
  { label: "Wont Do", value: "WONT_DO" },
  { label: "Draft", value: "DRAFT" },
  { label: "To Do", value: "TODO" },
  { label: "Blocked", value: "BLOCKED" },
  { label: "In Progress", value: "IN_PROGRESS" },
  { label: "Delivered", value: "DELIVERED" },
  { label: "Canceled", value: "CANCELED" },
];

const Deliverables: React.FC<DeliverablesProps> = ({
  deliverables,
  dispatch,
}) => {
  const deliverable = deliverables[0];


  const [stateDeliverable, setStateDeliverable] = useState(deliverable);

  useEffect(() => {
    setStateDeliverable(deliverable);
  }, [deliverable?.id]);

  const columns = useMemo<Array<ColumnDef<any>>>(
    () => [
      {
        field: "title",
        editable: true,
      },
      {
        field: "Link",
        editable: true,
      },
    ],
    []
  );

  return (
    <div className="border border-gray-300 p-2">
      <div className="mt-2 grid grid-cols-8 gap-2">
        <div className="col-span-2">
          <TextInput
            className="w-full"
            label="Code"
            value={stateDeliverable.code}
            onChange={(e) => setStateDeliverable(prevValue => ({ ...prevValue, code: e.target.value }))}
            onBlur={(e) => {
              if(e.target.value === '') {
                dispatch(
                  actions.editDeliverable({
                    id: deliverable.id,
                    code: ' ',
                  })
                )
              }
              if (e.target.value === deliverable.code) return;
              dispatch(
                actions.editDeliverable({
                  id: deliverable.id,
                  code: e.target.value,
                })
              );
            }}
          />
        </div>
        <div className="col-span-6">
          <TextInput
            className="w-full"
            label="Title"
            value={stateDeliverable.title}
            onChange={(e) => setStateDeliverable({ ...stateDeliverable, title: e.target.value })}
            onBlur={(e) => {
              if(e.target.value === '') {
                dispatch(
                  actions.editDeliverable({
                    id: deliverable.id,
                    title: ' ',
                  })
                )
              }
              if (e.target.value === deliverable.title) return;
              dispatch(
                actions.editDeliverable({
                  id: deliverable.id,
                  title: e.target.value,
                })
              );
            }}
          />
        </div>
      </div>
      {/* Coordinators and Delivery Target */}
      <div className="mt-8 grid grid-cols-8 gap-2">
        <div className="col-span-4">
          <TextInput
            className="w-full"
            label="Deliverable Owner"
            value={stateDeliverable.owner || ""}
            onChange={(e) => setStateDeliverable({ ...stateDeliverable, owner: e.target.value })}
            onBlur={(e) => {
              if(e.target.value === '') {
                dispatch(
                  actions.editDeliverable({
                    id: deliverable.id,
                    owner: ' ',
                  })
                )
              }
              if (e.target.value === deliverable.owner) return;
              dispatch(
                actions.editDeliverable({
                  id: deliverable.id,
                  owner: e.target.value,
                })
              );
            }}
          />
        </div>
      </div>
      {/* Description */}
      <div className="mt-8">
        <Textarea
          className="w-full"
          label="Description"
          value={stateDeliverable.description}
          onChange={(e) => setStateDeliverable({ ...stateDeliverable, description: e.target.value })}
          onBlur={(e) => {
            if(e.target.value === '') {
              dispatch(
                actions.editDeliverable({
                  id: deliverable.id,
                  description: ' ',
                })
              )
            }
            if (e.target.value === deliverable.description) return;
            dispatch(
              actions.editDeliverable({
                id: deliverable.id,
                description: e.target.value,
              })
            );
          }}
        />
      </div>
      <div className="mt-2 w-[150px]">
        <Select
          label="Status"
          options={statusOptions}
          value={stateDeliverable.status}
          onChange={(value) => {
            dispatch(
              actions.editDeliverable({
                id: deliverable.id,
                status: value as DeliverableStatusInput,
              })
            );
          }}
        />
      </div>
      <div className="mt-8">
        <ObjectSetTable
          columns={columns}
          data={deliverable.keyResults || []}
          allowRowSelection={true}
          onAdd={(data) => {
            if (data.title) {
              dispatch(
                actions.addKeyResult({
                  id: generateId(),
                  deliverableId: deliverable.id,
                  title: typeof data.title === 'string' ? data.title : '',
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
