import { LambdaLog } from 'lambda-log';
import { Event, Context } from '../lib/types';
import { createLogger } from '../utils/logger';

const CORS_KEY = 'access-control-allow-origin';
const CONTENT_TYPE = 'content-type';
const CORRELATION_ID = 's37-correlation-id';

const responseHeaders = {
  [CORS_KEY]: '*',
  [CONTENT_TYPE]: 'application/json',
  [CORRELATION_ID]: '',
};

const local = process.env.IS_LOCAL ? 'local' : 'cloud';

// setup for instance variables
let logger: LambdaLog;

export const handler = async (event: Event, context: Context) => {
  const { awsRequestId } = context;
  const { httpMethod, path, queryStringParameters, body, headers } = event;
  const correlationId = headers[CORRELATION_ID];
  logger = createLogger({ correlationId, awsRequestId });

  try {
    console.log(`*** event received[${local}] ***`, { url: path });
    logger.info(`*** event received[${local}] ***`, { url: path });

    const statusCode = 200;
    const result = { httpMethod, queryStringParameters, body };
    responseHeaders[CORRELATION_ID] = correlationId || '';

    return { headers: responseHeaders, body: JSON.stringify(result), statusCode };
  } catch (err) {
    const { message } = err as Error;
    console.log(`Error: ${message}`, { err });
    logger.info(`Error: ${message}`, { err });

    return {
      statusCode: 500,
      body: message || 'System Error',
    };
  } finally {
    console.log('*** event handled ***', { url: path });
    logger.info('*** event handled ***', { url: path });
  }
};
