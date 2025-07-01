import {
  actions,
} from "../../../document-models/scope-of-work/index.js";
import { Textarea, TextInput } from "@powerhousedao/document-engineering";
import React, { useState, useEffect, useRef } from "react";
import { Icon } from "@powerhousedao/design-system";
import { generateId } from "document-model";

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

  const [tableData, setTableData] = useState<any[]>(roadmap.milestones);

  // Update tableData when state changes
  useEffect(() => {
    setTableData(roadmap.milestones);
  }, [roadmap.milestones]);

  // Update state when roadmap changes
  useEffect(() => {
    setTitle(roadmap?.title || "");
    setDescription(roadmap?.description || "");
    setSlug(roadmap?.slug || "");
  }, [roadmap?.id]);
  
  const [editRowId, setEditRowId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input when entering edit mode
  useEffect(() => {
    if (editRowId !== null && inputRef.current) {
      inputRef.current.focus();
    }
  }, [editRowId]);

  const handleDoubleClick = (row: any) => {
    setEditRowId(row.id);
    setEditValue(row.roadmapTitle);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditValue(e.target.value);
  };

  const handleInputBlur = () => {
    if (editRowId !== null) {
      if (roadmap.milestones.find((row: any) => row.id === editRowId)) {
        dispatch(
          actions.editMilestone({ id: editRowId.toString(), roadmapId: roadmap.id, title: editValue })
        );
      } else {
        dispatch(actions.addMilestone({ id: editRowId, roadmapId: roadmap.id, title: editValue }));
      }
      setEditRowId(null);
      setEditValue("");
    }
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleInputBlur();
    }
  };

  const handleAddRow = () => {
    const newId = generateId();
    setTableData((prev) => [...prev, { id: newId, roadmapTitle: "" }]);
    setEditRowId(newId);
    setEditValue("");
  };


  return (
    <div className="border border-gray-300 p-2 rounded-md">
      <div className="mt-2">
        <TextInput
          className="w-full"
          label="Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          onBlur={(e) => {
            dispatch(actions.editRoadmap({ id: roadmap.id, title: e.target.value }));
          }}
        />
      </div>
      <div className="mt-2">
        <TextInput
          className="w-full"
          label="Slug"
          value={slug}
          onChange={e => setSlug(e.target.value)}
          onBlur={(e) => {
            dispatch(actions.editRoadmap({ id: roadmap.id, slug: e.target.value }));
          }}
        />
      </div>
      <div className="mt-4">
        <Textarea
          className="w-full"
          label="Description"
          value={description}
          onChange={e => setDescription(e.target.value)}
          onBlur={(e) => {
            dispatch(actions.editRoadmap({ id: roadmap.id, description: e.target.value }));
          }}
        />
      </div>
      <div className="mt-4">
        <label className="text-sm font-medium text-gray-700 mb-2">Milestones</label>
        <table className="w-full mb-2 border border-gray-300 rounded">
          <thead>
            <tr className="bg-gray-100 border-b border-gray-300 rounded-t">
              <th className="px-2 py-1 w-24 border-r border-gray-300 rounded-tl">
                #
              </th>
              <th className="px-2 py-1 border-gray-300 rounded-tr">
                Milestone Title
              </th>
              <th className="px-2 py-1 border-gray-300 rounded-tr">
                Coordinator
              </th>
              <th className="px-2 py-1 border-gray-300 rounded-tr">
                Delivery Target
              </th>
              <th className="w-24 px-2 py-1 border-gray-300 rounded-tr">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((row, idx) => (
              <tr
                key={row.id}
                className="hover:bg-gray-50 border-b border-gray-300 last:rounded-b"
              >
                <td className="px-2 py-1 text-center border-r border-gray-300">
                  <span className="flex items-center justify-center gap-1">
                    {/* <span className="text-xs">{idx + 1} </span> */}
                    <span
                      className="cursor-pointer"
                      onClick={() => {
                        
                      }}
                    >
                      <Icon
                        name="Moved"
                        size={18}
                        className="ml-2 hover:text-blue-500"
                      />
                    </span>
                  </span>
                </td>
                <td
                  className="px-2 py-1 cursor-pointer"
                  onDoubleClick={() => handleDoubleClick(row)}
                >
                  {editRowId === row.id ? (
                    <input
                      ref={inputRef}
                      className="w-full border border-gray-300 rounded px-1 py-0.5"
                      defaultValue={row.title}
                      onChange={handleInputChange}
                      onBlur={handleInputBlur}
                      onKeyDown={handleInputKeyDown}
                    />
                  ) : (
                    row.title || (
                      <span className="text-gray-400 italic">
                        (Double click to edit)
                      </span>
                    )
                  )}
                </td>
                <td
                  className="px-2 py-1 cursor-pointer"
                  onDoubleClick={() => handleDoubleClick(row)}
                >
                  {editRowId === row.id ? (
                    <input
                      ref={inputRef}
                      className="w-full border border-gray-300 rounded px-1 py-0.5"
                      defaultValue={row.title}
                      onChange={handleInputChange}
                      onBlur={handleInputBlur}
                      onKeyDown={handleInputKeyDown}
                    />
                  ) : (
                    row.title || (
                      <span className="text-gray-400 italic">
                        (Double click to edit)
                      </span>
                    )
                  )}
                </td>
                <td className="px-2 py-1 cursor-pointer">
                  {row.deliveryTarget}
                </td>
                
                <td className="px-2 py-1 border-r border-gray-300 flex items-center justify-center">
                  <span className="cursor-pointer">
                    <Icon
                      name="Trash"
                      size={18}
                      className="hover:text-red-500"
                      onClick={() => {
                        dispatch(actions.removeMilestone({ id: row.id, roadmapId: roadmap.id }));
                      }}
                    />
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button
          className="w-full bg-white border rounded hover:bg-gray-100"
          onClick={handleAddRow}
        >
          + Add Milestone
        </button>
      </div>
    </div>
  );
};

export default Roadmaps;
