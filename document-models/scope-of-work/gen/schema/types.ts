export type Maybe<T> = T | null;
export type InputMaybe<T> = T | null | undefined;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T,
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never;
    };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  Amount: {
    input: { unit?: string; value?: number };
    output: { unit?: string; value?: number };
  };
  Amount_Crypto: {
    input: { unit: string; value: string };
    output: { unit: string; value: string };
  };
  Amount_Currency: {
    input: { unit: string; value: string };
    output: { unit: string; value: string };
  };
  Amount_Fiat: {
    input: { unit: string; value: number };
    output: { unit: string; value: number };
  };
  Amount_Money: { input: number; output: number };
  Amount_Percentage: { input: number; output: number };
  Amount_Tokens: { input: number; output: number };
  Currency: { input: string; output: string };
  Date: { input: string; output: string };
  DateTime: { input: string; output: string };
  EmailAddress: { input: string; output: string };
  EthereumAddress: { input: string; output: string };
  OID: { input: string; output: string };
  OLabel: { input: string; output: string };
  PHID: { input: string; output: string };
  URL: { input: string; output: string };
};

export type AddAgentInput = {
  agentType?: InputMaybe<AgentTypeInput | `${AgentTypeInput}`>;
  code?: InputMaybe<Scalars["String"]["input"]>;
  id: Scalars["ID"]["input"];
  imageUrl?: InputMaybe<Scalars["String"]["input"]>;
  name: Scalars["String"]["input"];
};

export type AddCoordinatorInput = {
  id: Scalars["ID"]["input"];
  milestoneId: Scalars["OID"]["input"];
};

export type AddDeliverableInSetInput = {
  deliverableId: Scalars["OID"]["input"];
  milestoneId: Scalars["ID"]["input"];
};

export type AddDeliverableInput = {
  code?: InputMaybe<Scalars["String"]["input"]>;
  description?: InputMaybe<Scalars["String"]["input"]>;
  id: Scalars["OID"]["input"];
  owner?: InputMaybe<Scalars["ID"]["input"]>;
  status?: InputMaybe<PmDeliverableStatusInput | `${PmDeliverableStatusInput}`>;
  title?: InputMaybe<Scalars["String"]["input"]>;
};

export type AddKeyResultInput = {
  deliverableId: Scalars["OID"]["input"];
  id: Scalars["OID"]["input"];
  link?: InputMaybe<Scalars["String"]["input"]>;
  title: Scalars["String"]["input"];
};

export type AddMilestoneInput = {
  deliveryTarget?: InputMaybe<Scalars["String"]["input"]>;
  description?: InputMaybe<Scalars["String"]["input"]>;
  estimatedBudgetCap?: InputMaybe<Scalars["String"]["input"]>;
  id: Scalars["OID"]["input"];
  roadmapId: Scalars["OID"]["input"];
  sequenceCode?: InputMaybe<Scalars["String"]["input"]>;
  title?: InputMaybe<Scalars["String"]["input"]>;
};

export type AddRoadmapInput = {
  description?: InputMaybe<Scalars["String"]["input"]>;
  id: Scalars["OID"]["input"];
  slug?: InputMaybe<Scalars["String"]["input"]>;
  title: Scalars["String"]["input"];
};

export type Agent = {
  agentType: AgentType | `${AgentType}`;
  code: Scalars["String"]["output"];
  id: Scalars["ID"]["output"];
  imageUrl: Maybe<Scalars["String"]["output"]>;
  name: Scalars["String"]["output"];
};

export type AgentType = "AI" | "GROUP" | "HUMAN";

export type AgentTypeInput = "AI" | "GROUP" | "HUMAN";

export type Binary = {
  isBinary: Maybe<Scalars["Boolean"]["output"]>;
};

export type Deliverable = {
  code: Scalars["String"]["output"];
  description: Scalars["String"]["output"];
  id: Scalars["OID"]["output"];
  keyResults: Array<KeyResult>;
  owner: Maybe<Scalars["ID"]["output"]>;
  status: DeliverableStatus | `${DeliverableStatus}`;
  title: Scalars["String"]["output"];
  workProgress: Maybe<Progress>;
};

export type DeliverableSetStatus =
  | "CANCELED"
  | "DRAFT"
  | "FINISHED"
  | "IN_PROGRESS"
  | "TODO";

export type DeliverableSetStatusInput =
  | "CANCELED"
  | "DRAFT"
  | "FINISHED"
  | "IN_PROGRESS"
  | "TODO";

export type DeliverableStatus =
  | "BLOCKED"
  | "CANCELED"
  | "DELIVERED"
  | "DRAFT"
  | "IN_PROGRESS"
  | "TODO"
  | "WONT_DO";

export type DeliverablesCompleted = {
  completed: Scalars["Int"]["output"];
  total: Scalars["Int"]["output"];
};

export type DeliverablesCompletedInput = {
  completed: Scalars["Int"]["input"];
  total: Scalars["Int"]["input"];
};

export type DeliverablesSet = {
  deliverables: Array<Scalars["OID"]["output"]>;
  deliverablesCompleted: DeliverablesCompleted;
  progress: Progress;
  status: DeliverableSetStatus | `${DeliverableSetStatus}`;
};

export type EditAgentInput = {
  agentType?: InputMaybe<AgentTypeInput | `${AgentTypeInput}`>;
  code?: InputMaybe<Scalars["String"]["input"]>;
  id: Scalars["ID"]["input"];
  imageUrl?: InputMaybe<Scalars["String"]["input"]>;
  name?: InputMaybe<Scalars["String"]["input"]>;
};

export type EditDeliverableInput = {
  code?: InputMaybe<Scalars["String"]["input"]>;
  description?: InputMaybe<Scalars["String"]["input"]>;
  id: Scalars["OID"]["input"];
  owner?: InputMaybe<Scalars["ID"]["input"]>;
  status?: InputMaybe<PmDeliverableStatusInput | `${PmDeliverableStatusInput}`>;
  title?: InputMaybe<Scalars["String"]["input"]>;
};

export type EditDeliverablesSetInput = {
  deliverablesCompleted?: InputMaybe<DeliverablesCompletedInput>;
  milestoneId: Scalars["ID"]["input"];
  status?: InputMaybe<
    DeliverableSetStatusInput | `${DeliverableSetStatusInput}`
  >;
};

export type EditKeyResultInput = {
  deliverableId: Scalars["OID"]["input"];
  id: Scalars["OID"]["input"];
  link?: InputMaybe<Scalars["URL"]["input"]>;
  title?: InputMaybe<Scalars["String"]["input"]>;
};

export type EditMilestoneInput = {
  deliveryTarget?: InputMaybe<Scalars["String"]["input"]>;
  description?: InputMaybe<Scalars["String"]["input"]>;
  estimatedBudgetCap?: InputMaybe<Scalars["String"]["input"]>;
  id: Scalars["OID"]["input"];
  roadmapId: Scalars["OID"]["input"];
  sequenceCode?: InputMaybe<Scalars["String"]["input"]>;
  title?: InputMaybe<Scalars["String"]["input"]>;
};

export type EditRoadmapInput = {
  description?: InputMaybe<Scalars["String"]["input"]>;
  id: Scalars["OID"]["input"];
  slug?: InputMaybe<Scalars["String"]["input"]>;
  title?: InputMaybe<Scalars["String"]["input"]>;
};

export type EditScopeOfWorkInput = {
  description?: InputMaybe<Scalars["String"]["input"]>;
  status?: InputMaybe<ScopeOfWorkStatusInput | `${ScopeOfWorkStatusInput}`>;
  title?: InputMaybe<Scalars["String"]["input"]>;
};

export type KeyResult = {
  id: Scalars["OID"]["output"];
  link: Scalars["String"]["output"];
  title: Scalars["String"]["output"];
};

export type Milestone = {
  coordinators: Array<Scalars["ID"]["output"]>;
  deliveryTarget: Scalars["String"]["output"];
  description: Scalars["String"]["output"];
  estimatedBudgetCap: Scalars["String"]["output"];
  id: Scalars["OID"]["output"];
  scope: Maybe<DeliverablesSet>;
  sequenceCode: Scalars["String"]["output"];
  title: Scalars["String"]["output"];
};

export type PmDeliverableStatusInput =
  | "BLOCKED"
  | "CANCELED"
  | "DELIVERED"
  | "DRAFT"
  | "IN_PROGRESS"
  | "TODO"
  | "WONT_DO";

export type Percentage = {
  value: Scalars["Float"]["output"];
};

export type Progress = Binary | Percentage | StoryPoint;

export type ProgressInput = {
  binary?: InputMaybe<Scalars["Boolean"]["input"]>;
  percentage?: InputMaybe<Scalars["Float"]["input"]>;
  storyPoints?: InputMaybe<StoryPointInput>;
};

export type RemoveAgentInput = {
  id: Scalars["OID"]["input"];
};

export type RemoveCoordinatorInput = {
  id: Scalars["ID"]["input"];
  milestoneId: Scalars["OID"]["input"];
};

export type RemoveDeliverableInSetInput = {
  deliverableId: Scalars["OID"]["input"];
  milestoneId: Scalars["ID"]["input"];
};

export type RemoveDeliverableInput = {
  id: Scalars["OID"]["input"];
};

export type RemoveKeyResultInput = {
  deliverableId: Scalars["OID"]["input"];
  id: Scalars["OID"]["input"];
};

export type RemoveMilestoneInput = {
  id: Scalars["OID"]["input"];
  roadmapId: Scalars["OID"]["input"];
};

export type RemoveRoadmapInput = {
  id: Scalars["OID"]["input"];
};

export type Roadmap = {
  description: Scalars["String"]["output"];
  id: Scalars["OID"]["output"];
  milestones: Array<Milestone>;
  slug: Scalars["String"]["output"];
  title: Scalars["String"]["output"];
};

export type ScopeOfWorkState = {
  agents: Array<Agent>;
  deliverables: Array<Deliverable>;
  description: Scalars["String"]["output"];
  roadmaps: Array<Roadmap>;
  status: ScopeOfWorkStatus | `${ScopeOfWorkStatus}`;
  title: Scalars["String"]["output"];
};

export type ScopeOfWorkStatus =
  | "APPROVED"
  | "CANCELED"
  | "DELIVERED"
  | "DRAFT"
  | "IN_PROGRESS"
  | "REJECTED"
  | "SUBMITTED";

export type ScopeOfWorkStatusInput =
  | "APPROVED"
  | "CANCELED"
  | "DELIVERED"
  | "DRAFT"
  | "IN_PROGRESS"
  | "REJECTED"
  | "SUBMITTED";

export type SetDeliverableProgressInput = {
  id: Scalars["OID"]["input"];
  workProgress?: InputMaybe<ProgressInput>;
};

export type SetProgressInDeliverablesSetInput = {
  milestoneId: Scalars["ID"]["input"];
  progress?: InputMaybe<ProgressInput>;
};

export type StoryPoint = {
  completed: Scalars["Int"]["output"];
  total: Scalars["Int"]["output"];
};

export type StoryPointInput = {
  completed: Scalars["Int"]["input"];
  total: Scalars["Int"]["input"];
};
