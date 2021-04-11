import { createConnection } from 'typeorm';

export const connect = async () => {
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
};
