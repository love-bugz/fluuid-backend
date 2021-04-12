"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.beginLoggingMW = void 0;
const beginLoggingMW = (req, _, next) => {
    const ROUTE = req.originalUrl, METHOD = req.method, HOST = req.headers.host, AGENT = req.headers['user-agent'], BODY = Object.assign({}, req.body), PARAMS = req.params;
    console.log(`BEGINNING ${METHOD} - ${ROUTE}`);
    console.log(`HOST: ${HOST}`);
    console.log(`AGENT: ${AGENT}`);
    console.log(BODY ? `BODY: ${JSON.stringify(BODY)}` : null);
    console.log(PARAMS ? `PARAMS: ${JSON.stringify(PARAMS)}` : null);
    console.log('\n\n');
    next();
};
exports.beginLoggingMW = beginLoggingMW;
//# sourceMappingURL=Base.middleware.js.map