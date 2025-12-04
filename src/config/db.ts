import { DataSource } from "typeorm";
import { TestData } from "../models/entities/testData";
import config from './env';
import User from "../models/entities/user";
import UserRole from "../models/entities/role";
import Organization, { OrganizationConfig } from "../models/entities/organization";
import Customer from "../models/entities/customer";
import BrowsingLog from "../models/entities/browsing-log";

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
        User,
        UserRole,
        Organization,
        OrganizationConfig,
        Customer,
        BrowsingLog
    ],
    logging: false
});

export default dbConfig;