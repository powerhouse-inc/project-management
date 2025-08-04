import { gql } from "graphql-tag";
import type { DocumentNode } from "graphql";

export const schema: DocumentNode = gql`
  """
  Subgraph definition for ScopeOfWork (powerhouse/scopeofwork)
  """
  type ScopeOfWorkState {
    title: String!
    description: String!
    status: ScopeOfWorkStatus!
    deliverables: [Deliverable!]!
    projects: [Project!]!
    roadmaps: [Roadmap!]!
    agents: [Agent!]!
  }

  enum ScopeOfWorkStatus {
    DRAFT
    SUBMITTED
    IN_PROGRESS
    REJECTED
    APPROVED
    DELIVERED
    CANCELED
  }

  type Agent {
    id: ID!
    agentType: AgentType!
    name: String!
    code: String!
    imageUrl: String
  }

  enum AgentType {
    HUMAN
    GROUP
    AI
  }

  type Deliverable {
    id: OID!
    owner: ID
    title: String!
    code: String!
    description: String!
    status: DeliverableStatus!
    workProgress: Progress
    keyResults: [KeyResult!]!
    budgetAnchor: BudgetAnchorProject
  }

  type BudgetAnchorProject {
    project: OID!
    unit: Unit
    unitCost: Float!
    quantity: Float!
  }

  enum Unit {
    StoryPoints
    Hours
  }

  enum DeliverableStatus {
    WONT_DO
    DRAFT
    TODO
    BLOCKED
    IN_PROGRESS
    DELIVERED
    CANCELED
  }

  union Progress = StoryPoint | Percentage | Binary

  type Percentage {
    value: Float!
  }

  type Binary {
    completed: Boolean
  }

  type StoryPoint {
    total: Int!
    completed: Int!
  }

  type KeyResult {
    id: OID!
    title: String!
    link: String!
  }

  type Project {
    id: OID!
    code: String!
    title: String!
    projectOwner: ID
    abstract: String
    imageUrl: URL
    scope: DeliverablesSet
    budgetType: BudgetType
    currency: Currency
    budget: Float
    expenditure: BudgetExpenditure
  }

  enum Currency {
    DAI
    USDS
    EUR
    USD
  }

  enum BudgetType {
    CONTINGENCY
    OPEX
    CAPEX
    OVERHEAD
  }

  type BudgetExpenditure {
    percentage: Float!
    actuals: Float!
    cap: Float!
  }

  type Roadmap {
    id: OID!
    slug: String!
    title: String!
    description: String!
    milestones: [Milestone!]!
  }

  type Milestone {
    id: OID!
    sequenceCode: String!
    title: String!
    description: String!
    deliveryTarget: String!
    scope: DeliverablesSet
    estimatedBudgetCap: String!
    coordinators: [ID!]!
  }

  type DeliverablesSet {
    deliverables: [OID!]!
    status: DeliverableSetStatus!
    progress: Progress!
    deliverablesCompleted: DeliverablesCompleted!
  }

  type DeliverablesCompleted {
    total: Int!
    completed: Int!
  }

  enum DeliverableSetStatus {
    DRAFT
    TODO
    IN_PROGRESS
    FINISHED
    CANCELED
  }

  """
  Queries: ScopeOfWork
  """
  type ScopeOfWorkQueries {
    getDocument(driveId: String, docId: PHID): ScopeOfWork
    getDocuments: [ScopeOfWork!]
  }

  type Query {
    ScopeOfWork: ScopeOfWorkQueries
  }

  """
  Mutations: ScopeOfWork
  """
  type Mutation {
    ScopeOfWork_createDocument(driveId: String, name: String): String

    ScopeOfWork_editScopeOfWork(
      driveId: String
      docId: PHID
      input: ScopeOfWork_EditScopeOfWorkInput
    ): Int
    ScopeOfWork_addDeliverable(
      driveId: String
      docId: PHID
      input: ScopeOfWork_AddDeliverableInput
    ): Int
    ScopeOfWork_removeDeliverable(
      driveId: String
      docId: PHID
      input: ScopeOfWork_RemoveDeliverableInput
    ): Int
    ScopeOfWork_editDeliverable(
      driveId: String
      docId: PHID
      input: ScopeOfWork_EditDeliverableInput
    ): Int
    ScopeOfWork_setDeliverableProgress(
      driveId: String
      docId: PHID
      input: ScopeOfWork_SetDeliverableProgressInput
    ): Int
    ScopeOfWork_addKeyResult(
      driveId: String
      docId: PHID
      input: ScopeOfWork_AddKeyResultInput
    ): Int
    ScopeOfWork_removeKeyResult(
      driveId: String
      docId: PHID
      input: ScopeOfWork_RemoveKeyResultInput
    ): Int
    ScopeOfWork_editKeyResult(
      driveId: String
      docId: PHID
      input: ScopeOfWork_EditKeyResultInput
    ): Int
    ScopeOfWork_addRoadmap(
      driveId: String
      docId: PHID
      input: ScopeOfWork_AddRoadmapInput
    ): Int
    ScopeOfWork_removeRoadmap(
      driveId: String
      docId: PHID
      input: ScopeOfWork_RemoveRoadmapInput
    ): Int
    ScopeOfWork_editRoadmap(
      driveId: String
      docId: PHID
      input: ScopeOfWork_EditRoadmapInput
    ): Int
    ScopeOfWork_addMilestone(
      driveId: String
      docId: PHID
      input: ScopeOfWork_AddMilestoneInput
    ): Int
    ScopeOfWork_removeMilestone(
      driveId: String
      docId: PHID
      input: ScopeOfWork_RemoveMilestoneInput
    ): Int
    ScopeOfWork_editMilestone(
      driveId: String
      docId: PHID
      input: ScopeOfWork_EditMilestoneInput
    ): Int
    ScopeOfWork_addCoordinator(
      driveId: String
      docId: PHID
      input: ScopeOfWork_AddCoordinatorInput
    ): Int
    ScopeOfWork_removeCoordinator(
      driveId: String
      docId: PHID
      input: ScopeOfWork_RemoveCoordinatorInput
    ): Int
    ScopeOfWork_editDeliverablesSet(
      driveId: String
      docId: PHID
      input: ScopeOfWork_EditDeliverablesSetInput
    ): Int
    ScopeOfWork_addDeliverableInSet(
      driveId: String
      docId: PHID
      input: ScopeOfWork_AddDeliverableInSetInput
    ): Int
    ScopeOfWork_removeDeliverableInSet(
      driveId: String
      docId: PHID
      input: ScopeOfWork_RemoveDeliverableInSetInput
    ): Int
    ScopeOfWork_setProgressInDeliverablesSet(
      driveId: String
      docId: PHID
      input: ScopeOfWork_SetProgressInDeliverablesSetInput
    ): Int
    ScopeOfWork_addAgent(
      driveId: String
      docId: PHID
      input: ScopeOfWork_AddAgentInput
    ): Int
    ScopeOfWork_removeAgent(
      driveId: String
      docId: PHID
      input: ScopeOfWork_RemoveAgentInput
    ): Int
    ScopeOfWork_editAgent(
      driveId: String
      docId: PHID
      input: ScopeOfWork_EditAgentInput
    ): Int
    ScopeOfWork_addProject(
      driveId: String
      docId: PHID
      input: ScopeOfWork_AddProjectInput
    ): Int
    ScopeOfWork_updateProject(
      driveId: String
      docId: PHID
      input: ScopeOfWork_UpdateProjectInput
    ): Int
    ScopeOfWork_updateProjectOwner(
      driveId: String
      docId: PHID
      input: ScopeOfWork_UpdateProjectOwnerInput
    ): Int
  }

  """
  Module: ScopeOfWork
  """
  input ScopeOfWork_EditScopeOfWorkInput {
    title: String
    description: String
    status: ScopeOfWorkStatusInput #defaults to DRAFT
  }

  enum ScopeOfWorkStatusInput {
    DRAFT
    SUBMITTED
    IN_PROGRESS
    REJECTED
    APPROVED
    DELIVERED
    CANCELED
  }

  """
  Module: Deliverables
  """
  input ScopeOfWork_AddDeliverableInput {
    id: OID!
    owner: ID
    title: String
    code: String
    description: String
    status: PMDeliverableStatusInput
  }

  enum PMDeliverableStatusInput {
    WONT_DO
    DRAFT
    TODO
    BLOCKED
    IN_PROGRESS
    DELIVERED
    CANCELED
  }
  input ScopeOfWork_RemoveDeliverableInput {
    id: OID!
  }
  input ScopeOfWork_EditDeliverableInput {
    id: OID!
    owner: ID
    title: String
    code: String
    description: String
    status: PMDeliverableStatusInput
  }

  input ScopeOfWork_SetDeliverableProgressInput {
    id: OID! #deliverable id
    workProgress: ProgressInput
  }

  input ProgressInput {
    # Only one of these fields should be provided
    percentage: Float
    storyPoints: StoryPointInput
    completed: Boolean
  }

  input StoryPointInput {
    total: Int!
    completed: Int!
  }

  input ScopeOfWork_AddKeyResultInput {
    id: OID!
    deliverableId: OID!
    title: String!
    link: String
  }
  input ScopeOfWork_RemoveKeyResultInput {
    id: OID!
    deliverableId: OID!
  }
  input ScopeOfWork_EditKeyResultInput {
    id: OID!
    deliverableId: OID!
    title: String
    link: URL
  }

  """
  Module: Roadmaps
  """
  input ScopeOfWork_AddRoadmapInput {
    id: OID!
    title: String!
    slug: String
    description: String
  }
  input ScopeOfWork_RemoveRoadmapInput {
    id: OID!
  }
  input ScopeOfWork_EditRoadmapInput {
    id: OID!
    title: String
    slug: String #computed title: "The Logical Structure of  Atlas"
    # id: "abcd1234" #=> slug: "the-logical-structure-of-atlas-abcd1234"
    description: String
  }

  """
  Module: Milestones
  """
  input ScopeOfWork_AddMilestoneInput {
    id: OID!
    roadmapId: OID!
    sequenceCode: String
    title: String
    description: String
    deliveryTarget: String
    estimatedBudgetCap: String
  }
  input ScopeOfWork_RemoveMilestoneInput {
    id: OID!
    roadmapId: OID!
  }
  input ScopeOfWork_EditMilestoneInput {
    id: OID!
    roadmapId: OID!
    sequenceCode: String
    title: String
    description: String
    deliveryTarget: String
    estimatedBudgetCap: String
  }
  input ScopeOfWork_AddCoordinatorInput {
    id: ID!
    milestoneId: OID!
  }
  input ScopeOfWork_RemoveCoordinatorInput {
    id: ID!
    milestoneId: OID! # Coordinator can potentially be coordinating multiple milestones/roadmaps.
  }

  """
  Module: DeliverablesSet
  """
  input ScopeOfWork_EditDeliverablesSetInput {
    milestoneId: ID!
    projectId: ID!
    status: DeliverableSetStatusInput
    deliverablesCompleted: DeliverablesCompletedInput
  }

  enum DeliverableSetStatusInput {
    DRAFT
    TODO
    IN_PROGRESS
    FINISHED
    CANCELED
  }

  input DeliverablesCompletedInput {
    total: Int!
    completed: Int!
  }
  input ScopeOfWork_AddDeliverableInSetInput {
    milestoneId: ID!
    deliverableId: OID!
  }
  input ScopeOfWork_RemoveDeliverableInSetInput {
    milestoneId: ID!
    projectId: ID!
    deliverableId: OID!
  }
  input ScopeOfWork_SetProgressInDeliverablesSetInput {
    milestoneId: ID!
    projectId: ID
    progress: ProgressInput
  }

  """
  Module: Agents
  """
  input ScopeOfWork_AddAgentInput {
    id: ID!
    name: String!
    agentType: AgentTypeInput
    code: String
    imageUrl: String
  }

  enum AgentTypeInput {
    HUMAN
    GROUP
    AI
  }
  input ScopeOfWork_RemoveAgentInput {
    id: OID!
  }
  input ScopeOfWork_EditAgentInput {
    id: ID!
    name: String
    agentType: AgentTypeInput
    code: String
    imageUrl: String
  }

  enum AgentTypeInput {
    HUMAN
    GROUP
    AI
  }

  """
  Module: Projects
  """
  input ScopeOfWork_AddProjectInput {
    id: OID!
    code: String!
    title: String!
    projectOwner: ID # Initial project owner
    abstract: String
    imageUrl: URL
    budgetType: PMBudgetTypeInput
    currency: PMCurrencyInput
    budget: Float
  }

  enum PMBudgetTypeInput {
    CONTINGENCY
    OPEX
    CAPEX
    OVERHEAD
  }

  enum PMCurrencyInput {
    DAI
    USDS
    EUR
    USD
  }

  input ScopeOfWork_UpdateProjectInput {
    id: OID!
    code: String
    title: String
    abstract: String
    imageUrl: URL
    budgetType: PMBudgetTypeInput
    currency: PMCurrencyInput
    budget: Float
  }
  input ScopeOfWork_UpdateProjectOwnerInput {
    id: OID! # The ID of the project
    projectOwner: ID! # The ID of the new owner (Agent)
  }
`;
