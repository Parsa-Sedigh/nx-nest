import { ConfigType, registerAs } from '@nestjs/config';
import { Inject } from '@nestjs/common';

export const mongoConfiguration = registerAs('mongo', () => ({
  uri: process.env.MONGO_URI || 'mongodb://localhost:27017',
  dbName: process.env.MONGO_DB_NAME || 'nx-post-rest',
}));

export type MongoConfiguration = ConfigType<typeof mongoConfiguration>;
export const InjectMongoConfig = () => Inject(mongoConfiguration);
