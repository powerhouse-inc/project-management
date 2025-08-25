# Powerhouse Project Management Package 

### Project Summary: Powerhouse Project Management Package

  This is a Scope of Work (SoW) document model and editor package built for the Powerhouse ecosystem. It's
  designed to provide a structured framework for project management with the following key aspects:

  **Core Purpose**

  The project defines a comprehensive document model for managing Scope of Work documents that help organizations
  plan, execute, and track contributor work. It enables structured project management with deliverables, roadmaps,
   milestones, and budget tracking.

  **Key Components**

  1. Document Model (document-models/scope-of-work/)
    • Defines the data structure and operations for Scope of Work documents
    • Built using Powerhouse's document model framework
    • Includes GraphQL schema definitions and TypeScript types
  2. Editor Interface (editors/scope-of-work/)
    • React-based UI components for editing SoW documents
    • Sidebar-based interface for managing different aspects of projects
    • Uses Tailwind CSS ^4.1.4 for styling
  3. Core Data Entities:
    • Projects: Budget anchors with ownership, budgets, and expenditure tracking
    • Deliverables: Concrete work items with progress tracking (story points, percentages, or binary completion)
    • Roadmaps & Milestones: Strategic planning with delivery targets and coordinator assignments
    • Contributors/Agents: Human, group, or AI contributors who can be assigned to work
    • Key Results: Measurable outcomes linked to deliverables


  **Key Features**

  • Project-based budgeting with different budget types (OPEX, CAPEX, CONTINGENCY, OVERHEAD)
  • Multi-currency support (DAI, USDS, EUR, USD)
  • Progress tracking with multiple methods (story points, percentages, binary)
  • Status management throughout the project lifecycle
  • Contributor management with role assignments
  • Budget anchoring linking deliverables to projects for cost tracking


  **Technical Architecture**

  • Built as an NPM package (@powerhousedao/project-management)
  • Uses Powerhouse's document model framework for state management
  • React-based editor components
  • GraphQL schema for data modeling
  • TypeScript for type safety
  • Vitest for testing


  **Use Case**

  This package is designed for organizations that need to:
  • Structure and plan complex project work
  • Track deliverables and their progress
  • Manage budgets across multiple projects
  • Coordinate teams and assign responsibilities
  • Create roadmaps with milestone-based delivery
  • Maintain oversight of project execution and expenditure

  The system appears to be particularly suited for decentralized organizations or project-based work environments
  where clear scope definition, budget tracking, and contributor coordination are essential.

