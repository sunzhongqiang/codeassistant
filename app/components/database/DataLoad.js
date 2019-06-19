import AppData from '../../constants/AppData'
import MySqlDriver from '../../service/mysqlDriver'

export default class DataLoad {
  static loadDatabase () {
    const mysqldb = new MySqlDriver()
    mysqldb.query(
      "select SCHEMA_NAME from information_schema.SCHEMATA where SCHEMA_NAME not  in('information_schema','mysql','performance_schema')",
      data => {
        AppData.setDatabaseList(data)
      }
    )
  }

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

  static loadTableComment (database, table) {
    const mysqldb = new MySqlDriver()
    mysqldb.query(
      'select TABLE_NAME,TABLE_COMMENT,TABLE_ROWS,AUTO_INCREMENT from information_schema.`TABLES` where TABLE_SCHEMA = ? and TABLE_NAME =? ',
      [database, table],
      data => {
        console.log('tablecomment', data)
        if (data.length > 0) {
          AppData.setTableComment(data[0]['TABLE_COMMENT'])
        }
      }
    )
  }
}
