import { actions } from "../../../document-models/scope-of-work/index.js";
import { Textarea, TextInput } from "@powerhousedao/document-engineering";
import React, { useState, useEffect, useMemo } from "react";
import { Icon } from "@powerhousedao/design-system";
import { generateId } from "document-model";
import { ObjectSetTable, ColumnAlignment, DatePicker } from "@powerhousedao/document-engineering";

interface Roadmap {
  id: string;
  title: string;
  description?: string;
  [key: string]: any;
}

interface RoadmapsProps {
  roadmaps: Roadmap[];
  dispatch: any;
}

const Roadmaps: React.FC<RoadmapsProps> = ({ roadmaps, dispatch }) => {
  const roadmap = roadmaps[0];

  // Controlled state for title and description
  const [title, setTitle] = useState(roadmap?.title || "");
  const [description, setDescription] = useState(roadmap?.description || "");
  const [slug, setSlug] = useState(roadmap?.slug || "");

  // Update state when roadmap changes
  useEffect(() => {
    setTitle(roadmap?.title || "");
    setDescription(roadmap?.description || "");
    setSlug(roadmap?.slug || "");
  }, [roadmap?.id]);

  const columns = useMemo(
    () => [
      {
        field: "title",
        title: "Title",
        editable: true,
        align: "center" as ColumnAlignment,
        onSave: (newValue: any, context: any) => {
          if (newValue !== context.row.title) {
            dispatch(
              actions.editMilestone({
                id: context.row.id,
                roadmapId: roadmap.id,
                title: newValue as string,
              })
            );
            return true;
          }
          return false;
        },
      },
      {
        field: "coordinators",
        title: "Coordinators",
        align: "center" as ColumnAlignment,
        editable: true,
        onSave: (newValue: any, context: any) => {
          if(Array.isArray(newValue)) {
            newValue.forEach((id: any) => {
              const coordinator = context.row.coordinators.find((c: any) => c === id);
              if(!coordinator) {
                dispatch(actions.addCoordinator({ id: id, milestoneId: context.row.id }));
              }
            });
            return true;
          }
          if(typeof newValue === "string") {
            if(newValue === "") {
              context.row.coordinators.forEach((c: any) => {
                dispatch(actions.removeCoordinator({ id: c, milestoneId: context.row.id }));
              });
              return true;
            }
            const multipleValues = newValue.split(",").map((value: any) => value.trim());
            multipleValues.forEach((value: any) => {
              const coordinator = context.row.coordinators.find((c: any) => c === value);
              if(!coordinator) {
                dispatch(actions.addCoordinator({ id: value, milestoneId: context.row.id }));
              }               
              return true;
            });
          }
          return false;
        },
      },
      {
        field: "deliveryTarget",
        title: "Delivery Target",
        editable: true,
        align: "center" as ColumnAlignment,
        onSave: (data: any, row: any) => {
          console.log("save", row, data);
          return true;
        },
      },
    ],
    []
  );

  return (
    <div className="border border-gray-300 p-2 rounded-md">
      <div className="mt-2">
        <TextInput
          className="w-full"
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onBlur={(e) => {
            dispatch(
              actions.editRoadmap({ id: roadmap.id, title: e.target.value })
            );
          }}
        />
      </div>
      <div className="mt-2">
        <TextInput
          className="w-full"
          label="Slug"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          onBlur={(e) => {
            dispatch(
              actions.editRoadmap({ id: roadmap.id, slug: e.target.value })
            );
          }}
        />
      </div>
      <div className="mt-4">
        <Textarea
          className="w-full"
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          onBlur={(e) => {
            dispatch(
              actions.editRoadmap({
                id: roadmap.id,
                description: e.target.value,
              })
            );
          }}
        />
      </div>
      <div className="mt-4">
        <label className="text-sm font-medium text-gray-700 mb-2">
          Milestones
        </label>
        <ObjectSetTable
          columns={columns}
          data={roadmap.milestones}
          allowRowSelection={true}
          onAdd={(data) => {
            if (data.title) {
              console.log("title", data.title);
              dispatch(
                actions.addMilestone({
                  id: generateId(),
                  roadmapId: roadmap.id,
                  title: data.title as string,
                })
              );
            } else if (data.deliveryTarget) {
              console.log("deliveryTarget", data.deliveryTarget);
              dispatch(
                actions.addMilestone({
                  id: generateId(),
                  roadmapId: roadmap.id,
                  deliveryTarget: data.deliveryTarget as string,
                })
              );
            }
          }}
        />
      </div>
      <div className="mt-4">
        <DatePicker
          name="startDate"
          value={roadmap.startDate}
          onBlur={(e) => {
            // dispatch(actions.editRoadmap({ id: roadmap.id, startDate: e.target.value }));
          }}
        />
      </div>
    </div>
  );
};

export default Roadmaps;
