import { Logger } from '@aws-lambda-powertools/logger';

export const createLogger = (config: any) => {
  return new Logger(config);
};

// export const logger = (config: any) => {
//   return
// };

// import { LambdaLog } from 'lambda-log';

// export const createLogger = (metadata: any) => {
//   const log = new LambdaLog();
//   log.options.meta = metadata;

//   return log;
// };
