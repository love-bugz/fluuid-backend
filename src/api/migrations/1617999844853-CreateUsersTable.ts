import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateUsersTable1617999844853 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		return await queryRunner.createTable(
			new Table({
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
			}),
			true
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		return await queryRunner.dropTable('users');
	}
}
