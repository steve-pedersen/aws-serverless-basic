import { Request as HapiRequest } from '@hapi/hapi';
import { BaseController } from './base';
import { ResourceService } from '../services/resource';

/**
 * Resource Controller
 */
class ResourceController extends BaseController {
  query: any;

  params: any;

  payload: any;

  service: any;

  /**
   *
   * @param {HapiRequest} request
   */
  constructor(request: HapiRequest) {
    super(request);
    this.query = request.pre?.query as {};
    this.params = request.pre?.params;
    this.payload = request.pre?.payload;
    this.service = new ResourceService(request);
  }

  async getResources() {
    const { payload, code } = await this.service.getResources();

    return this.response(payload, code);
  }

  async getResourceById() {
    const { payload, code } = await this.service.getResourceById();

    return this.response(payload, code);
  }
}

export { ResourceController };
