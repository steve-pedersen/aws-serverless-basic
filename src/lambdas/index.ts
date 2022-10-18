import { Event, Context } from "~/lib";

const CORS_KEY = 'access-control-allow-origin';
const CONTENT_TYPE = 'content-type';
const CORRELATION_ID = 's37-correlation-id';

const responseHeaders = {
  [CORS_KEY]: '*',
  [CONTENT_TYPE]: 'application/json',
  [CORRELATION_ID]: '',
};

const local = process.env.IS_LOCAL ? 'local' : 'cloud';

export const handler = async (event: Event, context: Context) => {
  const { awsRequestId } = context;
  const {
    httpMethod,
    path,
    queryStringParameters,
    body,
    headers
  } = event;
  const correlationId = headers[CORRELATION_ID];
  
  try {
    console.log(`*** event received[${local}] ***`, { url: path, correlationId, awsRequestId });

    const statusCode = 200;
    const result = { httpMethod, queryStringParameters, body };
    responseHeaders[CORRELATION_ID] = correlationId || '';

    return { headers: responseHeaders, body: JSON.stringify(result), statusCode };
  } 
  catch (err) {
    const { message } = err as Error;
    console.log(`Error: ${message}`, { correlationId, err });

    return {
      statusCode: 500,
      body: message || 'System Error'
    }
  }
  finally {
    console.log('*** event handled ***', { url: path, correlationId });
  }
};