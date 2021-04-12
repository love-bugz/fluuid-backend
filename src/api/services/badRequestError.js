"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BadRequestError = void 0;
class BadRequestError extends Error {
    constructor(message) {
        super();
        this.message = message;
        this.statusCode = 400;
        this.error = 'Bad Request Error';
    }
}
exports.BadRequestError = BadRequestError;
//# sourceMappingURL=badRequestError.js.map