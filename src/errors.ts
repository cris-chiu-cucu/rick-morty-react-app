export const NOT_FOUND_ERROR = "NotFoundError";

export class NotFoundError extends Error {
  constructor (message = "The resource is not found.") {
    super(message);
    this.name = NOT_FOUND_ERROR;
    this.message = message;
  }
}