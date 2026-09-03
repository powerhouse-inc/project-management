/**
 * Validation, cascades and edit semantics added when the reducer gaps were
 * closed: duplicate ids, referential integrity of sets and agents, progress
 * and money bounds, and "explicit null keeps / empty string clears" edits.
 */
import {
  addAgent,
  addCoordinator,
  addDeliverable,
  addDeliverableInSet,
  addKeyResult,
  addMilestone,
  addMilestoneDeliverable,
  addProject,
  addProjectDeliverable,
  addRoadmap,
  editDeliverable,
  editKeyResult,
  editMilestone,
  editRoadmap,
  removeAgent,
  removeDeliverable,
  setDeliverableBudgetAnchorProject,
  setDeliverableProgress,
  setProjectMargin,
  setProjectTotalBudget,
  updateProject,
  updateProjectOwner,
  utils,
} from "document-models/scope-of-work/v1";
import { describe, expect, it } from "vitest";
import {
  binaryProgress,
  percentageProgress,
} from "../src/reducers/progress.js";
import {
  apply,
  craft,
  errors,
  lastError,
  rawDeliverable,
  rawMilestone,
  rawProject,
  rawRoadmap,
  state,
  type Doc,
} from "./reducer-test-helpers.js";

const deliverable = (doc: Doc, id: string) =>
  state(doc).deliverables.find((d) => d.id === id);
const project = (doc: Doc, id = "p1") =>
  state(doc).projects.find((p) => p.id === id);
const milestone = (doc: Doc, id: string) =>
  state(doc)
    .roadmaps.flatMap((r) => r.milestones)
    .find((m) => m.id === id);

/** roadmap r1 / milestone m1, project p1, standalone deliverable d1, agent alice */
const base = () =>
  apply(
    utils.createDocument(),
    addAgent({ id: "alice", name: "Alice" }),
    addRoadmap({ id: "r1", title: "R" }),
    addMilestone({
      id: "m1",
      roadmapId: "r1",
      title: "M",
      sequenceCode: "M1",
      description: "d",
      deliveryTarget: "2026",
    }),
    addProject({
      id: "p1",
      code: "P1",
      title: "P",
      slug: "p",
      abstract: "a",
      imageUrl: "https://img.example/p.png",
    }),
    addDeliverable({ id: "d1", title: "D" }),
  );

describe("duplicate ids are rejected", () => {
  it("for every ADD_* operation, leaving state untouched", () => {
    const doc = apply(
      base(),
      addProjectDeliverable({
        projectId: "p1",
        deliverableId: "pd",
        title: "x",
      }),
      addMilestoneDeliverable({
        milestoneId: "m1",
        deliverableId: "md",
        title: "x",
      }),
      addKeyResult({ id: "kr", deliverableId: "d1", title: "x" }),
      // duplicates ↓
      addAgent({ id: "alice", name: "Impostor" }),
      addRoadmap({ id: "r1", title: "dup" }),
      addMilestone({ id: "m1", roadmapId: "r1" }),
      addProject({ id: "p1", code: "dup", title: "dup" }),
      addDeliverable({ id: "d1" }),
      addProjectDeliverable({
        projectId: "p1",
        deliverableId: "d1",
        title: "dup",
      }),
      addMilestoneDeliverable({
        milestoneId: "m1",
        deliverableId: "pd",
        title: "dup",
      }),
      addKeyResult({ id: "kr", deliverableId: "d1", title: "dup" }),
    );

    expect(errors(doc)).toStrictEqual([
      "Agent with ID alice already exists",
      "Roadmap with ID r1 already exists",
      "Milestone with ID m1 already exists",
      "Project with ID p1 already exists",
      "Deliverable with ID d1 already exists",
      "Deliverable with ID d1 already exists",
      "Deliverable with ID pd already exists",
      "Key result with ID kr already exists",
    ]);
    expect(state(doc).contributors).toHaveLength(1);
    expect(state(doc).roadmaps).toHaveLength(1);
    expect(milestone(doc, "m1")?.title).toBe("M");
    expect(state(doc).projects).toHaveLength(1);
    expect(state(doc).deliverables.map((d) => d.id)).toStrictEqual([
      "d1",
      "pd",
      "md",
    ]);
    expect(deliverable(doc, "d1")?.keyResults).toHaveLength(1);
  });
});

describe("sets only accept deliverables that exist", () => {
  it("rejects an unknown id on both the milestone and the project path", () => {
    const doc = apply(
      base(),
      addDeliverableInSet({ deliverableId: "ghost", milestoneId: "m1" }),
      addDeliverableInSet({ deliverableId: "ghost", projectId: "p1" }),
      addDeliverableInSet({ deliverableId: "d1", milestoneId: "m1" }),
    );

    expect(errors(doc)).toStrictEqual([
      "Deliverable ghost not found",
      "Deliverable ghost not found",
    ]);
    expect(milestone(doc, "m1")?.scope?.deliverables).toStrictEqual(["d1"]);
    expect(project(doc)?.scope?.deliverables).toStrictEqual([]);
  });
});

describe("progress bounds", () => {
  it("accepts the percentage boundaries and rejects values outside 0-100", () => {
    const doc = apply(
      base(),
      setDeliverableProgress({ id: "d1", workProgress: { percentage: 0 } }),
      setDeliverableProgress({ id: "d1", workProgress: { percentage: -1 } }),
      setDeliverableProgress({ id: "d1", workProgress: { percentage: 101 } }),
    );

    expect(errors(doc)).toStrictEqual([
      "Percentage must be between 0 and 100",
      "Percentage must be between 0 and 100",
    ]);
    expect(deliverable(doc, "d1")).toMatchObject({
      status: "IN_PROGRESS",
      workProgress: percentageProgress(0),
    });
  });

  it("rejects negative or over-completed story points", () => {
    const doc = apply(
      base(),
      setDeliverableProgress({
        id: "d1",
        workProgress: { storyPoints: { total: -1, completed: 0 } },
      }),
      setDeliverableProgress({
        id: "d1",
        workProgress: { storyPoints: { total: 5, completed: -1 } },
      }),
      setDeliverableProgress({
        id: "d1",
        workProgress: { storyPoints: { total: 5, completed: 6 } },
      }),
    );

    expect(errors(doc)).toHaveLength(3);
    expect(new Set(errors(doc)).size).toBe(1);
    expect(deliverable(doc, "d1")?.workProgress).toBeNull();
  });

  it("refuses to record progress on a CANCELED or WONT_DO deliverable", () => {
    const doc = apply(
      base(),
      addDeliverable({ id: "d2", status: "WONT_DO" }),
      editDeliverable({ id: "d1", status: "CANCELED" }),
      setDeliverableProgress({ id: "d1", workProgress: { percentage: 10 } }),
      setDeliverableProgress({ id: "d2", workProgress: { done: true } }),
    );

    expect(errors(doc)).toStrictEqual([
      "Deliverable d1 is closed",
      "Deliverable d2 is closed",
    ]);
    expect(deliverable(doc, "d1")).toMatchObject({
      status: "CANCELED",
      workProgress: null,
    });
    expect(deliverable(doc, "d2")).toMatchObject({
      status: "WONT_DO",
      workProgress: null,
    });
  });
});

describe("money bounds", () => {
  it("rejects negative unit cost, quantity or margin on an anchor", () => {
    const doc = apply(
      base(),
      setDeliverableBudgetAnchorProject({ deliverableId: "d1", unitCost: -1 }),
      setDeliverableBudgetAnchorProject({ deliverableId: "d1", quantity: -1 }),
      setDeliverableBudgetAnchorProject({ deliverableId: "d1", margin: -1 }),
    );

    expect(errors(doc)).toHaveLength(3);
    expect(deliverable(doc, "d1")?.budgetAnchor).toMatchObject({
      unitCost: 0,
      quantity: 0,
      margin: 0,
    });
  });

  it("builds a complete anchor from defaults when the deliverable had none, and null clears the project", () => {
    const doc = craft({
      deliverables: [rawDeliverable({ id: "d1", budgetAnchor: null })],
    });

    const next = apply(
      doc,
      setDeliverableBudgetAnchorProject({ deliverableId: "d1", unitCost: 5 }),
      setDeliverableBudgetAnchorProject({
        deliverableId: "d1",
        project: "p9",
        unit: "StoryPoints",
        quantity: 2,
        margin: 10,
      }),
      setDeliverableBudgetAnchorProject({ deliverableId: "d1", project: null }),
    );

    expect(errors(next)).toStrictEqual([]);
    expect(deliverable(next, "d1")?.budgetAnchor).toStrictEqual({
      project: null,
      unit: "StoryPoints",
      unitCost: 5,
      quantity: 2,
      margin: 10,
    });
  });

  it("rejects a negative project margin", () => {
    const doc = apply(
      base(),
      addProjectDeliverable({
        projectId: "p1",
        deliverableId: "pd",
        title: "x",
      }),
      setProjectMargin({ projectId: "p1", margin: -5 }),
    );

    expect(lastError(doc)).toBe("Margin must be zero or positive");
  });

  it("rejects a negative total budget or one below the total cost", () => {
    const doc = apply(
      base(),
      addProjectDeliverable({
        projectId: "p1",
        deliverableId: "pd",
        title: "x",
      }),
      setDeliverableBudgetAnchorProject({
        deliverableId: "pd",
        unitCost: 100,
        quantity: 3,
      }),
      setProjectTotalBudget({ projectId: "p1", totalBudget: -1 }),
      setProjectTotalBudget({ projectId: "p1", totalBudget: 299 }),
    );

    expect(errors(doc)).toStrictEqual([
      "Total budget must be zero or positive",
      "Total budget cannot be lower than the total cost (300)",
    ]);
    expect(project(doc)?.budget).toBe(300);
  });

  it("allows a zero budget on a project with no cost, including one without a scope", () => {
    const doc = craft({
      projects: [rawProject({ id: "p-noscope", scope: null })],
    });

    const next = apply(
      base(),
      addProjectDeliverable({
        projectId: "p1",
        deliverableId: "pd",
        title: "x",
      }),
      setProjectTotalBudget({ projectId: "p1", totalBudget: 0 }),
    );
    expect(errors(next)).toStrictEqual([]);
    expect(project(next)?.budget).toBe(0);

    const noScope = apply(
      doc,
      setProjectTotalBudget({ projectId: "p-noscope", totalBudget: 0 }),
    );
    expect(errors(noScope)).toStrictEqual([]);
  });
});

describe("cascades", () => {
  it("removing an agent clears every owner and coordinator reference to it", () => {
    const doc = apply(
      base(),
      addAgent({ id: "bob", name: "Bob" }),
      addProjectDeliverable({
        projectId: "p1",
        deliverableId: "pd",
        title: "x",
      }),
      editDeliverable({ id: "d1", owner: "alice" }),
      editDeliverable({ id: "pd", owner: "bob" }),
      updateProjectOwner({ id: "p1", projectOwner: "alice" }),
      addCoordinator({ id: "alice", milestoneId: "m1" }),
      addCoordinator({ id: "bob", milestoneId: "m1" }),
      removeAgent({ id: "alice" }),
    );

    expect(errors(doc)).toStrictEqual([]);
    expect(deliverable(doc, "d1")?.owner).toBeNull();
    expect(deliverable(doc, "pd")?.owner).toBe("bob");
    expect(project(doc)?.projectOwner).toBeNull();
    expect(milestone(doc, "m1")?.coordinators).toStrictEqual(["bob"]);
  });

  it("deleting a deliverable skips containers that have no scope", () => {
    const doc = craft({
      deliverables: [rawDeliverable({ id: "d1" })],
      projects: [rawProject({ id: "p-noscope", scope: null })],
      roadmaps: [
        rawRoadmap({
          id: "r1",
          milestones: [rawMilestone({ id: "m-noscope", scope: null })],
        }),
      ],
    });

    const next = apply(doc, removeDeliverable({ id: "d1" }));

    expect(errors(next)).toStrictEqual([]);
    expect(state(next).deliverables).toStrictEqual([]);
  });
});

describe("edit semantics: explicit null keeps, empty string clears", () => {
  it("updateProject sets every field, ignores null on required fields, accepts null on optional ones", () => {
    const doc = apply(
      base(),
      updateProject({
        id: "p1",
        title: "T2",
        code: "C2",
        slug: "s2",
        abstract: "A2",
        imageUrl: "https://img.example/2.png",
        budgetType: "OPEX",
        currency: "EUR",
        budget: 12,
      }),
      updateProject({ id: "p1" }),
      updateProject({
        id: "p1",
        title: null,
        code: null,
        slug: null,
        abstract: null,
        imageUrl: null,
        budgetType: null,
        currency: null,
        budget: null,
      }),
    );

    expect(errors(doc)).toStrictEqual([]);
    expect(project(doc)).toMatchObject({
      title: "T2",
      code: "C2",
      slug: "s2",
      abstract: null,
      imageUrl: null,
      budgetType: null,
      currency: null,
      budget: null,
    });
  });

  it("editMilestone and editRoadmap clear text with an empty string but keep it on null", () => {
    const doc = apply(
      base(),
      editMilestone({
        id: "m1",
        roadmapId: "r1",
        title: "",
        sequenceCode: "",
        description: "",
        deliveryTarget: "",
      }),
      editRoadmap({ id: "r1", title: "", slug: "", description: "" }),
      editMilestone({
        id: "m1",
        roadmapId: "r1",
        title: null,
        sequenceCode: null,
        description: null,
        deliveryTarget: null,
      }),
      editRoadmap({ id: "r1", title: null, slug: null, description: null }),
    );

    expect(errors(doc)).toStrictEqual([]);
    expect(milestone(doc, "m1")).toMatchObject({
      title: "",
      sequenceCode: "",
      description: "",
      deliveryTarget: "",
    });
    expect(state(doc).roadmaps[0]).toMatchObject({
      title: "",
      slug: "",
      description: "",
    });
  });

  it("editKeyResult clears with an empty string and keeps on null", () => {
    const doc = apply(
      base(),
      addKeyResult({
        id: "kr",
        deliverableId: "d1",
        title: "Launch",
        link: "https://a.example",
      }),
      editKeyResult({ id: "kr", deliverableId: "d1", title: "" }),
      editKeyResult({ id: "kr", deliverableId: "d1", title: null, link: null }),
    );

    expect(errors(doc)).toStrictEqual([]);
    expect(deliverable(doc, "d1")?.keyResults).toStrictEqual([
      { id: "kr", title: "", link: "https://a.example" },
    ]);
  });

  it("binary progress still completes a deliverable", () => {
    const doc = apply(
      base(),
      setDeliverableProgress({ id: "d1", workProgress: { done: true } }),
    );
    expect(deliverable(doc, "d1")).toMatchObject({
      status: "DELIVERED",
      workProgress: binaryProgress(true),
    });
  });
});
