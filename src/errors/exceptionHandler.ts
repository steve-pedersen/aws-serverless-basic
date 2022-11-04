import { Request as HapiRequest } from '@hapi/hapi';
import ApiError from './apiError';
import { ErrorResponse } from '../lib/types';

/**
 *
 */
class ExceptionHandler {
  correlationId: string;

  request: HapiRequest;

  constructor(request: HapiRequest) {
    this.correlationId = request.headers['s37-correlation-id'] || request.pre?.correlationId;
    this.request = request;
  }

  logException(error: ApiError): void {
    this.request.server.log('error', error.getLogMessage());
  }

  // TODO: find a slick, typescripty way to handle all the handlers below in a single method
  // handleError(errorType: string, message: string, details: string = '409 Conflict') {}

  /**
   * Handle HttpBadRequest. Triggered when an inbound request is malformed in some manner.
   *
   * @param {string} message - the custom, useful message to be returned
   * @param {string} details - HTTP error message
   * @returns {ErrorResponse}
   */
  handleHttpBadRequest(message: string, details: string = '400 Bad Request'): ErrorResponse {
    const error = new ApiError(400, message, this.correlationId, details);

    return this.buildResponse(error);
  }

  /**
   * Handle MissingRequestHeader. Triggered when an inbound request is missing an HTTP request header.
   *
   * @param {string} message - the custom, useful message to be returned
   * @param {string} details - HTTP error message
   * @returns {ErrorResponse}
   */
  handleMissingRequestHeader(message: string, details: string = '400 Bad Request'): ErrorResponse {
    const error = new ApiError(400, message, this.correlationId, details);

    return this.buildResponse(error);
  }

  /**
   * Handle HandlerNotFound. Triggered when an inbound request does not have a defined route.
   *
   * @param {string} message - the custom, useful message to be returned
   * @param {string} details - HTTP error message
   * @returns {ErrorResponse}
   */
  handleHandlerNotFound(message: string, details: string = '404 Not Found'): ErrorResponse {
    const error = new ApiError(404, message, this.correlationId, details);

    return this.buildResponse(error);
  }

  /**
   * Handle NotFound. Triggered when an individual resource is not found.
   *
   * @param {string} message - the custom, useful message to be returned
   * @param {string} details - HTTP error message
   * @returns {ErrorResponse}
   */
  handleNotFound(message: string, details: string = '404 Not Found'): ErrorResponse {
    return this.handleHandlerNotFound(message, details);
  }

  /**
   * Handle HttpMethodNotAllowed. Triggered when an HTTP verb is not defined route on a specific route.
   *
   * @param {string} message - the custom, useful message to be returned
   * @param {string} details - HTTP error message
   * @returns {ErrorResponse}
   */
  handleHttpMethodNotAllowed(message: string, details: string = '405 Method Not Allowed'): ErrorResponse {
    const error = new ApiError(405, message, this.correlationId, details);

    return this.buildResponse(error);
  }

  /**
   * Handle DuplicateKey. Triggered when a conflict on resource insertion is found.
   *
   * @param {string} message - the custom, useful message to be returned
   * @param {string} details - HTTP error message
   * @returns {ErrorResponse}
   */
  handleDuplicateKey(message: string, details: string = '409 Conflict'): ErrorResponse {
    const error = new ApiError(409, message, this.correlationId, details);

    return this.buildResponse(error);
  }

  /**
   * Handle InternalServerError. Generic catch-all error handler when all other error handlers fail
   *
   * @param {string} message - the custom, useful message to be returned
   * @param {string} details - HTTP error message
   * @returns {ErrorResponse}
   */
  handleInternalServerError(message: string, details: string = '500 Internal Server Error'): ErrorResponse {
    const error = new ApiError(500, message, this.correlationId, details);

    return this.buildResponse(error);
  }

  // handleMethodArgumentNotValid(message: string, details: string = '400 Conflict'): ErrorResponse {}
  // handleMethodArgumentTypeMismatch(message: string, details: string = '400 Conflict'): ErrorResponse {}
  // handleConstraintViolation(message: string, details: string = '400 Conflict'): ErrorResponse {}

  /**
   * Constructs the response
   *
   * @param {ApiError} error
   * @returns {ErrorResponse}
   */
  buildResponse(error: ApiError): ErrorResponse {
    this.logException(error);

    return { code: error.getHttpCode(), payload: error.getResponseData() };
  }
}

export default ExceptionHandler;
