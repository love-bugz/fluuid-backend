import { createConnection } from 'typeorm';
import dotenv from 'dotenv';
dotenv.config();

export const connect = async () => {
	const db_url = process.env.DATABASE_URL || null;
	if (db_url) {
		const connection = await createConnection({
			type: 'postgres',
			synchronize: false,
			logging: true,
			url: db_url,
			extra: {
				ssl: true,
			},
			migrationsTableName: 'custom_migration_table',
			entities: [__dirname + '/models/*.model.ts'],
			migrations: [__dirname + '/migrations/*.ts'],
			cli: {
				entitiesDir: __dirname + './models/',
				migrationsDir: __dirname + './migrations/',
			},
		});
	} else {
		const connection = await createConnection({
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
	}
};
