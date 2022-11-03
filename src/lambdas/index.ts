import * as Hapi from '@hapi/hapi';
// import { LambdaLog } from 'lambda-log';
import { Logger } from '@aws-lambda-powertools/logger';
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
let logger: Logger;
let server: Hapi.Server;

export const handler = async (event: Event, context: Context) => {
  const { httpMethod, path, queryStringParameters, body, headers } = event;
  // map lambda event to Hapi request
  const serverOptions = {
    method: httpMethod,
    url: buildFullUrl(path, queryStringParameters),
    payload: body,
    headers,
    validate: false,
  } as Hapi.ServerInjectOptions;

  const correlationId = headers[CORRELATION_ID];
  const { awsRequestId } = context;
  const loggerOptions = {
    persistentLogAttributes: {
      awsRequestId,
      correlationId,
    },
  };
  logger = logger || createLogger(loggerOptions);
  server = server || ((await initializeServer()) as Hapi.Server);

  // handle logs with Hapi server using custom logger
  server.events.on('log', (event: Hapi.LogEvent, tags: { [key: string]: true }) => {
    const { data } = event;

    if (tags.error) {
      logger.error(`Request ${event.request} error: ${data || 'unknown'}`);
    }

    if (tags.info) {
      logger.info(`Request ${event.request} info: ${data || 'unknown'}`);
    }
  });

  try {
    logger.info(`*** event received[${local}] ***`, { url: path });

    const { statusCode, result } = await server.inject(serverOptions);
    const responseBody = JSON.stringify(result);
    responseHeaders[CORRELATION_ID] = correlationId || '';

    return { headers: responseHeaders, body: responseBody, statusCode };
  } catch (err) {
    const { message } = err as Error;
    logger.info(`Error: ${message}`, { err });

    return {
      statusCode: 500,
      body: message || 'System Error',
    };
  } finally {
    logger.info('*** event handled ***', { url: path });
  }
};
