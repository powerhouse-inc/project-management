import { gql } from "graphql-tag";
import type { DocumentNode } from "graphql";

export const schema: DocumentNode = gql`
  """
  Queries: ScopeOfWork Document
  """
  type ScopeOfWorkQueries {
    getDocument(docId: PHID!, driveId: PHID): ScopeOfWork
    getDocuments(driveId: String!): [ScopeOfWork!]
  }

  type Query {
    ScopeOfWork: ScopeOfWorkQueries
  }

  """
  Mutations: ScopeOfWork
  """
  type Mutation {
    ScopeOfWork_createDocument(name: String!, driveId: String): String

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
    ScopeOfWork_setDeliverableBudgetAnchorProject(
      driveId: String
      docId: PHID
      input: ScopeOfWork_SetDeliverableBudgetAnchorProjectInput
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
    ScopeOfWork_addMilestoneDeliverable(
      driveId: String
      docId: PHID
      input: ScopeOfWork_AddMilestoneDeliverableInput
    ): Int
    ScopeOfWork_removeMilestoneDeliverable(
      driveId: String
      docId: PHID
      input: ScopeOfWork_RemoveMilestoneDeliverableInput
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
    ScopeOfWork_removeProject(
      driveId: String
      docId: PHID
      input: ScopeOfWork_RemoveProjectInput
    ): Int
    ScopeOfWork_setProjectMargin(
      driveId: String
      docId: PHID
      input: ScopeOfWork_SetProjectMarginInput
    ): Int
    ScopeOfWork_setProjectTotalBudget(
      driveId: String
      docId: PHID
      input: ScopeOfWork_SetProjectTotalBudgetInput
    ): Int
    ScopeOfWork_addProjectDeliverable(
      driveId: String
      docId: PHID
      input: ScopeOfWork_AddProjectDeliverableInput
    ): Int
    ScopeOfWork_removeProjectDeliverable(
      driveId: String
      docId: PHID
      input: ScopeOfWork_RemoveProjectDeliverableInput
    ): Int
  }

  """
  Module: ScopeOfWork
  """
  input ScopeOfWork_EditScopeOfWorkInput {
    title: String
    description: String
    status: ScopeOfWork_ScopeOfWorkStatusInput #defaults to DRAFT
  }

  enum ScopeOfWork_ScopeOfWorkStatusInput {
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
    status: ScopeOfWork_PMDeliverableStatusInput
  }

  enum ScopeOfWork_PMDeliverableStatusInput {
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
    workProgress: ScopeOfWork_ProgressInput
  }

  input ScopeOfWork_ProgressInput {
    # Only one of these fields should be provided
    percentage: Float
    storyPoints: ScopeOfWork_StoryPointInput
    done: Boolean
  }

  input ScopeOfWork_StoryPointInput {
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
  input ScopeOfWork_SetDeliverableBudgetAnchorProjectInput {
    deliverableId: ID!
    project: OID
    unit: ScopeOfWork_Unit
    unitCost: Float
    quantity: Float
    margin: Float
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
  }
  input ScopeOfWork_AddCoordinatorInput {
    id: ID!
    milestoneId: OID!
  }
  input ScopeOfWork_RemoveCoordinatorInput {
    id: ID!
    milestoneId: OID! # Coordinator can potentially be coordinating multiple milestones/roadmaps.
  }
  input ScopeOfWork_AddMilestoneDeliverableInput {
    milestoneId: OID!
    deliverableId: OID!
    title: String!
  }
  input ScopeOfWork_RemoveMilestoneDeliverableInput {
    milestoneId: OID!
    deliverableId: OID!
  }

  """
  Module: DeliverablesSet
  """
  input ScopeOfWork_EditDeliverablesSetInput {
    milestoneId: ID
    projectId: ID
    status: ScopeOfWork_DeliverableSetStatusInput
    deliverablesCompleted: ScopeOfWork_DeliverablesCompletedInput
  }

  enum ScopeOfWork_DeliverableSetStatusInput {
    DRAFT
    TODO
    IN_PROGRESS
    FINISHED
    CANCELED
  }

  input ScopeOfWork_DeliverablesCompletedInput {
    total: Int!
    completed: Int!
  }
  input ScopeOfWork_AddDeliverableInSetInput {
    milestoneId: ID
    projectId: ID
    deliverableId: OID!
  }
  input ScopeOfWork_RemoveDeliverableInSetInput {
    milestoneId: ID
    projectId: ID
    deliverableId: OID!
  }

  """
  Module: Contributors
  """
  input ScopeOfWork_AddAgentInput {
    id: PHID!
    name: String!
    icon: URL
    description: String
  }
  input ScopeOfWork_RemoveAgentInput {
    id: PHID!
  }
  input ScopeOfWork_EditAgentInput {
    id: PHID!
    name: String
    icon: URL
    description: String
  }

  """
  Module: Projects
  """
  input ScopeOfWork_AddProjectInput {
    id: OID!
    code: String!
    title: String!
    slug: String
    projectOwner: ID # Initial project owner
    abstract: String
    imageUrl: URL
    budgetType: ScopeOfWork_PMBudgetTypeInput
    currency: ScopeOfWork_PMCurrencyInput
    budget: Float
  }

  enum ScopeOfWork_PMBudgetTypeInput {
    CONTINGENCY
    OPEX
    CAPEX
    OVERHEAD
  }

  enum ScopeOfWork_PMCurrencyInput {
    DAI
    USDS
    EUR
    USD
  }

  input ScopeOfWork_UpdateProjectInput {
    id: OID!
    code: String
    slug: String
    title: String
    abstract: String
    imageUrl: URL
    budgetType: PMBudgetTypeInput
    currency: PMCurrencyInput
    budget: Float
  }
  input ScopeOfWork_UpdateProjectOwnerInput {
    id: OID! # The ID of the project
    projectOwner: ID! # The ID of the new owner (ScopeOfWork_Agent)
  }
  input ScopeOfWork_RemoveProjectInput {
    projectId: ID!
  }
  input ScopeOfWork_SetProjectMarginInput {
    projectId: OID!
    margin: Float!
  }
  input ScopeOfWork_SetProjectTotalBudgetInput {
    projectId: OID!
    totalBudget: Float!
  }
  input ScopeOfWork_AddProjectDeliverableInput {
    projectId: OID!
    deliverableId: ID!
    title: String!
  }
  input ScopeOfWork_RemoveProjectDeliverableInput {
    projectId: OID!
    deliverableId: OID!
  }
`;
