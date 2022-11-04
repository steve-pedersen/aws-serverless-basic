import SSM from 'aws-sdk/clients/ssm';
// import logger from '../utilities/logger';
import { ParameterStoreDataParams, ParameterStoreParams } from './types';

/**
 * Wrapper to AWS Parameter Store
 */
class ParameterStore {
  ssm: SSM;

  /**
   *
   * @param {ParameterStoreParams} params
   */
  constructor(params: ParameterStoreParams) {
    const options = {
      region: params.ssm.region,
    };
    this.ssm = new SSM(options);
    // logger.info('Creating a new SSM instance', { ...options });
  }

  /**
   *
   * @param {ParameterStoreDataParams} params
   */
  async getParam(params: ParameterStoreDataParams): Promise<any> {
    return new Promise((resolve, reject) => {
      this.ssm.getParameter(params, (err, data) => {
        if (err) {
          return reject(err);
        }

        return resolve(data);
      });
    });
  }

  /**
   *
   * @param {ParameterStoreDataParams} params
   */
  async getData(params: ParameterStoreDataParams) {
    // logger.info('Getting data from SSM', { ...params });

    try {
      const data = await this.getParam(params);

      return data.Parameter.Value;
    } catch (e) {
      // logger.info('Unable to get data from SSM', { params, error: e });
      console.log('Unable to get data from SSM', { params, error: e });
      throw e;
    }
  }
}

export { ParameterStore };
