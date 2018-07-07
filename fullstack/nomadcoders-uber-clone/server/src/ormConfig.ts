import { ConnectionOptions } from 'typeorm';

const defaultConnectionOptions: ConnectionOptions = {
  type: 'postgres',
  database: 'nuber',
  synchronize: true,
  logging: true,
  entities: ['entities/**/*.*'],
  host: process.env.DB_ENDPOINT || 'localhost',
  port: 5432,
  username: process.env.DB_USERNAME || 'jinhohyeon',
  password: process.env.DB_PASSWORD || ''
};

export default defaultConnectionOptions;
