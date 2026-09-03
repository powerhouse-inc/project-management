export type ErrorCode =
  | "ProjectAlreadyExistsError"
  | "ProjectNotFoundError"
  | "InvalidProjectMarginError"
  | "InvalidProjectBudgetError"
  | "ProjectDeliverableAlreadyExistsError";

export interface ReducerError {
  errorCode: ErrorCode;
}

export class ProjectAlreadyExistsError extends Error implements ReducerError {
  errorCode = "ProjectAlreadyExistsError" as ErrorCode;
  constructor(message = "ProjectAlreadyExistsError") {
    super(message);
  }
}

export class ProjectNotFoundError extends Error implements ReducerError {
  errorCode = "ProjectNotFoundError" as ErrorCode;
  constructor(message = "ProjectNotFoundError") {
    super(message);
  }
}

export class InvalidProjectMarginError extends Error implements ReducerError {
  errorCode = "InvalidProjectMarginError" as ErrorCode;
  constructor(message = "InvalidProjectMarginError") {
    super(message);
  }
}

export class InvalidProjectBudgetError extends Error implements ReducerError {
  errorCode = "InvalidProjectBudgetError" as ErrorCode;
  constructor(message = "InvalidProjectBudgetError") {
    super(message);
  }
}

export class ProjectDeliverableAlreadyExistsError
  extends Error
  implements ReducerError
{
  errorCode = "ProjectDeliverableAlreadyExistsError" as ErrorCode;
  constructor(message = "ProjectDeliverableAlreadyExistsError") {
    super(message);
  }
}

export const errors = {
  AddProject: { ProjectAlreadyExistsError },

  RemoveProject: { ProjectNotFoundError },

  SetProjectMargin: { InvalidProjectMarginError },

  SetProjectTotalBudget: { InvalidProjectBudgetError },

  AddProjectDeliverable: { ProjectDeliverableAlreadyExistsError },
};
