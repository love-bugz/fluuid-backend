import { app } from './app';
import dotenv from 'dotenv';
dotenv.config();

const port: number = parseInt(process.env.PORT || '5000', 10);

app.listen(port, () => {
	console.log(`*** SERVER LISTENING ON PORT:${port}\n`);
});
