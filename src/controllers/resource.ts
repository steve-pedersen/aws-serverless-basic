import { Request as HapiRequest } from '@hapi/hapi';
import { BaseController } from './base';

/**
 * Resource Controller
 */
class ResourceController extends BaseController {
  query: any;

  params: any;

  payload: any;

  /**
   *
   * @param {HapiRequest} request
   */
  constructor(request: HapiRequest) {
    super(request);
    this.query = request.pre?.query as {};
    this.params = request.pre?.params;
    this.payload = request.pre?.payload;
  }

  getResources() {
    return this.response({
      payload: {
        query: this.query,
        params: this.params,
        body: this.payload,
      },
    });
  }

  getResourceById() {
    return this.response({
      payload: {
        query: this.query,
        params: this.params,
        body: this.payload,
      },
    });
  }
}

export { ResourceController };
