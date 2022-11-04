import { Logger } from '@aws-lambda-powertools/logger';

export const createLogger = (config: any) => {
  return new Logger(config);
};
