import type { DocumentModelState } from "document-model";

export const documentModel: DocumentModelState = {
  author: {
    name: "Powerhouse",
    website: "https://powerhouse.inc",
  },
  description:
    "The Scope of Work v2 model defines a structured plan for executing contributor work; on top of deliverables and roadmaps with milestones it now also includes projects as budget anchors for project based budgeting. ",
  extension: ".phdm",
  id: "powerhouse/scopeofwork",
  name: "ScopeOfWork",
  specifications: [
    {
      changeLog: [],
      modules: [
        {
          description: "",
          id: "70ad1129-4aa4-4e2a-842e-e85eeaa2ec4c",
          name: "scope_of_work",
          operations: [
            {
              description:
                "This operation allows a user to edit the basic details of a Scope of Work (SoW) document. ",
              errors: [],
              examples: [],
              id: "8a9f1559-3aba-48e3-97fd-ceafbcc28b06",
              name: "EDIT_SCOPE_OF_WORK",
              reducer: "",
              schema:
                "input EditScopeOfWorkInput {\n    title: String\n    description: String\n\tstatus: ScopeOfWorkStatusInput #defaults to DRAFT\n}\n\nenum ScopeOfWorkStatusInput {\n  DRAFT\n  SUBMITTED\n  IN_PROGRESS\n  REJECTED\n  APPROVED\n  DELIVERED\n  CANCELED\n}",
              scope: "global",
              template: "",
            },
          ],
        },
        {
          description: "",
          id: "6e592f85-6188-4111-887b-fa689c651b37",
          name: "deliverables",
          operations: [
            {
              description:
                "This operation is used to create a new deliverable. ",
              errors: [],
              examples: [],
              id: "9a986a3a-a546-494e-b008-d31cdf125383",
              name: "ADD_DELIVERABLE",
              reducer: "",
              schema:
                "input AddDeliverableInput {\n  id: OID!\n  owner: ID\n  title: String\n  code: String\n  description: String\n  status: PMDeliverableStatusInput\n}\n\nenum PMDeliverableStatusInput {\n  WONT_DO\n  DRAFT\n  TODO\n  BLOCKED\n  IN_PROGRESS\n  DELIVERED\n  CANCELED\n}",
              scope: "global",
              template: "",
            },
            {
              description: "",
              errors: [],
              examples: [],
              id: "0567776c-2778-43a5-86b8-0035a3b80702",
              name: "REMOVE_DELIVERABLE",
              reducer: "",
              schema: "input RemoveDeliverableInput {\n  id: OID!\n}",
              scope: "global",
              template: "",
            },
            {
              description:
                "This operation allows a user to edit the core attributes of a deliverable, a concrete piece of work within a project or a milestone. Deliverables are the building blocks of execution, typically assigned to contributors or teams.",
              errors: [],
              examples: [],
              id: "e031053f-f1c8-40b5-93fb-47d68161ecca",
              name: "EDIT_DELIVERABLE",
              reducer: "",
              schema:
                "input EditDeliverableInput {\n  id: OID!\n  owner: ID\n  title: String\n  code: String\n  description: String\n  status: PMDeliverableStatusInput\n}\n\n",
              scope: "global",
              template: "",
            },
            {
              description: "",
              errors: [],
              examples: [],
              id: "505fb5d9-1698-428c-935c-a0e64cf48a01",
              name: "SET_DELIVERABLE_PROGRESS",
              reducer: "",
              schema:
                "input SetDeliverableProgressInput {\n  id: OID! #deliverable id\n  workProgress: ProgressInput\n}\n\ninput ProgressInput {\n  # Only one of these fields should be provided\n  percentage: Float\n  storyPoints: StoryPointInput\n  done: Boolean\n}\n\ninput StoryPointInput {\n  total: Int!\n  completed: Int!\n}\n",
              scope: "global",
              template: "",
            },
            {
              description:
                "This operation allows a user to add a key result to a specific deliverable. Key results are measurable outcomes or indicators that help track progress on a deliverable. ",
              errors: [],
              examples: [],
              id: "166929bc-1416-4bbb-812d-5fe09fb81884",
              name: "ADD_KEY_RESULT",
              reducer: "",
              schema:
                "input AddKeyResultInput {\n  id: OID!\n  deliverableId:OID!\n  title: String!\n  link: String\n}",
              scope: "global",
              template: "",
            },
            {
              description: "",
              errors: [],
              examples: [],
              id: "7a692317-2ad3-4392-8935-74a9d2650874",
              name: "REMOVE_KEY_RESULT",
              reducer: "",
              schema:
                "input RemoveKeyResultInput {\n  id: OID!\n  deliverableId:OID!\n}",
              scope: "global",
              template: "",
            },
            {
              description: "",
              errors: [],
              examples: [],
              id: "af639826-2a15-419f-a1ef-ebfd6cd048eb",
              name: "EDIT_KEY_RESULT",
              reducer: "",
              schema:
                "input EditKeyResultInput {\n  id: OID!\n  deliverableId: OID!\n  title: String\n  link: URL\n}",
              scope: "global",
              template: "",
            },
            {
              description: "",
              errors: [],
              examples: [],
              id: "306568c6-39d1-415b-b096-670ed99eaa04",
              name: "SET_DELIVERABLE_BUDGET_ANCHOR_PROJECT",
              reducer: "",
              schema:
                "input SetDeliverableBudgetAnchorProjectInput {\n  deliverableId: ID!\n  project: OID\n  unit: Unit\n  unitCost: Float\n  quantity: Float\n  margin: Float\n}",
              scope: "global",
              template: "",
            },
          ],
        },
        {
          description: "",
          id: "f68517e0-68d4-4c88-9fdd-108ca55874e5",
          name: "roadmaps",
          operations: [
            {
              description: "",
              errors: [],
              examples: [],
              id: "4d510d30-a82d-48be-b643-c22c50b6f19e",
              name: "ADD_ROADMAP",
              reducer: "",
              schema:
                "input AddRoadmapInput {\n  id: OID!\n  title: String!\n  slug: String\n  description: String\n}",
              scope: "global",
              template: "",
            },
            {
              description: "",
              errors: [],
              examples: [],
              id: "ef0ac627-a852-4e08-8c75-53b23b34c298",
              name: "REMOVE_ROADMAP",
              reducer: "",
              schema: "input RemoveRoadmapInput {\n  id: OID!\n}",
              scope: "global",
              template: "",
            },
            {
              description:
                "This operation allows a user to edit the details of a roadmap document, which outlines the structure ",
              errors: [],
              examples: [],
              id: "7b1863fe-fc12-4855-949c-869ce19c55e1",
              name: "EDIT_ROADMAP",
              reducer: "",
              schema:
                'input EditRoadmapInput {\n  id: OID!\n  title: String \n  slug: String #computed title: "The Logical Structure of  Atlas"\n              # id: "abcd1234" #=> slug: "the-logical-structure-of-atlas-abcd1234"\n  description: String\n}',
              scope: "global",
              template: "",
            },
          ],
        },
        {
          description: "",
          id: "016b8c61-35c7-4962-908d-e47666a68721",
          name: "milestones",
          operations: [
            {
              description: "",
              errors: [],
              examples: [],
              id: "2aee07b8-4836-4468-a9ad-a2ff6075309c",
              name: "ADD_MILESTONE",
              reducer: "",
              schema:
                "input AddMilestoneInput {\n  id: OID!\n  roadmapId:OID!\n  sequenceCode: String\n  title: String\n  description: String\n  deliveryTarget: String\n}",
              scope: "global",
              template: "",
            },
            {
              description: "",
              errors: [],
              examples: [],
              id: "b2662adc-bf97-486f-a012-6ddda9266768",
              name: "REMOVE_MILESTONE",
              reducer: "",
              schema:
                "input RemoveMilestoneInput {\n  id: OID!\n  roadmapId:OID!\n}",
              scope: "global",
              template: "",
            },
            {
              description: "",
              errors: [],
              examples: [],
              id: "8d838a5d-8901-43db-8130-5adde9d0a025",
              name: "EDIT_MILESTONE",
              reducer: "",
              schema:
                "input EditMilestoneInput {\n  id: OID!\n  roadmapId: OID!\n  sequenceCode: String\n  title: String\n  description: String\n  deliveryTarget: String\n}",
              scope: "global",
              template: "",
            },
            {
              description:
                "This operation allows a user to assign a contributor as a coordinator for a specific milestone. Coordinators are the people responsible for ensuring the milestone gets delivered; they’re often leads, facilitators, or project managers.\n\n",
              errors: [],
              examples: [],
              id: "0db5f01b-33b5-486b-9e67-a95ebea85107",
              name: "ADD_COORDINATOR",
              reducer: "",
              schema:
                "input AddCoordinatorInput {\n  id: ID! \n  milestoneId: OID!\n}",
              scope: "global",
              template: "",
            },
            {
              description: "",
              errors: [],
              examples: [],
              id: "6472175b-feb2-4ec5-b28d-2f0b46ca6072",
              name: "REMOVE_COORDINATOR",
              reducer: "",
              schema:
                "input RemoveCoordinatorInput {\n  id: ID! \n  milestoneId: OID! # Coordinator can potentially be coordinating multiple milestones/roadmaps. \n}",
              scope: "global",
              template: "",
            },
            {
              description: "",
              errors: [],
              examples: [],
              id: "afc100a7-836d-4396-98b5-c5a045fe626e",
              name: "ADD_MILESTONE_DELIVERABLE",
              reducer: "",
              schema:
                "input AddMilestoneDeliverableInput {\n  milestoneId: OID!\n  deliverableId: OID!\n  title: String!\n}",
              scope: "global",
              template: "",
            },
            {
              description: "",
              errors: [],
              examples: [],
              id: "532a4d3d-389c-4d58-a933-4bbf5604b089",
              name: "REMOVE_MILESTONE_DELIVERABLE",
              reducer: "",
              schema:
                "input RemoveMilestoneDeliverableInput {\n  milestoneId: OID!\n  deliverableId: OID!\n}",
              scope: "global",
              template: "",
            },
          ],
        },
        {
          description: "",
          id: "52a1e993-adf3-4a2c-acc1-41f0336203ee",
          name: "deliverables_set",
          operations: [
            {
              description: "",
              errors: [],
              examples: [],
              id: "68ba1e27-8979-4762-a779-f1f2ef86500e",
              name: "EDIT_DELIVERABLES_SET",
              reducer: "",
              schema:
                "input EditDeliverablesSetInput {\n  milestoneId: ID\n  projectId: ID\n  status: DeliverableSetStatusInput\n  deliverablesCompleted: DeliverablesCompletedInput\n}\n\nenum DeliverableSetStatusInput {\n  DRAFT\n  TODO\n  IN_PROGRESS\n  FINISHED\n  CANCELED\n}\n\ninput DeliverablesCompletedInput {\n  total: Int!\n  completed: Int!\n}",
              scope: "global",
              template: "",
            },
            {
              description: "",
              errors: [],
              examples: [],
              id: "34a36572-1ad4-4c32-ad31-86988e93a31a",
              name: "ADD_DELIVERABLE_IN_SET",
              reducer: "",
              schema:
                "input AddDeliverableInSetInput {\n  milestoneId: ID\n  projectId: ID\n  deliverableId: OID!\n}",
              scope: "global",
              template: "",
            },
            {
              description: "",
              errors: [],
              examples: [],
              id: "94e5b395-9798-48ae-921e-70983f17155d",
              name: "REMOVE_DELIVERABLE_IN_SET",
              reducer: "",
              schema:
                "input RemoveDeliverableInSetInput {\n  milestoneId: ID\n  projectId: ID\n  deliverableId: OID!\n}",
              scope: "global",
              template: "",
            },
          ],
        },
        {
          description: "",
          id: "7f2db8cf-9fe9-4095-91f0-cfd61b43fc02",
          name: "contributors",
          operations: [
            {
              description: "",
              errors: [],
              examples: [],
              id: "1273f82b-b6db-4504-bc4b-49fbdb2a2c68",
              name: "ADD_AGENT",
              reducer:
                "// Check if agent with same ID already exists\nconst existingAgent = state.contributors.find(agent => agent.id === action.input.id);\nif (existingAgent) {\n  throw new AgentDuplicateIdError(`Agent with ID ${action.input.id} already exists`);\n}\n\n// Create new agent with correct structure matching GraphQL schema\nconst agent = {\n  id: action.input.id,\n  name: action.input.name,\n  icon: action.input.icon || null,\n  description: action.input.description || null,\n};\n\nstate.contributors.push(agent);",
              schema:
                "input AddAgentInput {\n  id: PHID!\n  name: String!\n  icon: URL\n  description: String\n}",
              scope: "global",
              template: "",
            },
            {
              description: "",
              errors: [
                {
                  code: "AGENT_NOT_FOUND",
                  description: "The specified agent was not found",
                  id: "agent-not-found",
                  name: "AgentNotFoundError",
                  template: "Agent with ID ${id} not found",
                },
              ],
              examples: [],
              id: "eec0e5aa-b4c9-4e62-8f2e-4a36fbde6f96",
              name: "REMOVE_AGENT",
              reducer:
                "// Find agent by ID\nconst agentIndex = state.contributors.findIndex(agent => agent.id === action.input.id);\nif (agentIndex === -1) {\n  throw new AgentNotFoundError(`Agent with ID ${action.input.id} not found`);\n}\n\n// Remove agent from contributors array\nstate.contributors.splice(agentIndex, 1);",
              schema: "input RemoveAgentInput {\n  id: PHID!\n}",
              scope: "global",
              template: "",
            },
            {
              description: "",
              errors: [],
              examples: [],
              id: "33534820-0c51-4f04-8ad2-bb378fb9c60e",
              name: "EDIT_AGENT",
              reducer:
                "// Find agent by ID\nconst agentIndex = state.contributors.findIndex(agent => agent.id === action.input.id);\nif (agentIndex === -1) {\n  throw new AgentNotFoundError(`Agent with ID ${action.input.id} not found`);\n}\n\n// Update agent with provided fields, preserving existing values for optional fields\nconst existingAgent = state.contributors[agentIndex];\nconst updatedAgent = {\n  ...existingAgent,\n  name: action.input.name !== undefined ? action.input.name : existingAgent.name,\n  icon: action.input.icon !== undefined ? action.input.icon : existingAgent.icon,\n  description: action.input.description !== undefined ? action.input.description : existingAgent.description,\n};\n\nstate.contributors[agentIndex] = updatedAgent;",
              schema:
                "input EditAgentInput {\n  id: PHID!\n  name: String\n  icon: URL\n  description: String\n}",
              scope: "global",
              template: "",
            },
          ],
        },
        {
          description: "",
          id: "0578e71b-6205-4c19-86ab-5c581cc71b93",
          name: "projects",
          operations: [
            {
              description:
                "Creates a new project in a DRAFT status, initializing its core fields. The status of the new project defaults to DRAFT. The Deliverables list (scope) is initialized as empty.",
              errors: [],
              examples: [],
              id: "773aebd7-98af-46f3-8f6a-161be1d2e176",
              name: "ADD_PROJECT",
              reducer: "",
              schema:
                "input AddProjectInput {\n  id: OID!\n  code: String!\n  title: String!\n  projectOwner: ID # Initial project owner\n  abstract: String\n  imageUrl: URL\n  budgetType: PMBudgetTypeInput\n  currency: PMCurrencyInput\n  budget: Float\n}\n\nenum PMBudgetTypeInput {\n  CONTINGENCY\n  OPEX\n  CAPEX\n  OVERHEAD\n}\n\nenum PMCurrencyInput {\n  DAI\n  USDS\n  EUR\n  USD\n}\n\n",
              scope: "global",
              template: "",
            },
            {
              description:
                "Updates general, non-status-related fields of an existing project. This operation is for minor content adjustments. Project must exist; only allowed if the project status is DRAFT or REJECTED. For projects in other statuses, specific operations for status transitions or scope management should be used.\n\nIf code is updated, it must remain unique.",
              errors: [],
              examples: [],
              id: "e978628b-ed5f-4867-83f4-45d5ed284f16",
              name: "UPDATE_PROJECT",
              reducer: "",
              schema:
                "input UpdateProjectInput {\n  id: OID! \n  code: String \n  title: String \n  abstract: String \n  imageUrl: URL \n  budgetType:  PMBudgetTypeInput\n  currency:  PMCurrencyInput\n  budget: Float \n}",
              scope: "global",
              template: "",
            },
            {
              description:
                "Changes the primary owner of a project. This is a specific update due to its potential impact on permissions and responsibilities. Project must exist. The projectOwner must correspond to a valid existing Agent.\nOnly allowed if the project status is DRAFT, REJECTED, APPROVED, or IN_PROGRESS. Requires appropriate permissions (e.g., current owner, admin, or coordinator).",
              errors: [],
              examples: [],
              id: "a6c4ce6a-fe2d-4242-bc8d-783ec3c7db9a",
              name: "UPDATE_PROJECT_OWNER",
              reducer: "",
              schema:
                "input UpdateProjectOwnerInput {\n  id: OID! # The ID of the project\n  projectOwner: ID! # The ID of the new owner (Agent)\n}",
              scope: "global",
              template: "",
            },
            {
              description: "",
              errors: [],
              examples: [],
              id: "3cbe7c0c-4198-4f56-9cb9-35bc3e2e5171",
              name: "REMOVE_PROJECT",
              reducer: "",
              schema: "input RemoveProjectInput {\n  projectId: ID!\n}",
              scope: "global",
              template: "",
            },
            {
              description: "",
              errors: [],
              examples: [],
              id: "19624daf-39dc-4562-a248-ff1645d301bf",
              name: "SET_PROJECT_MARGIN",
              reducer: "",
              schema:
                "input SetProjectMarginInput {\n  projectId: OID!\n  margin: Float!\n}",
              scope: "global",
              template: "",
            },
            {
              description: "",
              errors: [],
              examples: [],
              id: "1e97d233-5ac0-4167-97cf-e03e8ac186c1",
              name: "SET_PROJECT_TOTAL_BUDGET",
              reducer: "",
              schema:
                "input SetProjectTotalBudgetInput {\n  projectId: OID!\n  totalBudget: Float!\n}",
              scope: "global",
              template: "",
            },
            {
              description: "",
              errors: [],
              examples: [],
              id: "abf9ff5b-8339-4a94-92b1-96d843ad5c96",
              name: "ADD_PROJECT_DELIVERABLE",
              reducer: "",
              schema:
                "input AddProjectDeliverableInput {\n  projectId: OID!\n  deliverableId: ID!\n  title: String!\n}",
              scope: "global",
              template: "",
            },
            {
              description: "",
              errors: [],
              examples: [],
              id: "89341293-cdf9-4f88-b085-604a37444be7",
              name: "REMOVE_PROJECT_DELIVERABLE",
              reducer: "",
              schema:
                "input RemoveProjectDeliverableInput {\n  projectId: OID!\n  deliverableId: OID!\n}",
              scope: "global",
              template: "",
            },
          ],
        },
      ],
      state: {
        global: {
          examples: [],
          initialValue:
            '"{\\n  \\"title\\": \\"\\",\\n  \\"description\\": \\"\\",\\n  \\"status\\": \\"DRAFT\\",\\n  \\"deliverables\\": [],\\n  \\"projects\\": [],\\n  \\"roadmaps\\": [],\\n  \\"contributors\\": []\\n}"',
          schema:
            "type ScopeOfWorkState {\n  title: String!\n  description: String!\n  status: ScopeOfWorkStatus!\n  deliverables: [Deliverable!]!\n  projects: [Project!]!\n  roadmaps: [Roadmap!]!\n  contributors: [Agent!]!\n}\n\nenum ScopeOfWorkStatus {\n  DRAFT\n  SUBMITTED\n  IN_PROGRESS\n  REJECTED\n  APPROVED\n  DELIVERED\n  CANCELED\n}\n\ntype Agent {\n  id: PHID!\n  name: String!\n  icon: URL\n  description: String\n}\n\ntype Deliverable {\n  id: OID!\n  owner: ID\n  title: String!\n  code: String!\n  description: String!\n  status: DeliverableStatus!\n  workProgress: Progress\n  keyResults: [KeyResult!]!\n  budgetAnchor: BudgetAnchorProject\n}\n\ntype BudgetAnchorProject {\n  project: OID\n  unit: Unit\n  unitCost: Float!\n  quantity: Float!\n  margin: Float!\n}\n\nenum Unit {\n  StoryPoints\n  Hours\n}\n\nenum DeliverableStatus {\n  WONT_DO\n  DRAFT\n  TODO\n  BLOCKED\n  IN_PROGRESS\n  DELIVERED\n  CANCELED\n}\n\nunion Progress = StoryPoint | Percentage | Binary\n\ntype Percentage {\n  value: Float!\n}\n\ntype Binary {\n  done: Boolean\n}\n\ntype StoryPoint {\n  total: Int!\n  completed: Int!\n}\n\ntype KeyResult {\n  id: OID!\n  title: String!\n  link: String!\n}\n\ntype Project {\n  id: OID!\n  code: String!\n  title: String!\n  projectOwner: ID\n  abstract: String\n  imageUrl: URL\n  scope: DeliverablesSet\n  budgetType: BudgetType\n  currency: PMCurrency\n  budget: Float\n  expenditure: BudgetExpenditure\n}\n\nenum PMCurrency {\n  DAI\n  USDS\n  EUR\n  USD\n}\n\nenum BudgetType {\n  CONTINGENCY\n  OPEX\n  CAPEX\n  OVERHEAD\n}\n\ntype BudgetExpenditure {\n  percentage: Float!\n  actuals: Float!\n  cap: Float!\n}\n\ntype Roadmap {\n  id: OID!\n  slug: String!\n  title: String!\n  description: String!\n  milestones: [Milestone!]!\n}\n\ntype Milestone {\n  id: OID!\n  sequenceCode: String!\n  title: String!\n  description: String!\n  deliveryTarget: String!\n  scope: DeliverablesSet\n  coordinators: [ID!]!\n  budget: Float\n}\n\ntype DeliverablesSet {\n  deliverables: [OID!]!\n  status: DeliverableSetStatus!\n  progress: Progress!\n  deliverablesCompleted: DeliverablesCompleted!\n}\n\ntype DeliverablesCompleted {\n  total: Int!\n  completed: Int!\n}\n\nenum DeliverableSetStatus {\n  DRAFT\n  TODO\n  IN_PROGRESS\n  FINISHED\n  CANCELED\n}",
        },
        local: {
          examples: [],
          initialValue: '""',
          schema: "",
        },
      },
      version: 1,
    },
  ],
};
