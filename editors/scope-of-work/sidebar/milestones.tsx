import {
  DatePicker,
  ObjectSetTable,
  ColumnDef,
  Textarea,
  TextInput,
  ColumnAlignment,
  Select,
  NumberInput,
} from "@powerhousedao/document-engineering";
import {
  Milestone,
  Roadmap,
  Deliverable,
  DeliverableSetStatusInput,
} from "../../../document-models/scope-of-work/index.js";
import { actions } from "../../../document-models/scope-of-work/index.js";
import { useEffect, useMemo, useState } from "react";
import { generateId } from "document-model";
import { Icon } from "@powerhousedao/design-system";
import ProgressBar from "../components/progressBar.js";

interface MilestonesProps {
  roadmaps: Roadmap[];
  milestones: Milestone[];
  dispatch: any;
  deliverables: Deliverable[];
  setActiveNodeId: (id: string) => void;
}

const Milestones: React.FC<MilestonesProps> = ({
  milestones,
  roadmaps,
  dispatch,
  deliverables,
  setActiveNodeId,
}) => {
  const milestone = milestones[0];
  const roadmap = roadmaps.find((r: any) => {
    return r.milestones.some((m: any) => m.id === milestone.id);
  });
  const milestoneDeliverables =
    milestone.scope?.deliverables.map((d: any) =>
      deliverables.find((d2: any) => d2.id === d)
    ) || [];

  const [stateMilestone, setStateMilestone] = useState(milestone);

  useEffect(() => {
    setStateMilestone(milestone);
  }, [milestone]);

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
        editable: true,
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
        field: "owner",
        editable: true,
        align: "center" as ColumnAlignment,
        onSave: (newValue: any, context: any) => {
          if (newValue !== context.row.title) {
            dispatch(
              actions.editDeliverable({
                id: context.row.id,
                owner: newValue as string,
              })
            );
            return true;
          }
          return false;
        },
      },
      {
        field: "workProgress",
        title: "Progress",
        editable: true,
        align: "center" as ColumnAlignment,
        width: 200,
        renderCell: (value: any, context: any) => {
          const progress = context.row.workProgress;
          if (!progress) return null;
          return <ProgressBar progress={progress} />;
        },
      },
      {
        field: "status",
        title: "Status",
        editable: true,
        align: "center" as ColumnAlignment,
        width: 200,
        renderCell: (value: any, context: any) => {
          return (
            <span className="flex items-center justify-center">{value}</span>
          );
        },
      },
      {
        field: "actions",
        title: "Actions",
        editable: true,
        align: "center" as ColumnAlignment,
        width: 200,
        renderCell: (value: any, context: any) => {
          if (!context.row.id) return null;
          return (
            <span className="cursor-pointer flex items-center justify-center">
              <Icon
                name="Trash"
                size={18}
                className="hover:text-red-500"
                onClick={() => {
                  dispatch(
                    actions.removeDeliverableInSet({
                      milestoneId: milestone.id,
                      deliverableId: context.row.id,
                    })
                  );
                  dispatch(actions.removeDeliverable({ id: context.row.id }));
                }}
              />
            </span>
          );
        },
      },
    ],
    []
  );

  return (
    <div className="border border-gray-300 p-4 rounded-md">
      <div className="mt-2 grid grid-cols-8 gap-2">
        <div className="col-span-2">
          <TextInput
            className="w-full"
            label="Code"
            value={stateMilestone.sequenceCode}
            onChange={(e) =>
              setStateMilestone((prevValue) => ({
                ...prevValue,
                sequenceCode: e.target.value,
              }))
            }
            onBlur={(e) => {
              if (!roadmap) return;
              if (e.target.value === milestone.title) return;
              dispatch(
                actions.editMilestone({
                  id: milestone.id,
                  roadmapId: roadmap.id,
                  sequenceCode: e.target.value,
                })
              );
            }}
          />
        </div>
        <div className="col-span-4">
          <TextInput
            className="w-full"
            label="Title"
            value={stateMilestone.title}
            onChange={(e) =>
              setStateMilestone((prevValue) => ({
                ...prevValue,
                title: e.target.value,
              }))
            }
            onBlur={(e) => {
              if (!roadmap) return;
              if (e.target.value === milestone.title) return;
              dispatch(
                actions.editMilestone({
                  id: milestone.id,
                  roadmapId: roadmap.id,
                  title: e.target.value,
                })
              );
            }}
          />
        </div>
        <div className="col-span-2">
          <Select
            className="w-full"
            label="Status"
            value={stateMilestone.scope?.status}
            options={[
              { label: "Draft", value: "DRAFT" },
              { label: "To Do", value: "TODO" },
              { label: "In Progress", value: "IN_PROGRESS" },
              { label: "Finished", value: "FINISHED" },
              { label: "Cancelled", value: "CANCELLED" },
            ]}
            onChange={(value) => {
              dispatch(
                actions.editDeliverablesSet({
                  milestoneId: milestone.id,
                  status: value as DeliverableSetStatusInput,
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
            label="Coordinators"
            value={stateMilestone.coordinators.join(", ")}
            onChange={(e) =>
              setStateMilestone((prevValue) => ({
                ...prevValue,
                coordinators: e.target.value.split(", "),
              }))
            }
            onBlur={(e) => {
              if (!roadmap) return;
              if (e.target.value === milestone.coordinators.join(", ")) return;
              if (e.target.value === "") {
                milestone.coordinators.forEach((c: any) => {
                  dispatch(
                    actions.removeCoordinator({
                      id: c,
                      milestoneId: milestone.id,
                    })
                  );
                });
                return;
              }
              dispatch(
                actions.addCoordinator({
                  id: e.target.value,
                  milestoneId: milestone.id,
                })
              );
            }}
          />
        </div>
        <div className="col-span-3 flex justify-end">
          <DatePicker
            key={stateMilestone.id}
            className="w-full"
            name="deliveryTarget"
            label="Delivery Target"
            value={stateMilestone.deliveryTarget}
            onChange={(e) => {
              if (!roadmap) return;
              if (e.target.value === stateMilestone.deliveryTarget) return;
              dispatch(
                actions.editMilestone({
                  id: milestone.id,
                  roadmapId: roadmap.id,
                  deliveryTarget: e.target.value,
                })
              );
            }}
          />
        </div>
      </div>
      {/* Description */}
      <div className="mt-2">
        <Textarea
          className="w-full"
          label="Description"
          value={stateMilestone.description}
          onChange={(e) =>
            setStateMilestone((prevValue) => ({
              ...prevValue,
              description: e.target.value,
            }))
          }
          onBlur={(e) => {
            if (!roadmap) return;
            if (e.target.value === milestone.description) return;
            dispatch(
              actions.editMilestone({
                id: milestone.id,
                roadmapId: roadmap.id,
                description: e.target.value,
              })
            );
          }}
        />
      </div>
      <div>
        <label>Budget</label>
        <p className="text-sm rounded-md border border-gray-300 p-2 bg-gray-100 w-32 text-right">
          {milestone.budget?.toFixed(2) || 0}
        </p>
      </div>
      <div className="mt-2">
        <label className="text-sm font-medium text-gray-700 mb-2">
          Deliverables
        </label>
        <ObjectSetTable
          columns={columns}
          data={milestoneDeliverables}
          allowRowSelection={true}
          onAdd={(data) => {
            if (data.title) {
              if (!roadmap) return;
              const deliverableId = generateId();
              dispatch(
                actions.addDeliverable({
                  id: deliverableId,
                  title:
                    typeof data.title === "string" ? data.title : undefined,
                })
              );
              dispatch(
                actions.addDeliverableInSet({
                  milestoneId: milestone.id,
                  deliverableId: deliverableId,
                })
              );
            }
            if (data.owner) {
              if (!roadmap) return;
              const deliverableId = generateId();
              dispatch(
                actions.addDeliverable({
                  id: deliverableId,
                  owner:
                    typeof data.owner === "string" ? data.owner : undefined,
                })
              );
              dispatch(
                actions.addDeliverableInSet({
                  milestoneId: milestone.id,
                  deliverableId: deliverableId,
                })
              );
            }
          }}
        />
      </div>
    </div>
  );
};

export default Milestones;
