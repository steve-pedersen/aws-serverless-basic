import { LambdaLog } from 'lambda-log';

export const createLogger = (metadata: any) => {
  const log = new LambdaLog();
  log.options.meta = metadata;

  return log;
};