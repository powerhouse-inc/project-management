import { useMemo, useEffect } from "react";
import { Icon } from "@powerhousedao/design-system";
import {
  Project,
  Deliverable,
  actions,
  PmCurrencyInput,
} from "../../../document-models/scope-of-work/index.js";
import { useState } from "react";
import {
  Select,
  ObjectSetTable,
  ColumnDef,
  ColumnAlignment,
  Button,
} from "@powerhousedao/document-engineering";

interface BudgetCalculatorProps {
  setBudgetCalculatorOpen?: (open: boolean) => void;
  project?: Project;
  deliverables?: Deliverable[];
  dispatch?: any;
}

const BudgetCalculator = ({
  setBudgetCalculatorOpen,
  project,
  deliverables,
  dispatch,
}: BudgetCalculatorProps) => {
  const [budget, setBudget] = useState(0);
  const [margin, setMargin] = useState(0);
  const [totalBudget, setTotalBudget] = useState(0);

  useEffect(() => {
    const margin = deliverables?.map(
      (deliverable) => deliverable.budgetAnchor?.margin
    );
    if (margin && margin.every((m) => m === margin[0])) {
      setMargin(margin[0] ?? 0);
    } else {
      setMargin(0);
    }
  }, [deliverables]);

  useEffect(() => {
    const getTotalBudget = () => {
      const subtotal = richDeliverables?.reduce(
        (acc, deliverable) => acc + deliverable.subtotal,
        0
      ) as number;
      const total = subtotal * (1 + margin / 100);
      return isNaN(total) ? "0" : total.toFixed(2);
    };
    setTotalBudget(parseFloat(getTotalBudget()));
  }, [deliverables, margin]);

  const richDeliverables = deliverables?.map((deliverable) => ({
    ...deliverable,
    quantity: deliverable.budgetAnchor?.quantity ?? 0,
    unitCost: deliverable.budgetAnchor?.unitCost ?? 0,
    subtotal:
      (deliverable.budgetAnchor?.quantity ?? 0) *
      (deliverable.budgetAnchor?.unitCost ?? 0),
  }));

  const columns = useMemo<Array<ColumnDef<any>>>(
    () => [
      {
        field: "title",
        title: "Deliverable Title",
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
        field: "quantity",
        title: "Quantity",
        editable: true,
        align: "center" as ColumnAlignment,
        onSave: (newValue: any, context: any) => {
          if (newValue !== context.row.title) {
            dispatch(
              actions.setDeliverableBudgetAnchorProject({
                deliverableId: context.row.id,
                project: project!.id,
                quantity: parseFloat(newValue),
              })
            );
            return true;
          }
          return false;
        },
      },
      {
        field: "unitCost",
        title: "Unit Cost",
        editable: true,
        align: "center" as ColumnAlignment,
        onSave: (newValue: any, context: any) => {
          if (newValue !== context.row.title) {
            dispatch(
              actions.setDeliverableBudgetAnchorProject({
                deliverableId: context.row.id,
                project: project!.id,
                unitCost: parseFloat(newValue),
              })
            );
            return true;
          }
          return false;
        },
      },
      {
        field: "subtotal",
        title: "Subtotal",
        editable: false,
        align: "center" as ColumnAlignment,
      },
    ],
    []
  );

  return (
    <div className="border border-gray-300 p-4 rounded-md">
      <div className="flex justify-between items-center">
        <h3 className="text-2xl font-bold">Budget Calculator</h3>
        <div>
          Project:{" "}
          <span className="border border-gray-300 rounded-md p-2 bg-white">
            {project?.title}
          </span>
        </div>
        <div className="flex items-center gap-2">
          Currency:
          <Select
            className="w-[100px]"
            options={[
              { label: "DAI", value: "DAI" },
              { label: "USDS", value: "USDS" },
              { label: "EUR", value: "EUR" },
              { label: "USD", value: "USD" },
            ]}
            defaultValue={project?.currency ?? "DAI"}
            onChange={(value) => {
              dispatch(
                actions.updateProject({
                  id: project!.id,
                  currency: value as PmCurrencyInput,
                })
              );
            }}
          />
        </div>
        <Icon
          className="cursor-pointer bg-gray-200 rounded-full p-1 hover:bg-gray-300"
          name="BaseArrowLeft"
          onClick={() => setBudgetCalculatorOpen?.(false)}
        />
      </div>
      <div className="my-8">
        <ObjectSetTable
          columns={columns}
          data={richDeliverables ?? []}
          allowRowSelection={true}
        />
      </div>
      {/* <div className="flex justify-end items-center gap-2"> */}
      <div className="flex justify-end items-center gap-4">
        <span>Total Cost:</span>
        <div className="w-[100px] h-8 bg-gray-100 border border-gray-300 rounded px-2 flex items-center justify-center">
          {richDeliverables?.reduce(
            (acc, deliverable) => acc + deliverable.subtotal,
            0
          ) || 0}
        </div>
      </div>
      <div className="flex justify-end items-center gap-4">
        <span>Project Margin:</span>
        <div className="w-[100px] flex justify-end mt-2">
          <input
            type="number"
            className="w-[100px] h-8 border border-gray-300 rounded px-2 text-center"
            value={margin}
            onChange={(e) => {
              setMargin(parseFloat(e.target.value));
            }}
            onBlur={() => {
              if (margin) {
                deliverables?.forEach((deliverable) => {
                  dispatch(
                    actions.setDeliverableBudgetAnchorProject({
                      deliverableId: deliverable.id,
                      project: project!.id,
                      margin: margin,
                    })
                  );
                });
                dispatch(
                  actions.updateProject({
                    id: project!.id,
                    budget: totalBudget,
                  })
                );
              }
            }}
          />
        </div>
      </div>
      <div className="flex justify-end items-center gap-4">
        <span>Total Budget:</span>
        <div className="w-[100px] h-8 border border-gray-300 rounded px-2 flex items-center justify-center">
          {totalBudget}
        </div>
      </div>
    </div>
    // </div>
  );
};

export default BudgetCalculator;
