import express from 'express';
import dotenv from 'dotenv';
import { errors } from 'celebrate';
import routes from './routes';
import httpExceptionMiddleware from './src/Middlewares/HttpExceptionMiddleware';

dotenv.config();

const app = express();

app.use(express.json());
app.use(routes);
app.use(errors());
app.use(httpExceptionMiddleware);

export default app;
