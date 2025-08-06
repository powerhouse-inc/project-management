import { useRef, useState, useEffect, useMemo } from "react";
import {
  TextInput,
  Textarea,
  Select,
  ObjectSetTable,
  ColumnDef,
  ColumnAlignment,
} from "@powerhousedao/document-engineering";
import { Icon } from "@powerhousedao/design-system";
import {
  actions,
  ScopeOfWorkStatusInput,
} from "../../../document-models/scope-of-work/index.js";
import { generateId } from "document-model";

interface ScopeOfWorkProps {
  setSelectedRoadmapId: (id: string) => void;
  setRoadmapsOpen: (open: boolean) => void;
  dispatch: any;
  document: any;
  setActiveNodeId: (id: string) => void;
}

const ScopeOfWork = (props: ScopeOfWorkProps) => {
  const {
    setSelectedRoadmapId,
    setRoadmapsOpen,
    dispatch,
    document,
    setActiveNodeId,
  } = props;
  const state = document.state.global;

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
                  setActiveNodeId("roadmap." + context.row.id);
                }}
              />
            </div>
          );
        },
      },
      {
        field: "title",
        title: "Roadmap Title",
        editable: true,
        align: "center" as ColumnAlignment,
        onSave: (newValue: any, context: any) => {
          if (newValue !== context.row.title) {
            dispatch(
              actions.editRoadmap({
                id: context.row.id,
                title: newValue as string,
              })
            );
            return true;
          }
          return false;
        },
        renderCell: (value: any, context: any) => {
          return <div className="text-left">{value}</div>;
        },
      },
      {
        field: "actions",
        title: "Actions",
        editable: true,
        align: "center" as ColumnAlignment,
        width: 200,
        renderCell: (value: any, context: any) => {
          return (
            <span className="cursor-pointer flex items-center justify-center">
              <Icon
                name="Trash"
                size={18}
                className="hover:text-red-500"
                onClick={() => {
                  dispatch(actions.removeRoadmap({ id: context.row.id }));
                }}
              />
            </span>
          );
        },
      },
    ],
    []
  );

  const projectColumns = useMemo<Array<ColumnDef<any>>>(
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
                  setActiveNodeId(`project.${context.row.id}`);
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
        align: "left" as ColumnAlignment,
        onSave: (newValue: any, context: any) => {
          if (newValue !== context.row.title) {
            // dispatch(
            //   actions.editMilestone({
            //     id: context.row.id,
            //     roadmapId: roadmap.id,
            //     title: newValue as string,
            //   })
            // );
            return true;
          }
          return false;
        },
        renderCell: (value: any, context: any) => {
          return <div className="text-left">{value}</div>;
        },
      },
      {
        field: "actions",
        title: "Actions",
        editable: true,
        align: "center" as ColumnAlignment,
        width: 200,
        renderCell: (value: any, context: any) => {
          return (
            <span className="cursor-pointer flex items-center justify-center">
              <Icon
                name="Trash"
                size={18}
                className="hover:text-red-500"
                onClick={() => {
                  dispatch(
                    actions.removeProject({ projectId: context.row.id })
                  );
                }}
              />
            </span>
          );
        },
      },
    ],
    []
  );

  const statusOptions = [
    { label: "Draft", value: "DRAFT" },
    { label: "In Progress", value: "IN_PROGRESS" },
    { label: "Submitted", value: "SUBMITTED" },
    { label: "Rejected", value: "REJECTED" },
    { label: "Approved", value: "APPROVED" },
    { label: "Delivered", value: "DELIVERED" },
    { label: "Cancelled", value: "CANCELED" },
  ];

  const [tableData, setTableData] = useState<any[]>(state.roadmaps);

  // Update tableData when state changes
  useEffect(() => {
    setTableData(state.roadmaps);
  }, [state.roadmaps]);

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
      if (state.roadmaps.find((row: any) => row.id === editRowId)) {
        dispatch(
          actions.editRoadmap({ id: editRowId.toString(), title: editValue })
        );
      } else {
        dispatch(
          actions.addRoadmap({
            id: editRowId,
            title: editValue,
            slug: editValue
              .toLowerCase()
              .replace(/ /g, "-")
              .concat(`-${editRowId.substring(editRowId.length - 8)}`),
          })
        );
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
    <div className="border border-gray-300 p-4 rounded-md ">
      <div className="mt-2">
        <TextInput
          className="w-full"
          label="Title"
          defaultValue={state.title}
          onBlur={(e) => {
            if (e.target.value !== state.title) {
              dispatch(
                actions.editScopeOfWork({ title: e.target.value as string })
              );
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
              dispatch(
                actions.editScopeOfWork({
                  description: e.target.value as string,
                })
              );
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
            dispatch(
              actions.editScopeOfWork({
                status: value as ScopeOfWorkStatusInput,
              })
            );
          }}
        />
      </div>
      <label className="text-sm font-medium text-gray-700 mb-2 mt-4">
        Roadmaps
      </label>
      <ObjectSetTable
        columns={columns}
        data={state.roadmaps || []}
        allowRowSelection={true}
        onAdd={(data) => {
          if (data.title) {
            console.log("title", data.title);
            const newId = generateId();
            dispatch(
              actions.addRoadmap({
                id: newId,
                title: data.title as string,
                slug: (data.title as string)
                  .toLowerCase()
                  .replace(/ /g, "-")
                  .concat(`-${newId.substring(newId.length - 8)}`),
              })
            );
          }
        }}
      />
      <label className="text-sm font-medium text-gray-700 mb-2 mt-4">
        Projects
      </label>
      <ObjectSetTable
        columns={projectColumns}
        data={state.projects || []}
        allowRowSelection={true}
        onAdd={(data) => {
          if (data.title) {
            console.log("title", data.title);
            dispatch(
              actions.addProject({
                id: generateId(),
                code: "",
                title: data.title as string,
              })
            );
          }
        }}
      />
    </div>
  );
};

export default ScopeOfWork;
