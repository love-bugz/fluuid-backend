"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connect = void 0;
const typeorm_1 = require("typeorm");
const connect = async () => {
    const connection = await typeorm_1.createConnection({
        type: 'sqlite',
        database: 'dev.db',
        name: 'default',
        synchronize: false,
        logging: true,
        migrationsTableName: 'custom_migration_table',
        entities: [__dirname + '/models/*.model.ts'],
        migrations: [__dirname + '/migrations/*.ts'],
        cli: {
            entitiesDir: __dirname + './models/',
            migrationsDir: __dirname + './migrations/',
        },
    });
};
exports.connect = connect;
//# sourceMappingURL=db.js.map