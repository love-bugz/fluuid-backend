const dotenv = require('dotenv');
dotenv.config();

module.exports = {
	type: 'postgres',
	url: process.env.DATABASE_URL,
	port: process.env.PORT,
	synchronize: false,
	logging: true,
	migrationsTableName: 'custom_migration_table',
	entities: ['dist/api/models/**/*.js'],
	migrations: ['dist/api/migrations/*.js'],
	cli: {
		entitiesDir: 'dist/api/models',
		migrationsDir: 'dist/api/migrations',
	},
};
