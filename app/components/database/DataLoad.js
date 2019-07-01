import AppData from '../../constants/AppData'
import MySqlDriver from '../../service/mysqlDriver'
import eventbus from '../../eventbus/EventBus'
import EventType from '../../eventbus/EventTyp'
import JsonFormatter from '../../utils/JsonFormatter'

export default class DataLoad {
  /**
   * 加载数据库数据
   */
  static loadDatabase () {
    const mysqldb = new MySqlDriver()
    mysqldb.query(
      "select SCHEMA_NAME from information_schema.SCHEMATA where SCHEMA_NAME not  in('information_schema','mysql','performance_schema')",
      data => {
        AppData.setDatabaseList(data)
      }
    )
  }

  /**
   * 加载数据库的表
   * @param {数据库} database
   */
  static loadTable (database) {
    const mysqldb = new MySqlDriver()
    mysqldb.query(
      'select TABLE_NAME,TABLE_SCHEMA ,true as isNode from information_schema.TABLES where TABLE_SCHEMA = ? ',
      [database],
      data => {
        AppData.setTableList(data)
      }
    )
  }

  /**
   * 加载数据库表中的字段
   * @param {数据库} database
   * @param {表} table
   */
  static loadColumn (database, table) {
    const mysqldb = new MySqlDriver()
    mysqldb.query(
      'Select TABLE_NAME,COLUMN_NAME ,DATA_TYPE,COLUMN_KEY,EXTRA,COLUMN_COMMENT FROM INFORMATION_SCHEMA.COLUMNS  WHERE TABLE_SCHEMA= ? and TABLE_NAME = ? ',
      [database, table],
      data => {
        AppData.setColumnFields(data)
      }
    )
  }

  /**
   * 加载数据库表中的注释
   * @param {数据库} database
   * @param {数据库表} table
   */
  static loadTableComment (database, table) {
    const mysqldb = new MySqlDriver()
    mysqldb.query(
      'select TABLE_NAME,TABLE_COMMENT,TABLE_ROWS,AUTO_INCREMENT from information_schema.`TABLES` where TABLE_SCHEMA = ? and TABLE_NAME =? ',
      [database, table],
      data => {
        if (data.length > 0) {
          AppData.setTableComment(data[0]['TABLE_COMMENT'])
        }
      }
    )
  }

  static loadMockData (table) {
    const mysqldb = new MySqlDriver()
    mysqldb.query(`select * from ${table} limit 1`, [], data => {
      console.log('mock data', data)
      if (data.length > 0) {
        console.log('setMockdata')
        AppData.setMockData(data)
      }
    })
  }

  static loadDataBySql (sql) {
    const mysqldb = new MySqlDriver()
    mysqldb.query(sql, [], data => {
      console.log('mock data', data)
      let json = JsonFormatter.toJson(data)
      eventbus.fire(EventType.DATABASE_DATA_LOAD, json)
    })
  }
}
