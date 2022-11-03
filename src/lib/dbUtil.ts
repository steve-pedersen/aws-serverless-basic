// import { Connection } from 'mysql';

/**
 * DB Util
 */
class DbUtil {
  // connection: Connection;
  /**
   *
   * @param {Connection} connection
   */
  // constructor(connection: Connection) {
  //   this.connection = connection;
  // }
  /**
   * @description Simple DB transaction with commit and rollback
   * @param {Function} callback
   */
  // async withTransaction(callback: Function) {
  //   try {
  //     this.connection.beginTransaction();
  //     await callback();
  //     this.connection.commit();
  //   } catch (err) {
  //     this.connection.rollback();
  //     throw err;
  //   }
  // }
}

export { DbUtil };
