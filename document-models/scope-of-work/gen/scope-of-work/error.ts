export type ErrorCode = "InvalidStatusTransition";

export interface ReducerError {
  errorCode: ErrorCode;
}

export class InvalidStatusTransition extends Error implements ReducerError {
  errorCode = "InvalidStatusTransition" as ErrorCode;
  constructor(message = "InvalidStatusTransition") {
    super(message);
  }
}

export const errors = {
  EditScopeOfWork: {
    InvalidStatusTransition,
  },
};
