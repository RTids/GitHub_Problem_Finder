import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import router from './routes/gitHubRoutes.ts';

const app = express();
const PORT = 8080;

app.use(cors());
app.use(bodyParser.json());
app.use('/', router);

app.listen(PORT, () => {
	console.log(`Listening on port: ${PORT}`);
});
