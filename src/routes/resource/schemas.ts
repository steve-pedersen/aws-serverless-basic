import Joi from '@hapi/joi';

export const getResourceByIdRequestSchema = Joi.object({
  id: Joi.string().required(),
});

export const getResourceResponseSchema = Joi.object({
  code: Joi.number(),
  payload: Joi.object(),
});
