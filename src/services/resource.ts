import { Request as HapiRequest } from '@hapi/hapi';
import { DatabaseService } from './database';

/**
 * Resource Controller
 */
class ResourceService extends DatabaseService {
  query: any;

  params: any;

  payload: any;

  input: any;

  client: any;

  /**
   *
   * @param {HapiRequest} request
   */
  constructor(request: HapiRequest) {
    super(request);
    this.query = request.pre?.query;
    this.payload = request.pre?.payload;
    this.params = request.params;
    this.input = request.pre?.input;
  }

  parseResults(results: any[]) {
    const payload = {
      data: results,
      limit: 1,
      start: 1,
      total: 1,
    };

    return payload;
  }

  /**
   * Fetch a collection of records from Resources table
   * @returns {Promise<any>}
   */
  async getResources(): Promise<any> {
    // const sql = `SELECT * FROM resources`;
    // const pool = await this.getPool();

    return new Promise((resolve, reject) => {
      const err = '';
      if (err) reject(err);

      const payload = this.parseResults(['resource1', 'resource2']);
      resolve({ payload, code: 200 });
    });
  }

  /**
   * Fetch a single record from Resources table
   * @returns {Promise<any>}
   */
  async getResourceById(): Promise<any> {
    // const sql = `SELECT * FROM resources WHERE id = ${this.request.params.id}`;
    // const pool = await this.getPool();

    return new Promise((resolve, reject) => {
      const err = '';
      if (err) reject(err);

      const payload = this.parseResults([this.params || 'resource1']);
      resolve({ payload, code: 200 });
    });
  }
}

export { ResourceService };
