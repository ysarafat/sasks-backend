import cors from 'cors';
import express, { Application } from 'express';
import { globalErrorHandler } from './middlewares/globalErrorHandler';
import router from './routes';
const app: Application = express();

// default middlewares
app.use(express.json());
app.use(cors());
// app routes
app.use('/api/v1', router);
app.use(globalErrorHandler);
export default app;
