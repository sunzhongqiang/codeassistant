import mysql from 'mysql';
import { message } from 'antd';
import { session } from 'electron';

export default class MySqlDriver {
  dbConfig = {};

  func() {
    message.warn('请传递处理方法');
  }

  constructor() {
    let host = sessionStorage.getItem('host');
    let port = sessionStorage.getItem('port');
    let user = sessionStorage.getItem('user');
    let password = sessionStorage.getItem('password');
    if (!host) {
      message.error('数据库链接有问题：host');
      return;
    }
    if (!port) {
      message.error('数据库链接有问题：port');
      return;
    }
    if (!user) {
      message.error('数据库链接有问题：user');
      return;
    }
    if (!password) {
      message.error('数据库链接有问题：password');
      return;
    }

    this.dbConfig = { host, port, user, password };
  }

  query(sql, data, func) {
    let db = mysql.createConnection(this.dbConfig);
    db.connect();
    if (func) {
      db.query(sql, data, this.processResult.bind(this, func));
    } else {
      db.query(sql, this.processResult.bind(this, data));
    }
  }

  processResult(func, error, result) {
    if (error) {
      console.log('database error:' + error);
      message.error(error.message);
      throw error;
    } else {
      func(result);
    }
  }

  static getI;
}
