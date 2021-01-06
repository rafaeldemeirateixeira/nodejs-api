import express from 'express';
import dotenv from 'dotenv';
import routes from './routes';
import httpExceptionMiddleware from './src/Middlewares/HttpExceptionMiddleware';
import validatorErrorMiddleware from './src/Middlewares/ValidatorErrorMiddleware';

dotenv.config();

const app = express();

app.use(express.json());
app.use(routes);
app.use(validatorErrorMiddleware);
app.use(httpExceptionMiddleware);

export default app;
