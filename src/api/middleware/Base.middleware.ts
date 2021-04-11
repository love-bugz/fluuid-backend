import { RequestHandler } from 'express';

const beginLoggingMW: RequestHandler = (req, _, next) => {
	const ROUTE = req.originalUrl,
		METHOD = req.method,
		HOST = req.headers.host,
		AGENT = req.headers['user-agent'],
		BODY = { ...req.body },
		PARAMS = req.params;

	console.log(`BEGINNING ${METHOD} - ${ROUTE}`);
	console.log(`HOST: ${HOST}`);
	console.log(`AGENT: ${AGENT}`);
	console.log(BODY ? `BODY: ${JSON.stringify(BODY)}` : null);
	console.log(PARAMS ? `PARAMS: ${JSON.stringify(PARAMS)}` : null);
	console.log('\n\n');
	next();
};

export { beginLoggingMW };
