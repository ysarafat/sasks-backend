import cors from 'cors';
import express, { Application } from 'express';
import { clouddinaryConfig } from './config/cloudinary.config';
import { globalErrorHandler } from './middlewares/globalErrorHandler';
import router from './routes';

const app: Application = express();

// default middlewares
app.use(express.json());
app.use(cors());

// configuration
clouddinaryConfig();

// app routes
// const type = ['application/pdf'];
// app.post(
//   '/',

//   async (req: Request, res: Response) => {
//     try {
//       console.log(req.file);
//       const url = await Clouddinary.uploadFileToCloud(
//         req.file,
//         'test',
//         'ami_djfs',
//         'image',
//         { width: 500, height: 500, crop: 'fit' },
//       );
//       console.log(url);
//     } catch (error) {
//       console.log(error);
//     }
//   },
// );

app.use('/api/v1', router);
app.use(globalErrorHandler);
export default app;
