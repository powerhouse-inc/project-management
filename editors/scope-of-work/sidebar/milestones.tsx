import {
  DatePicker,
  ObjectSetTable,
  Textarea,
  TextInput,
} from "@powerhousedao/document-engineering";
import {
  Milestone,
  Roadmap,
} from "../../../document-models/scope-of-work/index.js";
import { actions } from "../../../document-models/scope-of-work/index.js";

interface MilestonesProps {
  roadmaps: Roadmap[];
  milestones: Milestone[];
  dispatch: any;
}

const Milestones: React.FC<MilestonesProps> = ({
  milestones,
  roadmaps,
  dispatch,
}) => {
  const milestone = milestones[0];
  const roadmap = roadmaps.find((r: any) => {
    return r.milestones.some((m: any) => m.id === milestone.id);
  });
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
        <label className="text-sm font-medium text-gray-700 mb-2">Deliverables</label>
        {/* <ObjectSetTable
          columns={columns}
          data={milestone.}
          allowRowSelection={true}
         /> */}
      </div>
    </div>
  );
};

export default Milestones;
