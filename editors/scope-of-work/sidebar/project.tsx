import {
  Deliverable,
  type Project,
  type PmBudgetTypeInput,
  PmCurrencyInput,
} from "../../../document-models/scope-of-work/gen/types.js";
import { useMemo, useState, useEffect } from "react";
import {
  TextInput,
  ObjectSetTable,
  ColumnDef,
  ColumnAlignment,
  Textarea,
  AIDField,
  Form,
  Select,
  NumberInput,
} from "@powerhousedao/document-engineering";
import { Icon } from "@powerhousedao/design-system";
import { actions } from "../../../document-models/scope-of-work/index.js";
import { generateId } from "document-model";
import BudgetCalculator from "./budgetCalculator.js";

interface ProjectProps {
  project: Project | undefined;
  dispatch: any;
  deliverables: Deliverable[];
  setActiveNodeId: (id: string) => void;
}

const Project: React.FC<ProjectProps> = ({
  project,
  dispatch,
  deliverables,
  setActiveNodeId,
}) => {
  const [code, setCode] = useState(project?.code);
  const [title, setTitle] = useState(project?.title);
  const [projectOwner, setProjectOwner] = useState(
    project?.projectOwner as string
  );
  const [imageUrl, setImageUrl] = useState(project?.imageUrl || "");
  const [projectAbstract, setProjectAbstract] = useState(
    project?.abstract as string
  );
  const [budget, setBudget] = useState(project?.budget || 0);
  const [budgetCalculatorOpen, setBudgetCalculatorOpen] = useState(false);

  useEffect(() => {
    setBudget(project?.budget || 0);
  }, [deliverables, project?.id]);

  const projectDeliverables =
    project?.scope?.deliverables.map((d: any) =>
      deliverables.find((d2: any) => d2.id === d)
    ) || [];

  // Validate image URL by checking file extension
  const isValidImageUrl = (url: string): boolean => {
    if (!url) return false;
    const validExtensions = [".jpg", ".jpeg", ".png", ".svg"];
    return validExtensions.some((ext) => url.toLowerCase().endsWith(ext));
  };

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
                      projectId: project!.id,
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
    <>
      {budgetCalculatorOpen ? (
        <BudgetCalculator
          setBudgetCalculatorOpen={setBudgetCalculatorOpen}
          project={project}
          deliverables={projectDeliverables as Deliverable[]}
          dispatch={dispatch}
        />
      ) : (
        <div className="border border-gray-300 p-4 rounded-md">
          <div className="mt-2 grid grid-cols-8 gap-2">
            <div className="col-span-2">
              <TextInput
                className="w-full"
                label="Code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                onBlur={(e) => {
                  if (!project) return;
                  if (e.target.value === project.code) return;
                  dispatch(
                    actions.updateProject({
                      id: project.id,
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
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                onBlur={(e) => {
                  if (!project) return;
                  if (e.target.value === project.title) return;
                  dispatch(
                    actions.updateProject({
                      id: project.id,
                      title: e.target.value,
                    })
                  );
                }}
              />
            </div>
          </div>
          {/* Project Owner and Image URL */}
          <div className="mt-8 grid grid-cols-3 gap-2">
            <div className="col-span-1">
              <Form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!project) return;
                  // dispatch(actions.updateProject({ id: project.id, projectOwner: projectOwner }));
                }}
              >
                <AIDField
                  className="w-full"
                  label="Project Owner"
                  name="projectOwner"
                  value={project?.projectOwner as string}
                  onChange={(e) => setProjectOwner(e)}
                  fetchOptionsCallback={async (userInput: string) => {
                    return [];
                  }}
                />
              </Form>
            </div>
            <div className="col-span-1">
              <TextInput
                label="Cover Image"
                className="w-full"
                placeholder="Enter image URL"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                onBlur={(e) => {
                  if (project && e.target.value !== project.imageUrl) {
                    dispatch(
                      actions.updateProject({
                        id: project.id,
                        imageUrl: e.target.value,
                      })
                    );
                  }
                }}
                errors={
                  imageUrl && !isValidImageUrl(imageUrl)
                    ? [
                        "Invalid image URL. Must end with .jpg, .jpeg, .png, or .svg",
                      ]
                    : []
                }
              />
            </div>
            <div className="col-span-1 flex justify-center items-start align-end pt-6">
              {imageUrl && (
                <div>
                  {isValidImageUrl(imageUrl) ? (
                    <img
                      src={imageUrl}
                      alt="Project cover"
                      className="w-[100px] h-[100px] object-cover rounded border"
                    />
                  ) : (
                    <div className="w-[100px] h-[100px] bg-red-100 border border-red-300 rounded flex items-center justify-center text-red-500 text-xs">
                      Invalid
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
          {/* Description */}
          <div className="mt-2">
            <Textarea
              className="w-full"
              label="Abstract"
              value={projectAbstract}
              onChange={(e) => setProjectAbstract(e.target.value)}
              onBlur={(e) => {
                if (!project) return;
                if (e.target.value === project.abstract) return;
                dispatch(
                  actions.updateProject({
                    id: project.id,
                    abstract: e.target.value,
                  })
                );
              }}
            />
          </div>
          <div className="mt-8 grid grid-cols-4 gap-2">
            <div>
              <Select
                label="Budget Type"
                options={[
                  { label: "Contingency", value: "CONTINGENCY" },
                  { label: "Opex", value: "OPEX" },
                  { label: "Capex", value: "CAPEX" },
                  { label: "Overhead", value: "OVERHEAD" },
                ]}
                value={project?.budgetType as string}
                onChange={(value) => {
                  dispatch(
                    actions.updateProject({
                      id: project?.id as string,
                      budgetType: value as PmBudgetTypeInput,
                    })
                  );
                }}
              />
            </div>
            <div>
              <Select
                label="Currency"
                options={[
                  { label: "DAI", value: "DAI" },
                  { label: "USDS", value: "USDS" },
                  { label: "EUR", value: "EUR" },
                  { label: "USD", value: "USD" },
                ]}
                value={project?.currency as string}
                onChange={(value) => {
                  dispatch(
                    actions.updateProject({
                      id: project?.id as string,
                      currency: value as PmCurrencyInput,
                    })
                  );
                }}
              />
            </div>
            <div>
              <NumberInput
                name="budget"
                label="Budget"
                value={parseFloat(budget.toFixed(2))}
                disabled={true}
                onChange={(e) => setBudget(e.target.value as any)}
                numericType="NonNegativeFloat"
                onBlur={(e) => {
                  if (!project) return;
                  dispatch(
                    actions.updateProject({
                      id: project.id,
                      budget: parseFloat(e.target.value),
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
            <label className="text-sm font-medium text-gray-700 mb-2">
              Deliverables
            </label>
            <ObjectSetTable
              columns={columns}
              data={projectDeliverables}
              allowRowSelection={true}
              onAdd={(data) => {
                if (data.title) {
                  if (!project) return;
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
                      projectId: project.id,
                      deliverableId: deliverableId,
                    })
                  );
                }
                if (data.owner) {
                  if (!project) return;
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
                      projectId: project.id,
                      deliverableId: deliverableId,
                    })
                  );
                }
              }}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Project;

const ProgressBar = ({ progress }: { progress: any }) => {
  if (!progress) {
    return (
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className="bg-gray-300 h-2 rounded-full"
          style={{ width: "0%" }}
        ></div>
      </div>
    );
  }

  // Case 1: Binary progress {completed: boolean}
  if ("completed" in progress && typeof progress.completed === "boolean") {
    const percentage = progress.completed ? 100 : 0;
    const bgColor = progress.completed ? "bg-green-500" : "bg-gray-300";
    return (
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className={`${bgColor} h-2 rounded-full transition-all duration-300`}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    );
  }

  // Case 2: Percentage progress {value: number}
  if ("value" in progress && typeof progress.value === "number") {
    const percentage = Math.min(Math.max(progress.value, 0), 100);
    const bgColor =
      percentage >= 100
        ? "bg-green-500"
        : percentage >= 50
          ? "bg-yellow-500"
          : "bg-blue-500";
    return (
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className={`${bgColor} h-2 rounded-full transition-all duration-300`}
          style={{ width: `${percentage}%` }}
        ></div>
        <div className="text-xs text-gray-600 mt-1">
          {percentage.toFixed(1)}%
        </div>
      </div>
    );
  }

  // Case 3: Story points progress {completed: number, total: number}
  if (
    "completed" in progress &&
    "total" in progress &&
    typeof progress.completed === "number" &&
    typeof progress.total === "number"
  ) {
    const percentage =
      progress.total > 0 ? (progress.completed / progress.total) * 100 : 0;
    const bgColor =
      percentage >= 100
        ? "bg-green-500"
        : percentage >= 50
          ? "bg-yellow-500"
          : "bg-blue-500";
    return (
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className={`${bgColor} h-2 rounded-full transition-all duration-300`}
          style={{ width: `${percentage}%` }}
        ></div>
        <div className="text-xs text-gray-600 mt-1">
          {progress.completed}/{progress.total} SP
        </div>
      </div>
    );
  }

  // Fallback for unknown progress type
  return (
    <div className="w-full bg-gray-200 rounded-full h-2">
      <div
        className="bg-gray-300 h-2 rounded-full"
        style={{ width: "0%" }}
      ></div>
    </div>
  );
};
