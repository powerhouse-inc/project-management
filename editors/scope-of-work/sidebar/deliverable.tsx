import {
  DatePicker,
  ObjectSetTable,
  ColumnDef,
  Textarea,
  TextInput,
  Select,
  Checkbox,
  NumberInput,
  Icon,
  AIDField,
  Form,
} from "@powerhousedao/document-engineering";
import {
  Milestone,
  Roadmap,
  type Deliverable,
  PmDeliverableStatusInput,
  Project,
  Agent,
} from "../../../document-models/scope-of-work/index.js";
import { actions } from "../../../document-models/scope-of-work/index.js";
import { useEffect, useMemo, useState } from "react";
import { generateId } from "document-model";
import BudgetCalculator from "./budgetCalculator.js";
interface DeliverablesProps {
  deliverables: Deliverable[];
  dispatch: any;
  projects: Project[];
  contributors: Agent[];
}

export const statusOptions = [
  { label: "Wont Do", value: "WONT_DO" },
  { label: "Draft", value: "DRAFT" },
  { label: "To Do", value: "TODO" },
  { label: "Blocked", value: "BLOCKED" },
  { label: "In Progress", value: "IN_PROGRESS" },
  { label: "Delivered", value: "DELIVERED" },
  { label: "Canceled", value: "CANCELED" },
];

const Deliverable: React.FC<DeliverablesProps> = ({
  deliverables,
  dispatch,
  projects,
  contributors,
}) => {
  const currentDeliverable = deliverables[0];
  const [stateDeliverable, setStateDeliverable] = useState(currentDeliverable);
  const [isBoolean, setIsBoolean] = useState(false);
  const [isPercentage, setIsPercentage] = useState(false);
  const [isSP, setIsSP] = useState(false);
  const [workProgress, setWorkProgress] = useState(
    deliverables[0]?.workProgress
  );
  const [budgetCalculatorOpen, setBudgetCalculatorOpen] = useState(false);

  useEffect(() => {
    const currentDeliverable = deliverables[0];
    if (!currentDeliverable) return;

    // Reset all flags first
    setIsBoolean(false);
    setIsPercentage(false);
    setIsSP(false);

    if (currentDeliverable.workProgress) {
      if (
        "done" in currentDeliverable.workProgress &&
        !("total" in currentDeliverable.workProgress)
      ) {
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
  }, [deliverables, currentDeliverable.owner]);

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
    <div>
      {budgetCalculatorOpen ? (
        <BudgetCalculator
          setBudgetCalculatorOpen={setBudgetCalculatorOpen}
          project={projects.find(
            (p) => p.id === stateDeliverable.budgetAnchor?.project
          )}
          deliverables={[stateDeliverable]}
          dispatch={dispatch}
        />
      ) : (
        <div className="border border-gray-300 p-4 rounded-md">
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
              <Form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!stateDeliverable) return;
                  // Get the current value from the AIDField
                  const currentValue = typeof stateDeliverable.owner === 'string' 
                    ? stateDeliverable.owner 
                    : (stateDeliverable.owner as any)?.value || '';
                  const originalValue = typeof currentDeliverable.owner === 'string' 
                    ? currentDeliverable.owner 
                    : (currentDeliverable.owner as any)?.value || '';
                  const currentValueStr = typeof currentValue === 'string' 
                    ? currentValue 
                    : (currentValue as any)?.value || '';
                  if (currentValueStr === originalValue) return;
                  dispatch(
                    actions.editDeliverable({
                      id: currentDeliverable.id,
                      owner: currentValueStr,
                    })
                  );
                }}
              >
                <AIDField
                  className="w-full mt-2"
                  label="Deliverable Owner"
                  name="owner"
                  value={stateDeliverable.owner || ""}
                  initialOptions={contributors.map((c) => ({
                    value: c.id,
                    title: c.name,
                    agentType: c.agentType,
                    path: {
                      text: "Link",
                      url: "https://powerhouse.inc",
                    },
                    description: " ",
                    icon: "Person",
                  }))}
                  onChange={(e) => {
                    // Handle both object and string cases
                    let ownerId = '';
                    
                    if (typeof e === 'object' && e !== null) {
                      // Object case - extract the value
                      ownerId = (e as any).value || '';
                    } else if (typeof e === 'string') {
                      // String case - could be typing or selection
                      const isUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(e);
                      
                      if (isUUID) {
                        ownerId = e;
                      } else {
                        // This is just typing, don't update state or dispatch
                        return;
                      }
                    }
                    
                    // If we have a valid owner ID, update state and dispatch
                    if (ownerId) {
                      setStateDeliverable({
                        ...stateDeliverable,
                        owner: ownerId,
                      });
                      
                      // Check if this is different from the original value
                      const originalValue = currentDeliverable.owner || '';
                      
                      if (ownerId !== originalValue) {
                        dispatch(
                          actions.editDeliverable({
                            id: currentDeliverable.id,
                            owner: ownerId,
                          })
                        );
                      }
                    }
                  }}
                  variant="withValueAndTitle"
                  onBlur={(e) => {
                    if (!stateDeliverable) return;
                    
                    const originalValue = currentDeliverable.owner || '';
                    const targetValue = e.target.value;
                    
                    // Check if the input value is different from the original value
                    if (targetValue === originalValue) {
                      return;
                    }
                    
                    // If user typed something new, dispatch with the typed value
                    dispatch(
                      actions.editDeliverable({
                        id: currentDeliverable.id,
                        owner: targetValue,
                      })
                    );
                  }}
                  fetchOptionsCallback={async (userInput: string) => {
                    const contributorsFilter = contributors.filter((c) =>
                      c.name.toLowerCase().includes(userInput.toLowerCase())
                    );
                    if (contributorsFilter.length === 0) {
                      return Promise.reject(new Error("No contributors found"));
                    }
                    return contributorsFilter.map((c) => ({
                      value: c.id,
                      title: c.name,
                      agentType: c.agentType,
                      path: {
                        text: "Link",
                        url: "https://powerhouse.inc",
                      },
                      description: " ",
                      icon: "Person",
                    }));
                  }}
                  fetchSelectedOptionCallback={async (agentId) => {
                    const agent = contributors.find((c) => c.id === agentId);
                    if (!agent)
                      return Promise.reject(new Error("Agent not found"));
                    return {
                      value: agent.id,
                      title: agent.name,
                      agentType: agent.agentType,
                      description: " ",
                      icon: "Person",
                      path: {
                        text: "Link",
                        url: "https://powerhouse.inc",
                      },
                    };
                  }}
                />
              </Form>
            </div>
          </div>
          {/* Description */}
          <div className="mt-8">
            <Textarea
              className="w-full"
              label="Description"
              value={stateDeliverable.description}
              autoExpand={true}
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
                  if (!value) return null;
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
                        done: false,
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
              {isBoolean && (
                <Checkbox
                  key={`checkbox-${currentDeliverable.id}-${workProgress && "completed" in workProgress ? Boolean(workProgress.completed) : false}`}
                  label="Delivered"
                  // defaultChecked={workProgress && "isBinary" in workProgress ? (workProgress.isBinary ?? false) : false}
                  defaultChecked={
                    workProgress && "done" in workProgress
                      ? Boolean(workProgress.done)
                      : false
                  }
                  onChange={(e: any) => {
                    dispatch(
                      actions.setDeliverableProgress({
                        id: currentDeliverable.id,
                        workProgress: {
                          done: e,
                        },
                      })
                    );
                  }}
                />
              )}
              {isPercentage && (
                <div className="flex flex-col">
                  <label className="text-sm font-medium mb-1">Percentage</label>
                  <input
                    type="number"
                    className="w-16 h-8 border border-gray-300 rounded px-2 bg-white"
                    defaultValue={
                      workProgress && "value" in workProgress
                        ? (workProgress.value ?? 0)
                        : 0
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
                </div>
              )}
              {isSP && (
                <div className="text-sm grid grid-cols-2 gap-2">
                  <div className="col-span-1">
                    <label>Completed</label>
                    <input
                      type="number"
                      className="w-16 h-8 border border-gray-300 rounded px-2 flex items-end bg-white"
                      value={
                        workProgress && "completed" in workProgress
                          ? Number(workProgress.completed) || 0
                          : 0
                      }
                      onChange={(e) => {
                        setWorkProgress((prev: any) => {
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
                        if (workProgress && "completed" in workProgress) {
                          dispatch(
                            actions.setDeliverableProgress({
                              id: currentDeliverable.id,
                              workProgress: {
                                storyPoints: {
                                  total:
                                    workProgress && "total" in workProgress
                                      ? workProgress.total
                                      : 0,
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
                      className="w-16 h-8 border border-gray-300 rounded px-2 flex items-end bg-white"
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
                        if (workProgress && "total" in workProgress) {
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
          <div className="mt-8 grid grid-cols-2 gap-2">
            <div className="col-span-1 gap-2 w-[300px]">
              <Select
                label="Budget Anchor"
                options={projects.map((project) => ({
                  label: project.title,
                  value: project.id,
                }))}
                value={stateDeliverable.budgetAnchor?.project || ""}
                onChange={(value) => {
                  dispatch(
                    actions.setDeliverableBudgetAnchorProject({
                      deliverableId: currentDeliverable.id,
                      project: value as string,
                      unit: "Hours",
                      unitCost: 0,
                      quantity: 0,
                      margin: 0,
                    })
                  );
                }}
              />
            </div>
            <div className="flex items-center gap-2 col-span-1 align-center">
              <span>Budget Calculator</span>
              <Icon
                className="hover:cursor-pointer hover:bg-gray-500"
                name="Moved"
                size={18}
                onClick={() => {
                  setBudgetCalculatorOpen(true);
                }}
              />
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
                onDelete={(data) => {
                  if (data.length > 0) {
                    data.forEach((d: any) => {
                      dispatch(
                        actions.removeKeyResult({
                          id: d.id,
                          deliverableId: currentDeliverable.id,
                        })
                      );
                    });
                  }
                }}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Deliverable;
