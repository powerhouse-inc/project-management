import {
  Deliverable,
  type Project,
  type PmBudgetTypeInput,
  PmCurrencyInput,
  Agent,
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
import ProgressBar from "../components/progressBar.js";

interface ProjectProps {
  project: Project | undefined;
  dispatch: any;
  deliverables: Deliverable[];
  setActiveNodeId: (id: string) => void;
  contributors: Agent[];
}

const Project: React.FC<ProjectProps> = ({
  project,
  dispatch,
  deliverables,
  setActiveNodeId,
  contributors,
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
    setCode(project?.code || "");
    setBudget(project?.budget || 0);
    setTitle(project?.title || "");
    setProjectOwner(project?.projectOwner || "");
    setImageUrl(project?.imageUrl || "");
    setProjectAbstract(project?.abstract || "");
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
          if (!context.row?.id) return null;
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
          const progress = context.row?.workProgress || null;
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
                  if (e.target.value === project.projectOwner) return;
                  dispatch(
                    actions.updateProjectOwner({
                      id: project.id,
                      projectOwner: e.target.value,
                    })
                  );
                }}
              >
                <AIDField
                  className="w-full"
                  label="Project Owner"
                  name="projectOwner"
                  value={projectOwner}
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
                  onChange={(e) => setProjectOwner(e)}
                  variant="withValueAndTitle"
                  onBlur={(e) => {
                    if (!project) return;
                    if (e.target.value === project.projectOwner) return;
                    dispatch(
                      actions.updateProjectOwner({
                        id: project.id,
                        projectOwner: e.target.value,
                      })
                    );
                  }}
                  fetchOptionsCallback={async (userInput: string) => {
                    const contributorsFilter = contributors.filter((c) =>
                      c.name.toLowerCase().includes(userInput.toLowerCase())
                    );
                    console.log("contributorsFilter", contributorsFilter);
                    if(contributorsFilter.length === 0) {
                      return Promise.reject(new Error("No contributors found"));
                    }
                    return contributorsFilter.map((c) => ({
                      value: c.id,
                      title: c.name,
                      agentType: c.agentType,
                      path: {
                        text: 'Link',
                        url: "https://powerhouse.inc",
                      },
                      description: " ",
                      icon: "Person",
                    }));
                  }}
                  fetchSelectedOptionCallback={async (agentId) => {
                    console.log("agentId", agentId);
                    const agent = contributors.find((c) => c.id === agentId);
                    if (!agent) return Promise.reject(new Error("Agent not found"));
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
              onDelete={(data: any) => {
                if (!project) return;
                if (data.length > 0) {
                  data.forEach((d: any) => {
                    dispatch(
                      actions.removeProjectDeliverable({
                        projectId: project?.id,
                        deliverableId: d.id,
                      })
                    );
                  });
                }
              }}
              onAdd={(data) => {
                if (data.title) {
                  if (!project) return;
                  const deliverableId = generateId();
                  dispatch(
                    actions.addProjectDeliverable({
                      projectId: project.id,
                      deliverableId: deliverableId,
                      title: data.title as string,
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
