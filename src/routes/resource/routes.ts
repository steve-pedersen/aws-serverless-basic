import { Request, ServerRoute } from '@hapi/hapi';
import Joi from '@hapi/joi';
import { getResourceByIdRequestSchema, getResourceResponseSchema } from './schemas';
import { ResourceController } from '../../controllers/resource';

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

export default [
  {
    method: 'GET',
    path: '/api/v1/resources',
    options: {
      tags: ['api', 'languages'],
      description: 'GET a collection of resources',
      notes: 'Demos using "pre" to transform the inputs and assign to a variable "input"',
      pre: [{ method: transformInput, assign: 'input' }],
    },
    handler: async (request: Request, h: any) => {
      const controller = new ResourceController(request);
      const { code, payload } = controller.getResources();

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
      validate: {
        query: getResourceByIdRequestSchema,
        options: {
          abortEarly: false,
          presense: 'optional',
          allowUnknown: true,
        },
        failAction: async (request: Request, h: any, err: any) => {
          request.log('error', err);
          console.log('invalid request, missing resource id', request);
        },
      },
      response: {
        status: {
          200: getResourceResponseSchema,
          400: Joi.any(),
          401: Joi.any(),
        },
      },
    },
    handler: async (request: Request, h: any) => {
      const controller = new ResourceController(request);
      const { code, payload } = controller.getResourceById();

      return h.response(payload).code(code);
    },
  },
] as ServerRoute[];
