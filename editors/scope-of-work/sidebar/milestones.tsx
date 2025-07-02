import {
  DatePicker,
  ObjectSetTable,
  ColumnDef,
  Textarea,
  TextInput,
  ColumnAlignment,
} from "@powerhousedao/document-engineering";
import {
  Milestone,
  Roadmap,
  Deliverable,
} from "../../../document-models/scope-of-work/index.js";
import { actions } from "../../../document-models/scope-of-work/index.js";
import { useMemo } from "react";
import { generateId } from "document-model";
import { Icon } from "@powerhousedao/design-system";

interface MilestonesProps {
  roadmaps: Roadmap[];
  milestones: Milestone[];
  dispatch: any;
  deliverables: Deliverable[];
  setDeliverablesOpen: (open: boolean) => void;
  setSelectedDeliverableId: (id: string) => void;
}

const Milestones: React.FC<MilestonesProps> = ({
  milestones,
  roadmaps,
  dispatch,
  deliverables,
  setDeliverablesOpen,
  setSelectedDeliverableId,
}) => {
  const milestone = milestones[0];
  const roadmap = roadmaps.find((r: any) => {
    return r.milestones.some((m: any) => m.id === milestone.id);
  });
  const milestoneDeliverables =
    milestone.scope?.deliverables.map((d: any) =>
      deliverables.find((d2: any) => d2.id === d)
    ) || [];

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
                  setDeliverablesOpen(true);
                  setSelectedDeliverableId(context.row.id);
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
            defaultValue={milestone.sequenceCode}
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
        <div className="col-span-6">
          <TextInput
            className="w-full"
            label="Title"
            defaultValue={milestone.title}
            // onChange={(e) => setTitle(e.target.value)}
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
      </div>
      {/* Coordinators and Delivery Target */}
      <div className="mt-8 grid grid-cols-8 gap-2">
        <div className="col-span-4">
          <TextInput
            className="w-full"
            label="Coordinators"
            defaultValue={milestone.coordinators.join(", ")}
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
            className="w-full"
            name="deliveryTarget"
            label="Delivery Target"
            defaultValue={milestone.deliveryTarget}
            onChange={(e) => {
              if (!roadmap) return;
              if (e.target.value === milestone.deliveryTarget) return;
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
          defaultValue={milestone.description}
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
      <div className="mt-2 w-[150px]">
        <TextInput
          className="w-full"
          label="Estimated Budget Cap"
          defaultValue={milestone.estimatedBudgetCap}
          onBlur={(e) => {
            if (!roadmap) return;
            if (e.target.value === milestone.estimatedBudgetCap) return;
            dispatch(
              actions.editMilestone({
                id: milestone.id,
                roadmapId: roadmap.id,
                estimatedBudgetCap: e.target.value,
              })
            );
          }}
        />
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
