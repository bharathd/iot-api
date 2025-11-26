/* eslint-disable @typescript-eslint/no-non-null-assertion */
import * as dotEnv from 'dotenv';

interface CustomConfig {
  dbHost: string;
  dbPort: number;
  dbName: string;
  dbUsername: string;
  dbPassword: string;
  uiBase: string;
}

enum Environment {
  Prod = 'PROD',
  Dev = 'DEV',
  Local = 'LOCAL',
}

const envFound = dotEnv.config();
if (!envFound) {
  throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

process.env.NODE_ENV = process.env.NODE_ENV || Environment.Local;

const prodConfig: CustomConfig = {
  dbHost: process.env.PROD_DB_HOST!,
  dbPort: Number(process.env.PROD_DB_PORT || 25060),
  dbName: process.env.PROD_DB_NAME!,
  dbUsername: process.env.PROD_DB_USERNAME!,
  dbPassword: process.env.PROD_DB_PASSWORD!,
  uiBase: process.env.PROD_UI_BASE!,
};

const devConfig: CustomConfig = {
  dbHost: process.env.DEV_DB_HOST!,
  dbPort: Number(process.env.DEV_DB_PORT || 25060),
  dbName: process.env.DEV_DB_NAME!,
  dbUsername: process.env.DEV_DB_USERNAME!,
  dbPassword: process.env.DEV_DB_PASSWORD!,
  uiBase: process.env.DEV_UI_BASE!,
};

const localConfig: CustomConfig = {
  dbHost: process.env.LOCAL_DB_HOST!,
  dbPort: Number(process.env.LOCAL_DB_PORT!),
  dbName: process.env.LOCAL_DB_NAME!,
  dbUsername: process.env.LOCAL_DB_USERNAME!,
  dbPassword: process.env.LOCAL_DB_PASSWORD!,
  uiBase: process.env.LOCAL_UI_BASE!,
};

const environmentConfigMap: Record<Environment, CustomConfig> = {
    [Environment.Prod]: prodConfig,
    [Environment.Dev]: devConfig,
    [Environment.Local]: localConfig,
};

const config = environmentConfigMap[process.env.NODE_ENV as Environment] || localConfig;

export default config;