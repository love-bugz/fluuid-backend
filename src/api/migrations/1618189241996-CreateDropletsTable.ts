import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class CreateDropletsTable1618189241996 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
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
			}),
			true
		);

		await queryRunner.createForeignKey(
			'droplets',
			new TableForeignKey({
				columnNames: ['createdByUserId'],
				referencedColumnNames: ['id'],
				referencedTableName: 'users',
				onDelete: 'CASCADE',
				onUpdate: 'CASCADE',
			})
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		return await queryRunner.dropTable('droplets');
	}
}
