export type ErrorCode =
  | "InvalidStatusTransition"
  | "MissingRequiredFields"
  | "UnauthorizedEdit";

export interface ReducerError {
  errorCode: ErrorCode;
}

export class InvalidStatusTransition extends Error implements ReducerError {
  errorCode = "InvalidStatusTransition" as ErrorCode;
  constructor(message = "InvalidStatusTransition") {
    super(message);
  }
}

export class MissingRequiredFields extends Error implements ReducerError {
  errorCode = "MissingRequiredFields" as ErrorCode;
  constructor(message = "MissingRequiredFields") {
    super(message);
  }
}

export class UnauthorizedEdit extends Error implements ReducerError {
  errorCode = "UnauthorizedEdit" as ErrorCode;
  constructor(message = "UnauthorizedEdit") {
    super(message);
  }
}

export const errors = {
  EditScopeOfWork: {
    InvalidStatusTransition,
    MissingRequiredFields,
    UnauthorizedEdit,
  },
};
