export type ErrorCode =
  | "ProjectIdAlreadyExists"
  | "ProjectCodeAlreadyExists"
  | "InvalidOwnerId"
  | "ProjectNotFound"
  | "InvalidProjectStatusForUpdate"
  | "ProjectCodeAlreadyExists"
  | "ProjectNotFound"
  | "InvalidAgentId"
  | "InvalidProjectStatusForOwnerUpdate"
  | "InsufficientPermissions";

export interface ReducerError {
  errorCode: ErrorCode;
}

export class ProjectIdAlreadyExists extends Error implements ReducerError {
  errorCode = "ProjectIdAlreadyExists" as ErrorCode;
  constructor(message = "ProjectIdAlreadyExists") {
    super(message);
  }
}

export class InvalidOwnerId extends Error implements ReducerError {
  errorCode = "InvalidOwnerId" as ErrorCode;
  constructor(message = "InvalidOwnerId") {
    super(message);
  }
}
export class InvalidProjectStatusForUpdate
  extends Error
  implements ReducerError
{
  errorCode = "InvalidProjectStatusForUpdate" as ErrorCode;
  constructor(message = "InvalidProjectStatusForUpdate") {
    super(message);
  }
}

export class ProjectCodeAlreadyExists extends Error implements ReducerError {
  errorCode = "ProjectCodeAlreadyExists" as ErrorCode;
  constructor(message = "ProjectCodeAlreadyExists") {
    super(message);
  }
}

export class ProjectNotFound extends Error implements ReducerError {
  errorCode = "ProjectNotFound" as ErrorCode;
  constructor(message = "ProjectNotFound") {
    super(message);
  }
}

export class InvalidAgentId extends Error implements ReducerError {
  errorCode = "InvalidAgentId" as ErrorCode;
  constructor(message = "InvalidAgentId") {
    super(message);
  }
}

export class InvalidProjectStatusForOwnerUpdate
  extends Error
  implements ReducerError
{
  errorCode = "InvalidProjectStatusForOwnerUpdate" as ErrorCode;
  constructor(message = "InvalidProjectStatusForOwnerUpdate") {
    super(message);
  }
}

export class InsufficientPermissions extends Error implements ReducerError {
  errorCode = "InsufficientPermissions" as ErrorCode;
  constructor(message = "InsufficientPermissions") {
    super(message);
  }
}

export const errors = {
  AddProject: {
    ProjectIdAlreadyExists,
    ProjectCodeAlreadyExists,
    InvalidOwnerId,
  },
  UpdateProject: {
    ProjectNotFound,
    InvalidProjectStatusForUpdate,
    ProjectCodeAlreadyExists,
  },
  UpdateProjectOwner: {
    ProjectNotFound,
    InvalidAgentId,
    InvalidProjectStatusForOwnerUpdate,
    InsufficientPermissions,
  },
};
