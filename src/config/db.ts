import { DataSource } from "typeorm";
import { TestData } from "../models/entities/testData";
// import User from "../models/entities/user";
import config from './env';

const dbConfig: DataSource = new DataSource({
    type: 'mysql',
    host: config.dbHost,
    port: config.dbPort,
    username: config.dbUsername,
    password: config.dbPassword,
    database: config.dbName,
    timezone: '+05:30',
    entities: [
        TestData,
    ],
    logging: false
});

export default dbConfig;