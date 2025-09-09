export type ErrorCode = "ProjectIdAlreadyExists";

export interface ReducerError {
  errorCode: ErrorCode;
}

export class ProjectIdAlreadyExists extends Error implements ReducerError {
  errorCode = "ProjectIdAlreadyExists" as ErrorCode;
  constructor(message = "ProjectIdAlreadyExists") {
    super(message);
  }
}

export const errors = {
  AddProject: {
    ProjectIdAlreadyExists,
  },
  UpdateProject: {
  },
  UpdateProjectOwner: {
    ProjectIdAlreadyExists,
  },
};
