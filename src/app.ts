import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Application } from 'express';
import { clouddinaryConfig } from './config/cloudinary.config';
import { globalErrorHandler } from './middlewares/globalErrorHandler';
import router from './routes';
const app: Application = express();

// default middlewares
app.use(express.json());
app.use(cors());
app.use(cookieParser());
// configuration
clouddinaryConfig();

// app routes
app.use('/api/v1', router);

// global error handler
app.use(globalErrorHandler);
export default app;
