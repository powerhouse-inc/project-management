import type { DocumentModelState } from "document-model";

export const documentModel: DocumentModelState = {
  id: "powerhouse/scopeofwork",
  name: "ScopeOfWork",
  extension: ".phdm",
  description:
    "The Scope of Work model defines a structured plan for executing contributor work; it includes deliverables and roadmaps with milestones with each being linked to ownership, progress tracking.",
  author: {
    name: "Powerhouse",
    website: "https://powerhouse.inc",
  },
  specifications: [
    {
      version: 1,
      changeLog: [],
      state: {
        global: {
          schema:
            "type ScopeOfWorkState {\n  title: String!\n  description: String!\n  status: ScopeOfWorkStatus!\n  deliverables: [Deliverable!]!\n  roadmaps: [Roadmap!]!\n  agents: [Agent!]!\n}\n\nenum ScopeOfWorkStatus {\n  DRAFT\n  SUBMITTED\n  REJECTED\n  APPROVED\n  CANCELED\n}\n\ntype Agent {\n  id: ID!\n  agentType: AgentType!\n  name: String!\n  code: String!\n  imageUrl: String\n}\n\nenum AgentType {\n  HUMAN\n  GROUP\n  AI\n}\n\ntype Deliverable {\n  id: OID!\n  owner: ID\n  title: String!\n  code: String!\n  description: String!\n  status: DeliverableStatus!\n  workProgress: Progress\n  keyResults: [KeyResult!]!\n}\n\nenum DeliverableStatus {\n  WONT_DO\n  DRAFT\n  TODO\n  BLOCKED\n  IN_PROGRESS\n  DELIVERED\n  CANCELED\n}\n\nunion Progress = StoryPoint | Percentage | Binary\n\ntype Percentage {\n  value: Float!\n}\n\ntype Binary {\n  isBinary: Boolean\n  \n}\n\ntype StoryPoint {\n   total: Int!\n   completed: Int!\n}\n\ntype KeyResult {\n  id: OID!\n  title: String!\n  link: String!\n}\n\ntype Roadmap {\n  id: OID!\n  slug: String!\n  title: String!\n  description: String!\n  milestones: [Milestone!]!\n}\n\ntype Milestone {\n  id: OID!\n  sequenceCode: String!\n  title: String!\n  description: String!\n  deliveryTarget: String!\n  scope: DeliverablesSet\n  estimatedBudgetCap: String!\n  coordinators: [ID!]!\n}\n\ntype DeliverablesSet {\n  deliverables: [OID!]!\n  status: DeliverableSetStatus!\n  progress: Progress!\n  deliverablesCompleted: DeliverablesCompleted!\n}\n\ntype DeliverablesCompleted {\n  total: Int!\n  completed: Int!\n}\n\nenum DeliverableSetStatus {\n  DRAFT\n  TODO\n  IN_PROGRESS\n  FINISHED\n  CANCELED\n}",
          initialValue:
            '"{\\n  \\"title\\": \\"\\",\\n  \\"description\\": \\"\\",\\n  \\"deliverables\\": [],\\n  \\"roadmaps\\": [],\\n  \\"agents\\": []\\n}"',
          examples: [],
        },
        local: {
          schema: "",
          initialValue: '""',
          examples: [],
        },
      },
      modules: [
        {
          id: "70ad1129-4aa4-4e2a-842e-e85eeaa2ec4c",
          name: "scope_of_work",
          description: "",
          operations: [
            {
              id: "8a9f1559-3aba-48e3-97fd-ceafbcc28b06",
              name: "EDIT_SCOPE_OF_WORK",
              description:
                "This operation allows a user to edit the basic details of a Scope of Work (SoW) document. ",
              schema:
                "input EditScopeOfWorkInput {\n    title: String\n    description: String\n\tstatus: ScopeOfWorkStatusInput #defaults to DRAFT\n}\n\nenum ScopeOfWorkStatusInput {\n  DRAFT\n  SUBMITTED\n  REJECTED\n  APPROVED\n  CANCELED\n}",
              template: "",
              reducer: "",
              errors: [
                {
                  id: "2288fd6a-3a01-46e9-88ba-63d9e265c9a1",
                  name: "InvalidStatusTransition",
                  code: "",
                  description: "",
                  template: "",
                },
                {
                  id: "c678f4c1-22a5-46e6-93c7-65fde23dbfa1",
                  name: "MissingRequiredFields",
                  code: "",
                  description: "",
                  template: "",
                },
                {
                  id: "be7c7aea-55d9-4c83-98e0-250e00d3b25d",
                  name: "UnauthorizedEdit",
                  code: "",
                  description: "",
                  template: "",
                },
              ],
              examples: [],
              scope: "global",
            },
          ],
        },
        {
          id: "6e592f85-6188-4111-887b-fa689c651b37",
          name: "deliverables",
          description: "",
          operations: [
            {
              id: "9a986a3a-a546-494e-b008-d31cdf125383",
              name: "ADD_DELIVERABLE",
              description:
                "This operation is used to create a new deliverable. ",
              schema:
                "input AddDeliverableInput {\n  id: OID!\n  owner: ID\n  title: String\n  code: String\n  description: String\n  status: DeliverableStatusInput\n}\n\nenum DeliverableStatusInput {\n  WONT_DO\n  DRAFT\n  TODO\n  BLOCKED\n  IN_PROGRESS\n  DELIVERED\n  CANCELED\n}",
              template: "",
              reducer: "",
              errors: [],
              examples: [],
              scope: "global",
            },
            {
              id: "0567776c-2778-43a5-86b8-0035a3b80702",
              name: "REMOVE_DELIVERABLE",
              description: "",
              schema: "input RemoveDeliverableInput {\n  id: OID!\n}",
              template: "",
              reducer: "",
              errors: [],
              examples: [],
              scope: "global",
            },
            {
              id: "e031053f-f1c8-40b5-93fb-47d68161ecca",
              name: "EDIT_DELIVERABLE",
              description:
                "This operation allows a user to edit the core attributes of a deliverable, a concrete piece of work within a project or a milestone. Deliverables are the building blocks of execution, typically assigned to contributors or teams.",
              schema:
                "input EditDeliverableInput {\n  id: OID!\n  owner: ID\n  title: String\n  code: String\n  description: String\n  status: DeliverableStatusInput\n}\n\nenum DeliverableStatusInput {\n  WONT_DO\n  DRAFT\n  TODO\n  BLOCKED\n  IN_PROGRESS\n  DELIVERED\n  CANCELED\n}",
              template: "",
              reducer: "",
              errors: [
                {
                  id: "39018599-f76c-4a20-8b5b-f14fc174cabc",
                  name: "DeliverableNotFound",
                  code: "",
                  description: "",
                  template: "",
                },
                {
                  id: "6ddcde0e-f7dd-4ce6-ae8b-09b485053013",
                  name: "InvalidStatusTransition",
                  code: "",
                  description: "",
                  template: "",
                },
                {
                  id: "b71cc9ac-4f8e-4717-9bed-7343e8b72472",
                  name: "MissingRequiredFields",
                  code: "",
                  description: "",
                  template: "",
                },
                {
                  id: "e2de6790-8eba-49e2-9ee1-5616690a8f90",
                  name: "InvalidCodeFormat",
                  code: "",
                  description: "",
                  template: "",
                },
                {
                  id: "ac306312-5a25-4f0f-847f-67afb2cd6657",
                  name: "OwnerIdNotRecognized",
                  code: "",
                  description: "",
                  template: "",
                },
              ],
              examples: [],
              scope: "global",
            },
            {
              id: "505fb5d9-1698-428c-935c-a0e64cf48a01",
              name: "SET_DELIVERABLE_PROGRESS",
              description: "",
              schema:
                "input SetDeliverableProgressInput {\n  id: OID! #deliverable id\n  workProgress: ProgressInput!\n}\n\ninput PercentageInput {\n  value: Float!\n}\n\ninput StoryPointInput {\n  total: Int!\n  completed: Int!\n}\n\ninput BinaryInput {\n  isBinary: Boolean!\n}\n\ntype ProgressInput {\n  percentage: PercentageInput\n  storyPoint: StoryPointInput\n  binary: BinaryInput\n}",
              template: "",
              reducer: "",
              errors: [],
              examples: [],
              scope: "global",
            },
            {
              id: "166929bc-1416-4bbb-812d-5fe09fb81884",
              name: "ADD_KEY_RESULT",
              description:
                "This operation allows a user to add a key result to a specific deliverable. Key results are measurable outcomes or indicators that help track progress on a deliverable. ",
              schema:
                "input AddKeyResultInput {\n  id: OID!\n  deliverableId:OID!\n  title: String!\n  link: String\n}",
              template: "",
              reducer: "",
              errors: [
                {
                  id: "693a6eb0-6a5a-445e-9387-b80a08b83992",
                  name: "DeliverableNotFound",
                  code: "",
                  description: "",
                  template: "",
                },
                {
                  id: "513a0e59-711a-44a7-bdcb-067b753464e8",
                  name: "MissingRequiredFields",
                  code: "",
                  description: "",
                  template: "",
                },
                {
                  id: "14bf5db1-2a23-4879-8e7b-b9fdb50dde94",
                  name: "InvalidLinkFormat",
                  code: "",
                  description: "",
                  template: "",
                },
              ],
              examples: [],
              scope: "global",
            },
            {
              id: "7a692317-2ad3-4392-8935-74a9d2650874",
              name: "REMOVE_KEY_RESULT",
              description: "",
              schema:
                "input RemoveKeyResultInput {\n  id: OID!\n  deliverableId:OID!\n}",
              template: "",
              reducer: "",
              errors: [],
              examples: [],
              scope: "global",
            },
          ],
        },
        {
          id: "f68517e0-68d4-4c88-9fdd-108ca55874e5",
          name: "roadmaps",
          description: "",
          operations: [
            {
              id: "4d510d30-a82d-48be-b643-c22c50b6f19e",
              name: "ADD_ROADMAP",
              description: "",
              schema:
                "input AddRoadmapInput {\n  id: OID!\n  title: String!\n  slug: String\n  description: String\n}",
              template: "",
              reducer: "",
              errors: [
                {
                  id: "fbe09a66-ad11-4f05-9522-44e2173b5998",
                  name: "MissingRequiredId",
                  code: "",
                  description: "",
                  template: "",
                },
                {
                  id: "023322c9-a90f-4b3c-9b71-a43da50edd47",
                  name: "DuplicateRoadmapId",
                  code: "",
                  description: "",
                  template: "",
                },
                {
                  id: "ddabc1b4-9fe7-4557-a063-789b2db4fb24",
                  name: "InvalidSlugFormat",
                  code: "",
                  description: "",
                  template: "",
                },
              ],
              examples: [],
              scope: "global",
            },
            {
              id: "ef0ac627-a852-4e08-8c75-53b23b34c298",
              name: "REMOVE_ROADMAP",
              description: "",
              schema: "input RemoveRoadmapInput {\n  id: OID!\n}",
              template: "",
              reducer: "",
              errors: [],
              examples: [],
              scope: "global",
            },
            {
              id: "7b1863fe-fc12-4855-949c-869ce19c55e1",
              name: "EDIT_ROADMAP",
              description:
                "This operation allows a user to edit the details of a roadmap document, which outlines the structure ",
              schema:
                'input EditRoadmapInput {\n  id: OID!\n  title: String \n  slug: String #computed title: "The Logical Structure of  Atlas"\n              # id: "abcd1234" #=> slug: "the-logical-structure-of-atlas-abcd1234"\n  description: String\n}',
              template: "",
              reducer: "",
              errors: [],
              examples: [],
              scope: "global",
            },
          ],
        },
        {
          id: "016b8c61-35c7-4962-908d-e47666a68721",
          name: "milestones",
          description: "",
          operations: [
            {
              id: "2aee07b8-4836-4468-a9ad-a2ff6075309c",
              name: "ADD_MILESTONE",
              description: "",
              schema:
                "input AddMilestoneInput {\n  id: OID!\n  roadmapId:OID!\n  sequenceCode: String\n  title: String\n  description: String\n  deliveryTarget: String\n  estimatedBudgetCap: String\n}",
              template: "",
              reducer: "",
              errors: [],
              examples: [],
              scope: "global",
            },
            {
              id: "b2662adc-bf97-486f-a012-6ddda9266768",
              name: "REMOVE_MILESTONE",
              description: "",
              schema:
                "input RemoveMilestoneInput {\n  id: OID!\n  roadmapId:OID!\n}",
              template: "",
              reducer: "",
              errors: [],
              examples: [],
              scope: "global",
            },
            {
              id: "8d838a5d-8901-43db-8130-5adde9d0a025",
              name: "EDIT_MILESTONE",
              description: "",
              schema:
                "input EditMilestoneInput {\n  id: OID!\n  roadmapId: OID!\n  sequenceCode: String\n  title: String\n  description: String\n  deliveryTarget: String\n  estimatedBudgetCap: String\n}",
              template: "",
              reducer: "",
              errors: [],
              examples: [],
              scope: "global",
            },
            {
              id: "0db5f01b-33b5-486b-9e67-a95ebea85107",
              name: "ADD_COORDINATOR",
              description:
                "This operation allows a user to assign a contributor as a coordinator for a specific milestone. Coordinators are the people responsible for ensuring the milestone gets delivered; they’re often leads, facilitators, or project managers.\n\n",
              schema:
                "input AddCoordinatorInput {\n  id: ID! \n  milestoneId: OID!\n}",
              template: "",
              reducer: "",
              errors: [],
              examples: [],
              scope: "global",
            },
            {
              id: "6472175b-feb2-4ec5-b28d-2f0b46ca6072",
              name: "REMOVE_COORDINATOR",
              description: "",
              schema:
                "input RemoveCoordinatorInput {\n  id: ID! \n  milestoneId: OID! # Coordinator can potentially be coordinating multiple milestones/roadmaps. \n}",
              template: "",
              reducer: "",
              errors: [],
              examples: [],
              scope: "global",
            },
          ],
        },
        {
          id: "52a1e993-adf3-4a2c-acc1-41f0336203ee",
          name: "deliverables_set",
          description: "",
          operations: [
            {
              id: "68ba1e27-8979-4762-a779-f1f2ef86500e",
              name: "EDIT_DELIVERABLES_SET",
              description: "",
              schema:
                "input EditDeliverablesSetInput {\n  milestoneId: ID!\n  status: DeliverableSetStatusInput\n  deliverablesCompleted: DeliverablesCompletedInput\n}\n\nenum DeliverableSetStatusInput {\n  DRAFT\n  TODO\n  IN_PROGRESS\n  FINISHED\n  CANCELED\n}\n\ntype DeliverablesCompletedInput {\n  total: Int!\n  completed: Int!\n}",
              template: "",
              reducer: "",
              errors: [],
              examples: [],
              scope: "global",
            },
            {
              id: "34a36572-1ad4-4c32-ad31-86988e93a31a",
              name: "ADD_DELIVERABLE_IN_SET",
              description: "",
              schema:
                "input AddDeliverableInSetInput {\n  milestoneId: ID!\n  deliverableId: OID!\n}",
              template: "",
              reducer: "",
              errors: [],
              examples: [],
              scope: "global",
            },
            {
              id: "94e5b395-9798-48ae-921e-70983f17155d",
              name: "REMOVE_DELIVERABLE_IN_SET",
              description: "",
              schema:
                "input RemoveDeliverableInSetInput {\n  milestoneId: ID!\n  deliverableId: OID!\n}",
              template: "",
              reducer: "",
              errors: [],
              examples: [],
              scope: "global",
            },
            {
              id: "a3fba990-3d5a-481b-a375-e828d2b7723f",
              name: "SET_PROGRESS_IN_DELIVERABLES_SET",
              description: "",
              schema:
                "input SetProgressInDeliverablesSetInput {\n  milestoneId: ID!\n  progress: ProgressInput!\n}\n\ninput PercentageInput {\n  value: Float!\n}\n\ninput StoryPointInput {\n  total: Int!\n  completed: Int!\n}\n\ninput BinaryInput {\n  isBinary: Boolean!\n}\n\ntype ProgressInput {\n  percentage: PercentageInput\n  storyPoint: StoryPointInput\n  binary: BinaryInput\n}",
              template: "",
              reducer: "",
              errors: [],
              examples: [],
              scope: "global",
            },
          ],
        },
        {
          id: "7f2db8cf-9fe9-4095-91f0-cfd61b43fc02",
          name: "agents",
          description: "",
          operations: [
            {
              id: "1273f82b-b6db-4504-bc4b-49fbdb2a2c68",
              name: "ADD_AGENT",
              description: "",
              schema:
                "input AddAgentInput {\n  id: ID!\n  name: String!\n  agentType: AgentTypeInput\n  code: String\n  imageUrl: String\n}\n\nenum AgentTypeInput {\n  HUMAN\n  GROUP\n  AI\n}",
              template: "",
              reducer: "",
              errors: [],
              examples: [],
              scope: "global",
            },
            {
              id: "eec0e5aa-b4c9-4e62-8f2e-4a36fbde6f96",
              name: "REMOVE_AGENT",
              description: "",
              schema: "input RemoveAgentInput {\n  id: OID!\n}",
              template: "",
              reducer: "",
              errors: [],
              examples: [],
              scope: "global",
            },
            {
              id: "33534820-0c51-4f04-8ad2-bb378fb9c60e",
              name: "EDIT_AGENT",
              description: "",
              schema:
                "input EditAgentInput {\n  id: ID!\n  name: String\n  agentType: AgentTypeInput\n  code: String\n  imageUrl: String\n}\nenum AgentTypeInput {\n  HUMAN\n  GROUP\n  AI\n}",
              template: "",
              reducer: "",
              errors: [],
              examples: [],
              scope: "global",
            },
          ],
        },
      ],
    },
  ],
};
