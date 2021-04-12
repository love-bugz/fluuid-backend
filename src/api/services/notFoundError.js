"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotFoundError = void 0;
class NotFoundError extends Error {
    constructor(message) {
        super();
        this.message = message;
        this.statusCode = 404;
        this.error = 'Not Found Error';
    }
}
exports.NotFoundError = NotFoundError;
//# sourceMappingURL=notFoundError.js.map