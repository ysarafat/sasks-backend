import cors from 'cors';
import express, { Application } from 'express';
import { globalErrorHandler } from './middlewares/globalErrorHandler';
const app: Application = express();

// default middlewares
app.use(express.json());
app.use(cors());

app.use(globalErrorHandler);
export default app;
