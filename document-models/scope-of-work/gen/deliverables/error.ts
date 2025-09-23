export type ErrorCode =
  | "DeliverableNotFound"
  | "InvalidStatusTransition"
  | "MissingRequiredFields"
  | "InvalidCodeFormat"
  | "OwnerIdNotRecognized"
  | "InvalidLinkFormat";

export interface ReducerError {
  errorCode: ErrorCode;
}

export class DeliverableNotFound extends Error implements ReducerError {
  errorCode = "DeliverableNotFound" as ErrorCode;
  constructor(message = "DeliverableNotFound") {
    super(message);
  }
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

export class InvalidCodeFormat extends Error implements ReducerError {
  errorCode = "InvalidCodeFormat" as ErrorCode;
  constructor(message = "InvalidCodeFormat") {
    super(message);
  }
}

export class OwnerIdNotRecognized extends Error implements ReducerError {
  errorCode = "OwnerIdNotRecognized" as ErrorCode;
  constructor(message = "OwnerIdNotRecognized") {
    super(message);
  }
}

export class InvalidLinkFormat extends Error implements ReducerError {
  errorCode = "InvalidLinkFormat" as ErrorCode;
  constructor(message = "InvalidLinkFormat") {
    super(message);
  }
}

export const errors = {
  EditDeliverable: {
    DeliverableNotFound,
    InvalidStatusTransition,
    MissingRequiredFields,
    InvalidCodeFormat,
    OwnerIdNotRecognized,
  },
  AddKeyResult: {
    DeliverableNotFound,
    MissingRequiredFields,
    InvalidLinkFormat,
  },
};
