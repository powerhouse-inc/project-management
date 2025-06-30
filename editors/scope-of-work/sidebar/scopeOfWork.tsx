import { useRef, useState, useEffect } from "react";
import {
  TextInput,
  Textarea,
  Select,
} from "@powerhousedao/document-engineering";
import { Icon } from "@powerhousedao/design-system";
import { actions, ScopeOfWorkStatusInput } from "../../../document-models/scope-of-work/index.js";
import { generateId } from "document-model";

const ScopeOfWork = (props: any) => {
  const { dispatch, document } = props;
  const state = props.document.state.global;

  const statusOptions = [
    { label: "Draft", value: "DRAFT" },
    { label: "Submitted", value: "SUBMITTED" },
    { label: "Rejected", value: "REJECTED" },
    { label: "Approved", value: "APPROVED" },
    { label: "Cancelled", value: "CANCELED" },
  ];

  const [tableData, setTableData] = useState<any[]>(state.roadmaps);
  
  // Update tableData when state changes
  useEffect(() => {
    setTableData(state.roadmaps);
  }, [state.roadmaps]);
  const [nextId, setNextId] = useState(2); // start from 2 if 1 is used
  const [editRowId, setEditRowId] = useState<number | null>(null);
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
      // setTableData((prev) =>
      //   prev.map((row) =>
      //     row.id === editRowId ? { ...row, roadmapTitle: editValue } : row
      //   )
      // );

      if(tableData.find((row) => row.id === editRowId)) {
        dispatch(actions.editRoadmap({id: editRowId.toString(), title: editValue }));
      } else {
        dispatch(actions.addRoadmap({ id: generateId(), title: editValue }));
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
    setTableData((prev) => [
      ...prev,
      { id: nextId, roadmapTitle: "" }
    ]);
    setEditRowId(nextId);
    setEditValue("");
    setNextId(nextId + 1);
  };

  return (
    <div className="border border-gray-300 p-2 rounded-md">
      <div className="mt-2">
        <TextInput 
        className="w-full" 
        label="Title" 
        defaultValue={state.title}
        onBlur={(e) => {
          if (e.target.value !== state.title) {
            dispatch(actions.editScopeOfWork({ title: e.target.value as string }));
          }
        }}
        />
      </div>
      <div className="mt-4">
        <Textarea 
        className="w-full"
        label="Description"
        defaultValue={state.description}
        onBlur={(e) => {
          if (e.target.value !== state.description) {
            dispatch(actions.editScopeOfWork({ description: e.target.value as string }));
          }
        }}
        />
      </div>
      <div className="mt-4 w-[130px]">
        <Select 
        label="Status" 
        options={statusOptions} 
        value={state.status}
        onChange={(value) => {
          dispatch(actions.editScopeOfWork({ status: value as ScopeOfWorkStatusInput }));
        }}
        />
      </div>
      <div className="mt-4">
        <table className="w-full mb-2 border border-gray-300 rounded">
          <thead>
            <tr className="bg-gray-100 border-b border-gray-300 rounded-t">
              <th className="px-2 py-1 w-24 border-r border-gray-300 rounded-tl">#</th>
              <th className="px-2 py-1 border-gray-300 rounded-tr">Roadmap Title</th>
              <th className="w-24 px-2 py-1 border-gray-300 rounded-tr">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((row, idx) => (
              <tr key={row.id} className="hover:bg-gray-50 border-b border-gray-300 last:rounded-b">
                <td className="px-2 py-1 text-center border-r border-gray-300">
                  <span className='flex items-center justify-center gap-1'>
                    {/* <span className="text-xs">{idx + 1} </span> */}
                    <span
                      className="cursor-pointer"
                      onClick={() => {
                        console.log("move to roadmap");
                      }}
                    >
                      <Icon name="Moved" size={18} className="ml-2 hover:text-blue-500" />
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
                    row.title || <span className="text-gray-400 italic">(Double click to edit)</span>
                  )}
                </td>
                <td className="px-2 py-1 border-r border-gray-300 flex items-center justify-center">
                  <span className="cursor-pointer">
                    <Icon 
                    name="Trash" 
                    size={18} 
                    className="hover:text-red-500"
                    onClick={() => {
                      dispatch(actions.removeRoadmap({ id: row.id }));
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
          + Add Roadmap
        </button>
      </div>
    </div>
  );
};

export default ScopeOfWork;
