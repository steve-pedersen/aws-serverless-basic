interface IResponse {
  code: number;
  payload: any;
}

class BaseController {
  request: any;

  corellationId: string;

  /**
   *
   * @param {any} request
   */
  constructor(request: any) {
    this.request = request;
    this.corellationId = request.headers['s37-correlation-id'] || request.correlationId;
  }

  /**
   *
   * @param {object} payload
   * @param {number} responseCode
   * @return {IResponse}
   */
  response(payload: object, responseCode: number = 200): IResponse {
    return {
      payload,
      code: responseCode,
    };
  }
}

export { BaseController };
