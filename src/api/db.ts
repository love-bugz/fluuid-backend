import { createConnection } from 'typeorm';
import dotenv from 'dotenv';
dotenv.config();

export const connect = async () => {
	const db_url = process.env.DATABASE_URL || null;
	if (db_url) {
		try {
			await createConnection({
				type: 'postgres',
				name: 'default',
				synchronize: false,
				logging: true,
				url: db_url,
				extra: {
					ssl: true,
					rejectUnauthorized: false,
				},
				migrationsTableName: 'custom_migration_table',
				entities: ['./dist/api/models/*.model.js'],
				migrations: ['./dist/api/migrations/*.js'],
				cli: {
					entitiesDir: './dist/api/models/',
					migrationsDir: './dist/api/migrations/',
				},
			});
		} catch (err) {
			console.error(err);
		}
	} else {
		try {
			await createConnection({
				type: 'sqlite',
				database: 'dev.db',
				name: 'dev',
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
		} catch (err) {
			console.error(err);
		}
	}
};
