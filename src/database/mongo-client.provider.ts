import { Provider } from '@nestjs/common';
import mongoose from 'mongoose';
import { loadSchemas } from './schema-loader';

export const MongoClientProvider: Provider = {
  provide: 'MONGO_CONNECTION',
  useFactory: async () => {
    const conn = await mongoose.createConnection(process.env.MONGO_URI, {
      
      maxPoolSize: 20,
    } as any);
    console.log('✅ MongoDB connected with pooling');
     loadSchemas(conn); 
    return conn;
  },
};
