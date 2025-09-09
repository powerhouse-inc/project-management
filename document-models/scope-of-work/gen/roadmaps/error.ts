export type ErrorCode = "MissingRequiredId";

export interface ReducerError {
  errorCode: ErrorCode;
}

export class MissingRequiredId extends Error implements ReducerError {
  errorCode = "MissingRequiredId" as ErrorCode;
  constructor(message = "MissingRequiredId") {
    super(message);
  }
}

export const errors = {
  AddRoadmap: {
    MissingRequiredId,
  },
};
