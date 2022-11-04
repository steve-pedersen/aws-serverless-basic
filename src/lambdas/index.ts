import * as Hapi from '@hapi/hapi';
import { LambdaLog } from 'lambda-log';
import { Event, Context } from '../lib/types';
import { initializeServer } from '../utils/server';
import { createLogger } from '../utils/logger';
import { buildFullUrl } from '../utils';

const CORS_KEY = 'access-control-allow-origin';
const CONTENT_TYPE = 'content-type';
const CORRELATION_ID = 's37-correlation-id';

const responseHeaders = {
  [CORS_KEY]: '*',
  [CONTENT_TYPE]: 'application/json',
  [CORRELATION_ID]: '',
};

const local = process.env.IS_LOCAL ? 'local' : 'cloud';

// cache instance variables for better performance
let logger: LambdaLog;
let server: Hapi.Server

export const handler = async (event: Event, context: Context) => {
  const { awsRequestId } = context;
  const { httpMethod, path, queryStringParameters, body, headers } = event;
  const correlationId = headers[CORRELATION_ID];
  logger = createLogger({ correlationId, awsRequestId });

  server = server || ((await initializeServer()) as Hapi.Server);
  // map lambda event to hapi request
  const options = {
    method: httpMethod,
    url: buildFullUrl(path, queryStringParameters),
    payload: body,
    headers,
    validate: false,
  } as Hapi.ServerInjectOptions;

  try {
    console.log(`*** event received[${local}] ***`, { url: path });
    logger.info(`*** event received[${local}] ***`, { url: path });

    const statusCode = 200, result = { string: "cheese" };
    const responseBody = JSON.stringify(result);
    responseHeaders[CORRELATION_ID] = correlationId || '';

    return { headers: responseHeaders, body: responseBody, statusCode };
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
