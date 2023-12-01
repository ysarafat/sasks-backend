import mongoose from 'mongoose';
import app from './app';
import config from './config';

async function server() {
  try {
    mongoose.connect(config.database_url as string).then(() => {
      console.log('Database connected');
    });
    app.listen(config.port, () => {
      console.log(`server is running on port ${config.port}`);
    });
  } catch (error) {
    console.log(error);
  }
}

server();
