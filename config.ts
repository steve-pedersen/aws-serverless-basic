/**
 * Project configuration file. 
 * Include settings like SSM, DB config, server options, etc.
 */
import 'dotenv/config';

interface DefaultConfig {
  ssm: SSMConfig;
}

interface SSMConfig {
  region: string;
  env: string;
}

const env = process.env['NODE_ENV'] ? process.env['NODE_ENV'] : 'dev1-eu-de';
const awsRegion = process.env['REGION'] ? process.env['REGION'] : 'eu-central-1';

const config = {
  ssm: {
    region: `${awsRegion}`,
    env: `${env}`
  },
} as DefaultConfig;
const mergedConfig = { ...config, env }

export default mergedConfig;
