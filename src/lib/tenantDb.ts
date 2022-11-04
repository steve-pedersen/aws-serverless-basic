// import mysql from 'mysql';
import { TenantDbParams, DbConfigFields } from './types';

/**
 * Tenant DB
 */
class TenantDb {
  db: { dbHost: string; dbName: string; dbPassword: string; dbUser: string };

  /**
   *
   * @param {TenantDbParams} params
   */
  constructor(params: TenantDbParams) {
    const { db } = params;

    this.db = {
      dbHost: db.config.dbHost,
      dbUser: db.config.dbUser,
      dbPassword: db.config.dbPassword,
      dbName: db.config.dbName,
    } as DbConfigFields;
  }

  pool() {
    // const dbType = `db`;
    // const params = {
    //   host: this[dbType].dbHost,
    //   user: this[dbType].dbUser,
    //   password: this[dbType].dbPassword,
    //   database: this[dbType].dbName,
    // } as TenantDbPoolParams;
    // const pool = mysql.createPool(params);
    // return pool;
  }
}

export { TenantDb };
