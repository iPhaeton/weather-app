export default class NoSupportError extends Error{
    constructor (message) {
        super (message + " is not supported by your browser");

        this.message = message + " is not supported by your browser";
        this.name = "NoSupportError";

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, NoSupportError);
        } else {
            this.stack = (new Error()).stack;
        }
    }
}
