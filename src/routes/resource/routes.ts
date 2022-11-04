import { Request, ServerRoute } from '@hapi/hapi';
import { errorResponseSchema, getResourceByIdRequestSchema } from './schemas';
import { ResourceController } from '../../controllers/resource';
import ExceptionHandler from '../../errors/exceptionHandler';

/**
 * Pre method (middleware) example
 */
const transformInput = (request: Request) => {
  return {
    body: request.payload,
    query: request.query,
    params: request.params,
  };
};

const storeCorrelationId = (request: Request) => {
  return request.headers['s37-correlation-id'];
};

export default [
  {
    method: 'GET',
    path: '/api/v1/resources',
    options: {
      tags: ['api', 'languages'],
      description: 'GET a collection of resources',
      notes: 'Demos using "pre" to transform the inputs and assign to a variable "input"',
      pre: [
        { method: storeCorrelationId, assign: 'correlationId' },
        { method: transformInput, assign: 'input' },
      ],
    },
    handler: async (request: Request, h: any) => {
      request.server.log('info', `GET request on /api/v1/resources`);

      const controller = new ResourceController(request);
      const { code, payload } = await controller.getResources();

      return h.response(payload).code(code);
    },
  },
  {
    method: 'GET',
    path: '/api/v1/resources/{id}',
    options: {
      tags: ['api', 'languages'],
      description: 'GET a single resource by id',
      notes: 'Demos using Joi for request & response validation',
      pre: [{ method: storeCorrelationId, assign: 'correlationId' }],
      validate: {
        params: getResourceByIdRequestSchema,
        options: {
          abortEarly: false,
          presense: 'optional',
          allowUnknown: true,
        },
        failAction: async (request: Request, h: any, err: any) => {
          request.server.log('error', err);
          const id = request.params?.id || 'unknown';
          const exception = new ExceptionHandler(request);
          const { code, payload } = exception.handleHttpBadRequest(`Invalid id parameter: ${id}`);

          return h.response(payload).code(code).takeover();
        },
      },
      response: {
        status: {
          // 200: getResourceResponseSchema,
          400: errorResponseSchema,
          401: errorResponseSchema,
        },
      },
    },
    handler: async (request: Request, h: any) => {
      const controller = new ResourceController(request);
      const { code, payload } = await controller.getResourceById();

      return h.response(payload).code(code);
    },
  },
] as ServerRoute[];
