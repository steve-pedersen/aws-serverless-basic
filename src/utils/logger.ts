import { LambdaLog } from 'lambda-log';

export const createLogger = (metadata: any) => {
  return new LambdaLog(metadata);
};
