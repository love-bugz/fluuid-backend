import { Connection, getConnectionManager, getConnectionOptions, createConnection, getConnection, QueryRunner } from 'typeorm';

const init = async () => {
	let connection: Connection;

	if (!getConnectionManager().has('default')) {
		const connectionOptions = await getConnectionOptions();
		connection = await createConnection(connectionOptions);
	} else {
		connection = getConnection();
	}

	return connection.createQueryRunner();
};

const queryRunner = init();

export { queryRunner };
