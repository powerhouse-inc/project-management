/**
 * This is a scaffold file meant for customization:
 * - change it by adding new tests or modifying the existing ones
 */

import { describe, it, expect, beforeEach } from "vitest";
import { generateMock } from "@powerhousedao/codegen";
import utils from "../../gen/utils.js";
import {
  z,
  type AddProjectInput,
  type UpdateProjectInput,
  type UpdateProjectOwnerInput,
} from "../../gen/schema/index.js";
import { reducer } from "../../gen/reducer.js";
import * as creators from "../../gen/projects/creators.js";
import type { ScopeOfWorkDocument } from "../../gen/types.js";

describe("Projects Operations", () => {
  let document: ScopeOfWorkDocument;

  beforeEach(() => {
    document = utils.createDocument();
  });

  it("should handle addProject operation", () => {
    const input: AddProjectInput = {
      id: "1",
      code: "1",
      title: "Project 1",
      projectOwner: "Project Owner 1",
      abstract: "Abstract 1",
      imageUrl: "https://example.com/image.png",
      budgetType: "CAPEX",
    }

    const updatedDocument = reducer(document, creators.addProject(input));

    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].type).toBe("ADD_PROJECT");
    expect(updatedDocument.operations.global[0].input).toStrictEqual(input);
    expect(updatedDocument.operations.global[0].index).toEqual(0);
    expect(updatedDocument.state.global.projects).toHaveLength(1);
    expect(updatedDocument.state.global.projects[0].id).toStrictEqual(input.id);
  });
  it("should handle updateProject operation", () => {

    const addProjectInput: AddProjectInput = {
      id: "1",
      code: "1",
      title: "Project 1",
      projectOwner: "Project Owner 1",
      abstract: "Abstract 1",
    }
    let updatedDocument = reducer(document, creators.addProject(addProjectInput));

    const input: UpdateProjectInput = {
      id: "1",
      code: "1",
      title: "Updated Project 1",
      abstract: "Updated Abstract 1",
      imageUrl: "https://example.com/updated-image.png",
      budgetType: "OPEX",
    };

    updatedDocument = reducer(updatedDocument, creators.updateProject(input));

    expect(updatedDocument.operations.global).toHaveLength(2);
    expect(updatedDocument.operations.global[1].type).toBe("UPDATE_PROJECT");
    expect(updatedDocument.operations.global[1].input).toStrictEqual(input);
    expect(updatedDocument.operations.global[1].index).toEqual(1);
    expect(updatedDocument.state.global.projects).toHaveLength(1);
    expect(updatedDocument.state.global.projects[0].title).toStrictEqual(input.title);
  });
  it("should handle updateProjectOwner operation", () => {
    const addProjectInput: AddProjectInput = {
      id: "1",
      code: "1",
      title: "Project 1",
      projectOwner: "Project Owner 1",
      abstract: "Abstract 1",
    }
    let updatedDocument = reducer(document, creators.addProject(addProjectInput));

    const input: UpdateProjectOwnerInput = {
      id: "1",
      projectOwner: "New Project Owner",
    };

    updatedDocument = reducer(
      updatedDocument,
      creators.updateProjectOwner(input),
    );

    expect(updatedDocument.operations.global).toHaveLength(2);
    expect(updatedDocument.operations.global[1].type).toBe(
      "UPDATE_PROJECT_OWNER",
    );
    expect(updatedDocument.operations.global[1].input).toStrictEqual(input);
    expect(updatedDocument.operations.global[1].index).toEqual(1);
    expect(updatedDocument.state.global.projects).toHaveLength(1);
    expect(updatedDocument.state.global.projects[0]).toStrictEqual({
      ...updatedDocument.state.global.projects[0],
      projectOwner: input.projectOwner,
    });
  });
  it("should handle removeProject operation", () => {
    const addProjectInput: AddProjectInput = {
      id: "1",
      code: "1",
      title: "Project 1",
      projectOwner: "Project Owner 1",
      abstract: "Abstract 1",
    }
    let updatedDocument = reducer(document, creators.addProject(addProjectInput));

    updatedDocument = reducer(updatedDocument, creators.removeProject({ projectId: "1" }));

    expect(updatedDocument.operations.global).toHaveLength(2);
    expect(updatedDocument.operations.global[1].type).toBe("REMOVE_PROJECT");
    expect(updatedDocument.operations.global[1].input).toStrictEqual({ projectId: "1" });
    expect(updatedDocument.operations.global[1].index).toEqual(1);
    expect(updatedDocument.state.global.projects).toHaveLength(0);
  });
});
