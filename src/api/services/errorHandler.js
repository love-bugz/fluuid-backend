"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const class_validator_1 = require("class-validator");
const Yup = __importStar(require("yup"));
const notFoundError_1 = require("./notFoundError");
const badRequestError_1 = require("./badRequestError");
const errorHandler = (err, _req, res, _next) => {
    let message;
    let error;
    let statusCode;
    if (err instanceof Yup.ValidationError) {
        if (err.errors.length > 0)
            message = err.errors[0];
        statusCode = 400;
        error = 'Validation Error';
    }
    if (err instanceof notFoundError_1.NotFoundError || err instanceof badRequestError_1.BadRequestError) {
        message = err.message;
        statusCode = err.statusCode;
        error = err.error;
    }
    for (let key in err) {
        console.log('KEY', key, 'VALUE', err[key]); // FOR DEVELOPMENT
        // class-validator ValidationError
        if (err[key] instanceof class_validator_1.ValidationError) {
            if (Object.keys(err[key].constraints).length > 0) {
                const first = Object.keys(err[key].constraints)[0];
                message = err[key].constraints[first];
            }
            statusCode = 400;
            error = 'Validation Error';
        }
        // SQLITE constraint
        if (key === 'errno') {
            error = 'SQL Error';
        }
        if (key === 'statusCode') {
            statusCode = err[key];
        }
        if (key === 'message' && !message) {
            message = err[key];
        }
    }
    // @ts-ignore
    statusCode = statusCode || 500;
    // @ts-ignore
    message = message || 'Something went wrong';
    // @ts-ignore
    error = error || 'Undefined Error'; //change to "Undefined Error"
    res.status(statusCode).json({ statusCode, message, error });
};
exports.errorHandler = errorHandler;
//# sourceMappingURL=errorHandler.js.map