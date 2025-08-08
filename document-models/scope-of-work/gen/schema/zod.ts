import { z } from "zod";
import type {
  AddAgentInput,
  AddCoordinatorInput,
  AddDeliverableInSetInput,
  AddDeliverableInput,
  AddKeyResultInput,
  AddMilestoneInput,
  AddProjectInput,
  AddRoadmapInput,
  Agent,
  AgentType,
  AgentTypeInput,
  Binary,
  BudgetAnchorProject,
  BudgetExpenditure,
  BudgetType,
  Deliverable,
  DeliverableSetStatus,
  DeliverableSetStatusInput,
  DeliverableStatus,
  DeliverablesCompleted,
  DeliverablesCompletedInput,
  DeliverablesSet,
  EditAgentInput,
  EditDeliverableInput,
  EditDeliverablesSetInput,
  EditKeyResultInput,
  EditMilestoneInput,
  EditRoadmapInput,
  EditScopeOfWorkInput,
  KeyResult,
  Milestone,
  PmBudgetTypeInput,
  PmCurrency,
  PmCurrencyInput,
  PmDeliverableStatusInput,
  Percentage,
  ProgressInput,
  Project,
  RemoveAgentInput,
  RemoveCoordinatorInput,
  RemoveDeliverableInSetInput,
  RemoveDeliverableInput,
  RemoveKeyResultInput,
  RemoveMilestoneInput,
  RemoveProjectInput,
  RemoveRoadmapInput,
  Roadmap,
  ScopeOfWorkState,
  ScopeOfWorkStatus,
  ScopeOfWorkStatusInput,
  SetDeliverableBudgetAnchorProjectInput,
  SetDeliverableProgressInput,
  SetProjectMarginInput,
  SetProjectTotalBudgetInput,
  StoryPoint,
  StoryPointInput,
  Unit,
  UpdateProjectInput,
  UpdateProjectOwnerInput,
} from "./types.js";

type Properties<T> = Required<{
  [K in keyof T]: z.ZodType<T[K], any, T[K]>;
}>;

type definedNonNullAny = {};

export const isDefinedNonNullAny = (v: any): v is definedNonNullAny =>
  v !== undefined && v !== null;

export const definedNonNullAnySchema = z
  .any()
  .refine((v) => isDefinedNonNullAny(v));

export const AgentTypeSchema = z.enum(["AI", "GROUP", "HUMAN"]);

export const AgentTypeInputSchema = z.enum(["AI", "GROUP", "HUMAN"]);

export const BudgetTypeSchema = z.enum([
  "CAPEX",
  "CONTINGENCY",
  "OPEX",
  "OVERHEAD",
]);

export const DeliverableSetStatusSchema = z.enum([
  "CANCELED",
  "DRAFT",
  "FINISHED",
  "IN_PROGRESS",
  "TODO",
]);

export const DeliverableSetStatusInputSchema = z.enum([
  "CANCELED",
  "DRAFT",
  "FINISHED",
  "IN_PROGRESS",
  "TODO",
]);

export const DeliverableStatusSchema = z.enum([
  "BLOCKED",
  "CANCELED",
  "DELIVERED",
  "DRAFT",
  "IN_PROGRESS",
  "TODO",
  "WONT_DO",
]);

export const PmBudgetTypeInputSchema = z.enum([
  "CAPEX",
  "CONTINGENCY",
  "OPEX",
  "OVERHEAD",
]);

export const PmCurrencySchema = z.enum(["DAI", "EUR", "USD", "USDS"]);

export const PmCurrencyInputSchema = z.enum(["DAI", "EUR", "USD", "USDS"]);

export const PmDeliverableStatusInputSchema = z.enum([
  "BLOCKED",
  "CANCELED",
  "DELIVERED",
  "DRAFT",
  "IN_PROGRESS",
  "TODO",
  "WONT_DO",
]);

export const ScopeOfWorkStatusSchema = z.enum([
  "APPROVED",
  "CANCELED",
  "DELIVERED",
  "DRAFT",
  "IN_PROGRESS",
  "REJECTED",
  "SUBMITTED",
]);

export const ScopeOfWorkStatusInputSchema = z.enum([
  "APPROVED",
  "CANCELED",
  "DELIVERED",
  "DRAFT",
  "IN_PROGRESS",
  "REJECTED",
  "SUBMITTED",
]);

export const UnitSchema = z.enum(["Hours", "StoryPoints"]);

export function AddAgentInputSchema(): z.ZodObject<Properties<AddAgentInput>> {
  return z.object({
    agentType: z.lazy(() => AgentTypeInputSchema.nullish()),
    code: z.string().nullish(),
    id: z.string(),
    imageUrl: z.string().nullish(),
    name: z.string(),
  });
}

export function AddCoordinatorInputSchema(): z.ZodObject<
  Properties<AddCoordinatorInput>
> {
  return z.object({
    id: z.string(),
    milestoneId: z.string(),
  });
}

export function AddDeliverableInSetInputSchema(): z.ZodObject<
  Properties<AddDeliverableInSetInput>
> {
  return z.object({
    deliverableId: z.string(),
    milestoneId: z.string().nullish(),
    projectId: z.string().nullish(),
  });
}

export function AddDeliverableInputSchema(): z.ZodObject<
  Properties<AddDeliverableInput>
> {
  return z.object({
    code: z.string().nullish(),
    description: z.string().nullish(),
    id: z.string(),
    owner: z.string().nullish(),
    status: z.lazy(() => PmDeliverableStatusInputSchema.nullish()),
    title: z.string().nullish(),
  });
}

export function AddKeyResultInputSchema(): z.ZodObject<
  Properties<AddKeyResultInput>
> {
  return z.object({
    deliverableId: z.string(),
    id: z.string(),
    link: z.string().nullish(),
    title: z.string(),
  });
}

export function AddMilestoneInputSchema(): z.ZodObject<
  Properties<AddMilestoneInput>
> {
  return z.object({
    deliveryTarget: z.string().nullish(),
    description: z.string().nullish(),
    id: z.string(),
    roadmapId: z.string(),
    sequenceCode: z.string().nullish(),
    title: z.string().nullish(),
  });
}

export function AddProjectInputSchema(): z.ZodObject<
  Properties<AddProjectInput>
> {
  return z.object({
    abstract: z.string().nullish(),
    budget: z.number().nullish(),
    budgetType: z.lazy(() => PmBudgetTypeInputSchema.nullish()),
    code: z.string(),
    currency: z.lazy(() => PmCurrencyInputSchema.nullish()),
    id: z.string(),
    imageUrl: z.string().url().nullish(),
    projectOwner: z.string().nullish(),
    title: z.string(),
  });
}

export function AddRoadmapInputSchema(): z.ZodObject<
  Properties<AddRoadmapInput>
> {
  return z.object({
    description: z.string().nullish(),
    id: z.string(),
    slug: z.string().nullish(),
    title: z.string(),
  });
}

export function AgentSchema(): z.ZodObject<Properties<Agent>> {
  return z.object({
    __typename: z.literal("Agent").optional(),
    agentType: AgentTypeSchema,
    code: z.string(),
    id: z.string(),
    imageUrl: z.string().nullable(),
    name: z.string(),
  });
}

export function BinarySchema(): z.ZodObject<Properties<Binary>> {
  return z.object({
    __typename: z.literal("Binary").optional(),
    completed: z.boolean().nullable(),
  });
}

export function BudgetAnchorProjectSchema(): z.ZodObject<
  Properties<BudgetAnchorProject>
> {
  return z.object({
    __typename: z.literal("BudgetAnchorProject").optional(),
    margin: z.number(),
    project: z.string().nullable(),
    quantity: z.number(),
    unit: UnitSchema.nullable(),
    unitCost: z.number(),
  });
}

export function BudgetExpenditureSchema(): z.ZodObject<
  Properties<BudgetExpenditure>
> {
  return z.object({
    __typename: z.literal("BudgetExpenditure").optional(),
    actuals: z.number(),
    cap: z.number(),
    percentage: z.number(),
  });
}

export function DeliverableSchema(): z.ZodObject<Properties<Deliverable>> {
  return z.object({
    __typename: z.literal("Deliverable").optional(),
    budgetAnchor: BudgetAnchorProjectSchema().nullable(),
    code: z.string(),
    description: z.string(),
    id: z.string(),
    keyResults: z.array(KeyResultSchema()),
    owner: z.string().nullable(),
    status: DeliverableStatusSchema,
    title: z.string(),
    workProgress: ProgressSchema().nullable(),
  });
}

export function DeliverablesCompletedSchema(): z.ZodObject<
  Properties<DeliverablesCompleted>
> {
  return z.object({
    __typename: z.literal("DeliverablesCompleted").optional(),
    completed: z.number(),
    total: z.number(),
  });
}

export function DeliverablesCompletedInputSchema(): z.ZodObject<
  Properties<DeliverablesCompletedInput>
> {
  return z.object({
    completed: z.number(),
    total: z.number(),
  });
}

export function DeliverablesSetSchema(): z.ZodObject<
  Properties<DeliverablesSet>
> {
  return z.object({
    __typename: z.literal("DeliverablesSet").optional(),
    deliverables: z.array(z.string()),
    deliverablesCompleted: DeliverablesCompletedSchema(),
    progress: ProgressSchema(),
    status: DeliverableSetStatusSchema,
  });
}

export function EditAgentInputSchema(): z.ZodObject<
  Properties<EditAgentInput>
> {
  return z.object({
    agentType: z.lazy(() => AgentTypeInputSchema.nullish()),
    code: z.string().nullish(),
    id: z.string(),
    imageUrl: z.string().nullish(),
    name: z.string().nullish(),
  });
}

export function EditDeliverableInputSchema(): z.ZodObject<
  Properties<EditDeliverableInput>
> {
  return z.object({
    code: z.string().nullish(),
    description: z.string().nullish(),
    id: z.string(),
    owner: z.string().nullish(),
    status: z.lazy(() => PmDeliverableStatusInputSchema.nullish()),
    title: z.string().nullish(),
  });
}

export function EditDeliverablesSetInputSchema(): z.ZodObject<
  Properties<EditDeliverablesSetInput>
> {
  return z.object({
    deliverablesCompleted: z.lazy(() =>
      DeliverablesCompletedInputSchema().nullish(),
    ),
    milestoneId: z.string().nullish(),
    projectId: z.string().nullish(),
    status: z.lazy(() => DeliverableSetStatusInputSchema.nullish()),
  });
}

export function EditKeyResultInputSchema(): z.ZodObject<
  Properties<EditKeyResultInput>
> {
  return z.object({
    deliverableId: z.string(),
    id: z.string(),
    link: z.string().url().nullish(),
    title: z.string().nullish(),
  });
}

export function EditMilestoneInputSchema(): z.ZodObject<
  Properties<EditMilestoneInput>
> {
  return z.object({
    deliveryTarget: z.string().nullish(),
    description: z.string().nullish(),
    id: z.string(),
    roadmapId: z.string(),
    sequenceCode: z.string().nullish(),
    title: z.string().nullish(),
  });
}

export function EditRoadmapInputSchema(): z.ZodObject<
  Properties<EditRoadmapInput>
> {
  return z.object({
    description: z.string().nullish(),
    id: z.string(),
    slug: z.string().nullish(),
    title: z.string().nullish(),
  });
}

export function EditScopeOfWorkInputSchema(): z.ZodObject<
  Properties<EditScopeOfWorkInput>
> {
  return z.object({
    description: z.string().nullish(),
    status: z.lazy(() => ScopeOfWorkStatusInputSchema.nullish()),
    title: z.string().nullish(),
  });
}

export function KeyResultSchema(): z.ZodObject<Properties<KeyResult>> {
  return z.object({
    __typename: z.literal("KeyResult").optional(),
    id: z.string(),
    link: z.string(),
    title: z.string(),
  });
}

export function MilestoneSchema(): z.ZodObject<Properties<Milestone>> {
  return z.object({
    __typename: z.literal("Milestone").optional(),
    budget: z.number().nullable(),
    coordinators: z.array(z.string()),
    deliveryTarget: z.string(),
    description: z.string(),
    id: z.string(),
    scope: DeliverablesSetSchema().nullable(),
    sequenceCode: z.string(),
    title: z.string(),
  });
}

export function PercentageSchema(): z.ZodObject<Properties<Percentage>> {
  return z.object({
    __typename: z.literal("Percentage").optional(),
    value: z.number(),
  });
}

export function ProgressSchema() {
  return z.union([BinarySchema(), PercentageSchema(), StoryPointSchema()]);
}

export function ProgressInputSchema(): z.ZodObject<Properties<ProgressInput>> {
  return z.object({
    completed: z.boolean().nullish(),
    percentage: z.number().nullish(),
    storyPoints: z.lazy(() => StoryPointInputSchema().nullish()),
  });
}

export function ProjectSchema(): z.ZodObject<Properties<Project>> {
  return z.object({
    __typename: z.literal("Project").optional(),
    abstract: z.string().nullable(),
    budget: z.number().nullable(),
    budgetType: BudgetTypeSchema.nullable(),
    code: z.string(),
    currency: PmCurrencySchema.nullable(),
    expenditure: BudgetExpenditureSchema().nullable(),
    id: z.string(),
    imageUrl: z.string().url().nullable(),
    projectOwner: z.string().nullable(),
    scope: DeliverablesSetSchema().nullable(),
    title: z.string(),
  });
}

export function RemoveAgentInputSchema(): z.ZodObject<
  Properties<RemoveAgentInput>
> {
  return z.object({
    id: z.string(),
  });
}

export function RemoveCoordinatorInputSchema(): z.ZodObject<
  Properties<RemoveCoordinatorInput>
> {
  return z.object({
    id: z.string(),
    milestoneId: z.string(),
  });
}

export function RemoveDeliverableInSetInputSchema(): z.ZodObject<
  Properties<RemoveDeliverableInSetInput>
> {
  return z.object({
    deliverableId: z.string(),
    milestoneId: z.string().nullish(),
    projectId: z.string().nullish(),
  });
}

export function RemoveDeliverableInputSchema(): z.ZodObject<
  Properties<RemoveDeliverableInput>
> {
  return z.object({
    id: z.string(),
  });
}

export function RemoveKeyResultInputSchema(): z.ZodObject<
  Properties<RemoveKeyResultInput>
> {
  return z.object({
    deliverableId: z.string(),
    id: z.string(),
  });
}

export function RemoveMilestoneInputSchema(): z.ZodObject<
  Properties<RemoveMilestoneInput>
> {
  return z.object({
    id: z.string(),
    roadmapId: z.string(),
  });
}

export function RemoveProjectInputSchema(): z.ZodObject<
  Properties<RemoveProjectInput>
> {
  return z.object({
    projectId: z.string(),
  });
}

export function RemoveRoadmapInputSchema(): z.ZodObject<
  Properties<RemoveRoadmapInput>
> {
  return z.object({
    id: z.string(),
  });
}

export function RoadmapSchema(): z.ZodObject<Properties<Roadmap>> {
  return z.object({
    __typename: z.literal("Roadmap").optional(),
    description: z.string(),
    id: z.string(),
    milestones: z.array(MilestoneSchema()),
    slug: z.string(),
    title: z.string(),
  });
}

export function ScopeOfWorkStateSchema(): z.ZodObject<
  Properties<ScopeOfWorkState>
> {
  return z.object({
    __typename: z.literal("ScopeOfWorkState").optional(),
    agents: z.array(AgentSchema()),
    deliverables: z.array(DeliverableSchema()),
    description: z.string(),
    projects: z.array(ProjectSchema()),
    roadmaps: z.array(RoadmapSchema()),
    status: ScopeOfWorkStatusSchema,
    title: z.string(),
  });
}

export function SetDeliverableBudgetAnchorProjectInputSchema(): z.ZodObject<
  Properties<SetDeliverableBudgetAnchorProjectInput>
> {
  return z.object({
    deliverableId: z.string(),
    margin: z.number().nullish(),
    project: z.string().nullish(),
    quantity: z.number().nullish(),
    unit: UnitSchema.nullish(),
    unitCost: z.number().nullish(),
  });
}

export function SetDeliverableProgressInputSchema(): z.ZodObject<
  Properties<SetDeliverableProgressInput>
> {
  return z.object({
    id: z.string(),
    workProgress: z.lazy(() => ProgressInputSchema().nullish()),
  });
}

export function SetProjectMarginInputSchema(): z.ZodObject<
  Properties<SetProjectMarginInput>
> {
  return z.object({
    margin: z.number(),
    projectId: z.string(),
  });
}

export function SetProjectTotalBudgetInputSchema(): z.ZodObject<
  Properties<SetProjectTotalBudgetInput>
> {
  return z.object({
    projectId: z.string(),
    totalBudget: z.number(),
  });
}

export function StoryPointSchema(): z.ZodObject<Properties<StoryPoint>> {
  return z.object({
    __typename: z.literal("StoryPoint").optional(),
    completed: z.number(),
    total: z.number(),
  });
}

export function StoryPointInputSchema(): z.ZodObject<
  Properties<StoryPointInput>
> {
  return z.object({
    completed: z.number(),
    total: z.number(),
  });
}

export function UpdateProjectInputSchema(): z.ZodObject<
  Properties<UpdateProjectInput>
> {
  return z.object({
    abstract: z.string().nullish(),
    budget: z.number().nullish(),
    budgetType: z.lazy(() => PmBudgetTypeInputSchema.nullish()),
    code: z.string().nullish(),
    currency: z.lazy(() => PmCurrencyInputSchema.nullish()),
    id: z.string(),
    imageUrl: z.string().url().nullish(),
    title: z.string().nullish(),
  });
}

export function UpdateProjectOwnerInputSchema(): z.ZodObject<
  Properties<UpdateProjectOwnerInput>
> {
  return z.object({
    id: z.string(),
    projectOwner: z.string(),
  });
}
