// import mysql, { Pool, Connection } from 'mysql';
// import config from '../../config';
// import { TenantConfig } from '../lib/tenantConfig';

/**
 * Base Controller
 */
class DatabaseService {
  tenantConfig: any;

  request: any;

  corellationId: string;

  /**
   *
   * @param {any} request
   */
  constructor(request: any) {
    this.request = request;
    // this.tenantConfig = new TenantConfig(config);
    // this.corellationId = request.headers['s37-correlation-id'] || request.correlationId;
  }

  /**
   * Establishes and returns a connection to the MySQL pool
   * @returns {Promise<Pool>} the connection pool
   */
  async getPool(): Promise<any> {
    // const dbConfig = await this.tenantConfig.dbConfig();
    // return mysql.createPool({
    //   host: dbConfig.token.dbHost,
    //   user: dbConfig.token.dbUser,
    //   password: dbConfig.token.dbPassword,
    //   database: 'dev1_platform_reference',
    // });
  }

  /**
   * Wraps a connection query in a transaction
   * @param connection
   * @param callback
   */
  // async withTransaction(connection: Connection, callback: Function) {
  async withTransaction(connection: any, callback: Function) {
    try {
      connection.beginTransaction();
      await callback();
      connection.commit();
    } catch (err) {
      connection.rollback();
    }
  }
}

export { DatabaseService };
