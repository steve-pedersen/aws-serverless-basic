import Joi from '@hapi/joi';

export const getResourceByIdRequestSchema = Joi.object({
  id: Joi.string().uuid().required(),
});

export const getResourceResponseSchema = Joi.object({
  code: Joi.number(),
  payload: Joi.object(),
});

export const errorResponseSchema = Joi.object({
  correlationId: Joi.string(),
  timestamp: Joi.string(),
  results: Joi.array().items({
    statusSet: Joi.array().items({
      errorCode: Joi.alternatives(Joi.string(), Joi.number()),
      moreInfo: Joi.string(),
      details: Joi.string(),
    }),
  }),
});
