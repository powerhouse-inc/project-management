import { z } from "zod";
import type {
  AddAgentInput,
  AddCoordinatorInput,
  AddDeliverableInSetInput,
  AddDeliverableInput,
  AddKeyResultInput,
  AddMilestoneInput,
  AddRoadmapInput,
  Agent,
  AgentType,
  AgentTypeInput,
  Binary,
  BinaryInput,
  Deliverable,
  DeliverableSetStatus,
  DeliverableSetStatusInput,
  DeliverableStatus,
  DeliverableStatusInput,
  DeliverablesCompleted,
  DeliverablesCompletedInput,
  DeliverablesSet,
  EditAgentInput,
  EditDeliverableInput,
  EditDeliverablesSetInput,
  EditMilestoneInput,
  EditRoadmapInput,
  EditScopeOfWorkInput,
  KeyResult,
  Milestone,
  Percentage,
  PercentageInput,
  ProgressInput,
  RemoveAgentInput,
  RemoveCoordinatorInput,
  RemoveDeliverableInSetInput,
  RemoveDeliverableInput,
  RemoveKeyResultInput,
  RemoveMilestoneInput,
  RemoveRoadmapInput,
  Roadmap,
  ScopeOfWorkState,
  ScopeOfWorkStatus,
  ScopeOfWorkStatusInput,
  SetDeliverableProgressInput,
  SetProgressInDeliverablesSetInput,
  StoryPoint,
  StoryPointInput,
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

export const DeliverableStatusInputSchema = z.enum([
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
  "DRAFT",
  "REJECTED",
  "SUBMITTED",
]);

export const ScopeOfWorkStatusInputSchema = z.enum([
  "APPROVED",
  "CANCELED",
  "DRAFT",
  "REJECTED",
  "SUBMITTED",
]);

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
    milestoneId: z.string(),
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
    status: z.lazy(() => DeliverableStatusInputSchema.nullish()),
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
    estimatedBudgetCap: z.string().nullish(),
    id: z.string(),
    roadmapId: z.string(),
    sequenceCode: z.string().nullish(),
    title: z.string().nullish(),
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
    isBinary: z.boolean().nullable(),
  });
}

export function BinaryInputSchema(): z.ZodObject<Properties<BinaryInput>> {
  return z.object({
    isBinary: z.boolean(),
  });
}

export function DeliverableSchema(): z.ZodObject<Properties<Deliverable>> {
  return z.object({
    __typename: z.literal("Deliverable").optional(),
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
    __typename: z.literal("DeliverablesCompletedInput").optional(),
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
    status: z.lazy(() => DeliverableStatusInputSchema.nullish()),
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
    milestoneId: z.string(),
    status: z.lazy(() => DeliverableSetStatusInputSchema.nullish()),
  });
}

export function EditMilestoneInputSchema(): z.ZodObject<
  Properties<EditMilestoneInput>
> {
  return z.object({
    deliveryTarget: z.string().nullish(),
    description: z.string().nullish(),
    estimatedBudgetCap: z.string().nullish(),
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
    coordinators: z.array(z.string()),
    deliveryTarget: z.string(),
    description: z.string(),
    estimatedBudgetCap: z.string(),
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

export function PercentageInputSchema(): z.ZodObject<
  Properties<PercentageInput>
> {
  return z.object({
    value: z.number(),
  });
}

export function ProgressSchema() {
  return z.union([BinarySchema(), PercentageSchema(), StoryPointSchema()]);
}

export function ProgressInputSchema(): z.ZodObject<Properties<ProgressInput>> {
  return z.object({
    __typename: z.literal("ProgressInput").optional(),
    binary: z.lazy(() => BinaryInputSchema().nullable()),
    percentage: z.lazy(() => PercentageInputSchema().nullable()),
    storyPoint: z.lazy(() => StoryPointInputSchema().nullable()),
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
    milestoneId: z.string(),
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
    roadmaps: z.array(RoadmapSchema()),
    status: ScopeOfWorkStatusSchema,
    title: z.string(),
  });
}

export function SetDeliverableProgressInputSchema(): z.ZodObject<
  Properties<SetDeliverableProgressInput>
> {
  return z.object({
    id: z.string(),
    workProgress: z.lazy(() => ProgressInputSchema()),
  });
}

export function SetProgressInDeliverablesSetInputSchema(): z.ZodObject<
  Properties<SetProgressInDeliverablesSetInput>
> {
  return z.object({
    milestoneId: z.string(),
    progress: z.lazy(() => ProgressInputSchema()),
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
