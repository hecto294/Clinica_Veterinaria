import express, { Express, Request, Response, NextFunction } from 'express';
import animalsRouter from './routes/animals.routes.js';
import { morganMiddleware } from './middlewares/morgan.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFound.js';
import logger from './config/logger.js';

const app: Express = express();

app.use(express.json());
app.use(morganMiddleware);

app.use('/api/v1/animals', animalsRouter);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;