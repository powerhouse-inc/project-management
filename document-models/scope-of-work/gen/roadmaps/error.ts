export type ErrorCode =
  | "MissingRequiredId"
  | "DuplicateRoadmapId"
  | "InvalidSlugFormat";

export interface ReducerError {
  errorCode: ErrorCode;
}

export class MissingRequiredId extends Error implements ReducerError {
  errorCode = "MissingRequiredId" as ErrorCode;
  constructor(message = "MissingRequiredId") {
    super(message);
  }
}

export class DuplicateRoadmapId extends Error implements ReducerError {
  errorCode = "DuplicateRoadmapId" as ErrorCode;
  constructor(message = "DuplicateRoadmapId") {
    super(message);
  }
}

export class InvalidSlugFormat extends Error implements ReducerError {
  errorCode = "InvalidSlugFormat" as ErrorCode;
  constructor(message = "InvalidSlugFormat") {
    super(message);
  }
}

export const errors = {
  AddRoadmap: {
    MissingRequiredId,
    DuplicateRoadmapId,
    InvalidSlugFormat,
  },
};
