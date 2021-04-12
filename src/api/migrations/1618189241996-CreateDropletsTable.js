"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateDropletsTable1618189241996 = void 0;
const typeorm_1 = require("typeorm");
class CreateDropletsTable1618189241996 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'droplets',
            columns: [
                {
                    name: 'id',
                    type: 'varchar',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'uuid',
                },
                {
                    name: 'title',
                    type: 'varchar',
                    isNullable: false,
                },
                {
                    name: 'audioTrack',
                    type: 'varchar',
                    isNullable: false,
                },
                {
                    name: 'createdAt',
                    type: 'timestamp',
                    isNullable: false,
                    default: 'CURRENT_TIMESTAMP',
                },
                {
                    name: 'upVoteCount',
                    type: 'integer',
                    isNullable: false,
                    default: 0,
                },
                {
                    name: 'downVoteCount',
                    type: 'integer',
                    isNullable: false,
                    default: 0,
                },
                {
                    name: 'replyCount',
                    type: 'integer',
                    isNullable: false,
                    default: 0,
                },
                {
                    name: 'isReply',
                    type: 'boolean',
                    isNullable: false,
                    default: false,
                },
                {
                    name: 'createdByUserId',
                    type: 'string',
                    isNullable: false,
                },
            ],
        }), true);
        await queryRunner.createForeignKey('droplets', new typeorm_1.TableForeignKey({
            columnNames: ['createdByUserId'],
            referencedColumnNames: ['id'],
            referencedTableName: 'users',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        }));
    }
    async down(queryRunner) {
        return await queryRunner.dropTable('droplets');
    }
}
exports.CreateDropletsTable1618189241996 = CreateDropletsTable1618189241996;
//# sourceMappingURL=1618189241996-CreateDropletsTable.js.map