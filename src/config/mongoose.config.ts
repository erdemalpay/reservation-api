import * as config from 'config';

const dbConfig = config.get('db');

const url = process.env.MONGO_URL || dbConfig.url;
const host = process.env.MONGO_HOSTNAME || dbConfig.host;
const port = process.env.MONGO_PORT || dbConfig.port;
const database = process.env.MONGO_DB_NAME || dbConfig.database;
export const mongoUrl = url || `mongodb://${host}:${port}/${database}`;
