/** True when an optional input field carries a real value — neither omitted nor null. */
export const isSet = <T>(value: T | null | undefined): value is T =>
  value !== undefined && value !== null;
