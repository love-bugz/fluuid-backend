"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const port = parseInt(process.env.PORT || '5000', 10);
const server = app_1.app.listen(port, '127.0.0.1', () => {
    console.log(`*** SERVER LISTENING ON PORT:${port}\n`);
});
//# sourceMappingURL=index.js.map