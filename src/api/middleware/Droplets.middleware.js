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
exports.validateNewDroplet = void 0;
const Yup = __importStar(require("yup"));
function dropletCreationSchema() {
    return Yup.object().shape({
        title: Yup.string().strict(false).trim().required(),
        audioTrack: Yup.string().strict(false).trim().required(),
        createdByUserId: Yup.string().strict(false).trim().required(),
        isReply: Yup.boolean().required(),
    });
}
const validateNewDroplet = async (req, res, next) => {
    try {
        const dropletToCheck = Object.assign({}, req.body);
        // console.log(`DROPLET TO CHECK: ${JSON.stringify(dropletToCheck)}`);
        const droplet = await dropletCreationSchema().validate(dropletToCheck, { abortEarly: false });
        req.droplet = droplet;
        next();
    }
    catch (err) {
        next(err);
    }
};
exports.validateNewDroplet = validateNewDroplet;
//# sourceMappingURL=Droplets.middleware.js.map