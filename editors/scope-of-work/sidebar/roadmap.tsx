import { actions } from "../../../document-models/scope-of-work/index.js";
import { Textarea, TextInput } from "@powerhousedao/document-engineering";
import React, { useState, useEffect, useMemo } from "react";
import { Icon } from "@powerhousedao/design-system";
import { generateId } from "document-model";
import {
  ObjectSetTable,
  ColumnAlignment,
  DatePicker,
  ColumnDef,
} from "@powerhousedao/document-engineering";

interface Roadmap {
  id: string;
  title: string;
  description?: string;
  [key: string]: any;
}

interface RoadmapsProps {
  roadmaps: Roadmap[];
  dispatch: any;
  setActiveNodeId: (id: string) => void;
}

const Roadmap: React.FC<RoadmapsProps> = ({
  roadmaps,
  dispatch,
  setActiveNodeId,
}) => {
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

  const columns = useMemo<Array<ColumnDef<any>>>(
    () => [
      {
        field: "link",
        width: 20,
        align: "center" as ColumnAlignment,
        renderCell: (value: any, context: any) => {
          if (!context.row?.id) return <div className="w-2"></div>;
          return (
            <div className="text-center">
              <Icon
                className="hover:cursor-pointer"
                name="Moved"
                size={18}
                onClick={() => {
                  setActiveNodeId(`milestone.${context.row.id}`);
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
        renderCell: (value: any, context: any) => {
          if (value === "") {
            return (
              <div className="font-light italic text-left text-gray-500">
                + Double-click to add new milestone (enter or click outside to
                save)
              </div>
            );
          }
          return <div className="text-left">{value}</div>;
        },
      },
      {
        field: "coordinators",
        title: "Coordinators",
        align: "center" as ColumnAlignment,
        editable: true,
        onSave: (newValue: any, context: any) => {
          if (Array.isArray(newValue)) {
            newValue.forEach((id: any) => {
              const coordinator = context.row.coordinators.find(
                (c: any) => c === id
              );
              if (!coordinator) {
                dispatch(
                  actions.addCoordinator({
                    id: id,
                    milestoneId: context.row.id,
                  })
                );
              }
            });
            return true;
          }
          if (typeof newValue === "string") {
            if (newValue === "") {
              context.row.coordinators.forEach((c: any) => {
                dispatch(
                  actions.removeCoordinator({
                    id: c,
                    milestoneId: context.row.id,
                  })
                );
              });
              return true;
            }
            const multipleValues = newValue
              .split(",")
              .map((value: any) => value.trim());
            multipleValues.forEach((value: any) => {
              const coordinator = context.row.coordinators.find(
                (c: any) => c === value
              );
              if (!coordinator) {
                dispatch(
                  actions.addCoordinator({
                    id: value,
                    milestoneId: context.row.id,
                  })
                );
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
        width: 200,
        onSave: (newValue: any, context: any) => {
          if (newValue === "") {
            dispatch(
              actions.editMilestone({
                id: context.row.id,
                roadmapId: roadmap.id,
                deliveryTarget: " ",
              })
            );
            return true;
          }
          if (newValue !== context.row.deliveryTarget || newValue === "") {
            dispatch(
              actions.editMilestone({
                id: context.row.id,
                roadmapId: roadmap.id,
                deliveryTarget: newValue as string,
              })
            );
            return true;
          }
          return false;
        },
        renderCell: (value: any, context: any) => {
          if (!value) return null
          return (
            <div className="text-center">
              {new Date(value).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </div>
          );
        },
      },
    ],
    []
  );

  return (
    <div className="border border-gray-300 p-4 rounded-md">
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
          data={roadmap.milestones || []}
          allowRowSelection={true}
          onDelete={(data) => {
            if (!roadmap) return;
            dispatch(
              actions.removeMilestone({ id: data[0].id, roadmapId: roadmap.id })
            );
          }}
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
    </div>
  );
};

export default Roadmap;
