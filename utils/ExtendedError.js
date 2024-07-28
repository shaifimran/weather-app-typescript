"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExtendedError = void 0;
class ExtendedError extends Error {
    constructor(statusCode, status, message) {
        super(message);
        this.status = status;
        this.statusCode = statusCode;
    }
}
exports.ExtendedError = ExtendedError;
;
