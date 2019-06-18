import mysql from 'mysql'
import { message } from 'antd'
import AppData from '../constants/AppData'
const { dialog } = require('electron').remote

export default class MySqlDriver {
  dbConfig = {}

  func () {
    message.warn('请传递处理方法')
  }

  checkConfig () {
    let { host, port, user, password } = AppData.getAllDatabaseConfig()
    if (!host) {
      message.error('数据库链接有问题：host 不可以为空')
      return false
    }
    if (!port) {
      message.error('数据库链接有问题：port 不可以为空')
      return false
    }
    if (!user) {
      message.error('数据库链接有问题：用户名不可以为空')
      return false
    }
    if (!password) {
      message.error('数据库链接有问题：password 不可以为空')
      return false
    }
    return true
  }

  query (sql, data, func) {
    if (this.checkConfig()) {
      let db = mysql.createConnection(AppData.getAllDatabaseConfig())
      db.connect()
      if (func) {
        db.query(sql, data, this.processResult.bind(this, func))
      } else {
        db.query(sql, this.processResult.bind(this, data))
      }
    }
  }

  processResult (func, error, result) {
    if (error) {
      console.log('database error:' + error)
      message.error(error.message)
      dialog.showErrorBox('数据库连接错误', error.message)
      throw error
    } else {
      func(result)
    }
  }
}
