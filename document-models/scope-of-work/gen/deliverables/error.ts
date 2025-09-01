export type ErrorCode = "DeliverableNotFound";

export interface ReducerError {
  errorCode: ErrorCode;
}

export class DeliverableNotFound extends Error implements ReducerError {
  errorCode = "DeliverableNotFound" as ErrorCode;
  constructor(message = "DeliverableNotFound") {
    super(message);
  }
}

export const errors = {
  EditDeliverable: {
    DeliverableNotFound,

  },
  AddKeyResult: {
    DeliverableNotFound,

  },
};
