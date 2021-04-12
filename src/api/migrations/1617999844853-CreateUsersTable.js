"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUsersTable1617999844853 = void 0;
const typeorm_1 = require("typeorm");
class CreateUsersTable1617999844853 {
    async up(queryRunner) {
        return await queryRunner.createTable(new typeorm_1.Table({
            name: 'users',
            columns: [
                {
                    name: 'id',
                    type: 'varchar',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'uuid',
                },
                {
                    name: 'emailId',
                    type: 'varchar',
                    isUnique: true,
                    isNullable: false,
                },
                {
                    name: 'handle',
                    type: 'varchar',
                    isNullable: false,
                    isUnique: true,
                },
                {
                    name: 'createdAt',
                    type: 'timestamp',
                    isNullable: false,
                    default: 'CURRENT_TIMESTAMP',
                },
                {
                    name: 'updatedAt',
                    type: 'timestamp',
                    default: 'CURRENT_TIMESTAMP',
                },
            ],
        }), true);
    }
    async down(queryRunner) {
        return await queryRunner.dropTable('users');
    }
}
exports.CreateUsersTable1617999844853 = CreateUsersTable1617999844853;
//# sourceMappingURL=1617999844853-CreateUsersTable.js.map