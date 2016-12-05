export default class ServerResponseError extends Error{
  constructor (status, message) {
    super (message);

    this.message = message;
    this.responseStatus = status;
    this.name = "ServerResponseError";

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ServerResponseError);
    } else {
      this.stack = (new Error()).stack;
    }
  }
}
