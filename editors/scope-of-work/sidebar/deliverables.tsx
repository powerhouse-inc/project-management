import {
  DatePicker,
  ObjectSetTable,
  ColumnDef,
  Textarea,
  TextInput,
  Select,
  Checkbox,
  NumberInput,
} from "@powerhousedao/document-engineering";
import {
  Milestone,
  Roadmap,
  Deliverable,
  PmDeliverableStatusInput,
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
  const currentDeliverable = deliverables[0];
  const [stateDeliverable, setStateDeliverable] = useState(currentDeliverable);
  const [isBoolean, setIsBoolean] = useState(false);
  const [isPercentage, setIsPercentage] = useState(false);
  const [isSP, setIsSP] = useState(false);
  const [workProgress, setWorkProgress] = useState(
    deliverables[0]?.workProgress
  );

  useEffect(() => {
    const currentDeliverable = deliverables[0];
    if (!currentDeliverable) return;

    // Reset all flags first
    setIsBoolean(false);
    setIsPercentage(false);
    setIsSP(false);

    if (currentDeliverable.workProgress) {
      if ("isBinary" in currentDeliverable.workProgress) {
        setIsBoolean(true);
      } else if ("value" in currentDeliverable.workProgress) {
        setIsPercentage(true);
      } else if (
        "total" in currentDeliverable.workProgress &&
        "completed" in currentDeliverable.workProgress
      ) {
        setIsSP(true);
      }
    }
    setStateDeliverable(currentDeliverable);
    setWorkProgress(currentDeliverable.workProgress);
  }, [deliverables]);

  const columns = useMemo<Array<ColumnDef<any>>>(() => {
    return [
      {
        field: "title",
        editable: true,
        onSave: (newValue: any, context: any) => {
          if (newValue !== context.row.title) {
            dispatch(
              actions.editKeyResult({
                id: context.row.id,
                deliverableId: currentDeliverable.id,
                title: newValue,
              })
            );
            return true;
          }
          return false;
        },
      },
      {
        field: "link",
        editable: true,
        onSave: (newValue: any, context: any) => {
          if (newValue !== context.row.link) {
            dispatch(
              actions.editKeyResult({
                id: context.row.id,
                deliverableId: currentDeliverable.id,
                link: newValue,
              })
            );
            return true;
          }
          return false;
        },
      },
    ];
  }, [currentDeliverable, dispatch]);

  return (
    <div className="border border-gray-300 p-2">
      <div className="mt-2 grid grid-cols-8 gap-2">
        <div className="col-span-2">
          <TextInput
            className="w-full"
            label="Code"
            value={stateDeliverable.code}
            onChange={(e) =>
              setStateDeliverable((prevValue) => ({
                ...prevValue,
                code: e.target.value,
              }))
            }
            onBlur={(e) => {
              if (e.target.value === "") {
                dispatch(
                  actions.editDeliverable({
                    id: currentDeliverable.id,
                    code: " ",
                  })
                );
              }
              if (e.target.value === currentDeliverable.code) return;
              dispatch(
                actions.editDeliverable({
                  id: currentDeliverable.id,
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
            onChange={(e) =>
              setStateDeliverable({
                ...stateDeliverable,
                title: e.target.value,
              })
            }
            onBlur={(e) => {
              if (e.target.value === "") {
                dispatch(
                  actions.editDeliverable({
                    id: currentDeliverable.id,
                    title: " ",
                  })
                );
              }
              if (e.target.value === currentDeliverable.title) return;
              dispatch(
                actions.editDeliverable({
                  id: currentDeliverable.id,
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
            onChange={(e) =>
              setStateDeliverable({
                ...stateDeliverable,
                owner: e.target.value,
              })
            }
            onBlur={(e) => {
              if (e.target.value === "") {
                dispatch(
                  actions.editDeliverable({
                    id: currentDeliverable.id,
                    owner: " ",
                  })
                );
              }
              if (e.target.value === currentDeliverable.owner) return;
              dispatch(
                actions.editDeliverable({
                  id: currentDeliverable.id,
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
          onChange={(e) =>
            setStateDeliverable({
              ...stateDeliverable,
              description: e.target.value,
            })
          }
          onBlur={(e) => {
            if (e.target.value === "") {
              dispatch(
                actions.editDeliverable({
                  id: currentDeliverable.id,
                  description: " ",
                })
              );
            }
            if (e.target.value === currentDeliverable.description) return;
            dispatch(
              actions.editDeliverable({
                id: currentDeliverable.id,
                description: e.target.value,
              })
            );
          }}
        />
      </div>
      <div className="mt-8 grid grid-cols-8 gap-2">
        <div className="mt-2 w-[150px] col-span-2">
          <Select
            label="Status"
            options={statusOptions}
            value={stateDeliverable.status}
            onChange={(value) => {
              dispatch(
                actions.editDeliverable({
                  id: currentDeliverable.id,
                  status: value as PmDeliverableStatusInput,
                })
              );
            }}
          />
        </div>
        <div className="col-span-3 flex justify-center items-end">
          <button
            className={`p-2 border border-gray-300 w-12 h-8 text-sm hover:bg-gray-100 ${isBoolean ? "bg-blue-100" : "bg-white"}`}
            onClick={() => {
              setIsBoolean(true);
              setIsPercentage(false);
              setIsSP(false);
              dispatch(
                actions.setDeliverableProgress({
                  id: currentDeliverable.id,
                  workProgress: {
                    binary: true,
                  },
                })
              );
            }}
          >
            -
          </button>
          <button
            className={`p-2 border border-gray-300 w-12 h-8 text-sm hover:bg-gray-100 ${isPercentage ? "bg-blue-100" : "bg-white"}`}
            onClick={() => {
              setIsBoolean(false);
              setIsPercentage(true);
              setIsSP(false);
              dispatch(
                actions.setDeliverableProgress({
                  id: currentDeliverable.id,
                  workProgress: {
                    percentage: 0,
                  },
                })
              );
            }}
          >
            %
          </button>
          <button
            className={`p-2 border border-gray-300 w-12 h-8 text-sm hover:bg-gray-100 ${isSP ? "bg-blue-100" : "bg-white"}`}
            onClick={() => {
              setIsBoolean(false);
              setIsPercentage(false);
              setIsSP(true);
              dispatch(
                actions.setDeliverableProgress({
                  id: currentDeliverable.id,
                  workProgress: {
                    storyPoints: {
                      total: 0,
                      completed: 0,
                    },
                  },
                })
              );
            }}
          >
            SP
          </button>
        </div>
        <div className="col-span-3 flex justify-end items-end mr-4">
          {isBoolean && <Checkbox label="Delivered"
            // defaultChecked={workProgress && "isBinary" in workProgress ? (workProgress.isBinary ?? false) : false}
            defaultChecked={workProgress && "isBinary" in workProgress ? (workProgress.isBinary ?? false) : false}
            onChange={(e: any) => {
              dispatch(
                actions.setDeliverableProgress({
                  id: currentDeliverable.id,
                  workProgress: {
                    binary: e,
                  },
                })
              );
            }}
          />}
          {isPercentage && (
            <NumberInput
              key={`percentage-${currentDeliverable.id}${workProgress}`}
              name="Percentage"
              label="Percentage"
              className="w-16"
              value={
                workProgress && "value" in workProgress ? workProgress.value ?? 0 : 0
              }
              onBlur={(e) => {
                dispatch(
                  actions.setDeliverableProgress({
                    id: currentDeliverable.id,
                    workProgress: {
                      percentage: parseFloat(e.target.value),
                    },
                  })
                );
              }}
            />
          )}
          {isSP && (
            <div className="text-sm grid grid-cols-2 gap-2">
              <div className="col-span-1">
                <label>Completed</label>
                <input
                  type="number"
                  className="w-16 h-8 flex items-end"
                  value={
                    workProgress && "completed" in workProgress
                      ? workProgress.completed
                      : 0
                  }
                  onChange={(e) => {
                    setWorkProgress((prev) => {
                      if (prev && "completed" in prev) {
                        return {
                          ...prev,
                          completed: parseInt(e.target.value),
                        };
                      }
                      return prev;
                    });
                  }}
                  onBlur={(e) => {
                    if (
                      workProgress &&
                      "completed" in workProgress
                    ) {
                      dispatch(
                        actions.setDeliverableProgress({
                          id: currentDeliverable.id,
                          workProgress: {
                            storyPoints: {
                              total: workProgress.total ?? 0,
                              completed: parseInt(e.target.value),
                            },
                          },
                        })
                      );
                    }
                  }}
                />
              </div>
              <div className="col-span-1">
                <label>Total</label>
                <input
                  type="number"
                  className="w-16 h-8 flex items-end"
                  value={
                    workProgress && "total" in workProgress
                      ? workProgress.total
                      : 0
                  }
                  onChange={(e) => {
                    setWorkProgress((prev) => {
                      if (prev && "total" in prev) {
                        return {
                          ...prev,
                          total: parseInt(e.target.value),
                        };
                      }
                      return prev;
                    });
                  }}
                  onBlur={(e) => {
                    if (
                      workProgress &&
                      "total" in workProgress
                    ) {
                      dispatch(
                        actions.setDeliverableProgress({
                          id: currentDeliverable.id,
                          workProgress: {
                            storyPoints: {
                              total: parseInt(e.target.value),
                              completed: workProgress?.completed || 0,
                            },
                          },
                        })
                      );
                    }
                  }}
                />
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="mt-8">
        <label className="text-sm font-medium">Add Key Results</label>
        {currentDeliverable && (
          <ObjectSetTable
            columns={columns}
            data={currentDeliverable.keyResults || []}
            allowRowSelection={true}
            onAdd={(data) => {
              if (data.title) {
                dispatch(
                  actions.addKeyResult({
                    id: generateId(),
                    deliverableId: currentDeliverable.id,
                    title: typeof data.title === "string" ? data.title : "",
                  })
                );
              }
            }}
          />
        )}
      </div>
    </div>
  );
};

export default Deliverables;
