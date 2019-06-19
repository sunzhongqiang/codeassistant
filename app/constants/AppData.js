import CodeUtils from '../utils/CodeUtils'
import eventbus from '../eventbus/EventBus'
import EventType from '../eventbus/EventTyp'

function setDatabaseConfig (name, value) {
  localStorage.setItem('database.config.' + name, value)
}

function getDatabaseConfig (name) {
  return localStorage.getItem('database.config.' + name)
}

function getAllDatabaseConfig () {
  let databaseConfig = {}
  databaseConfig['host'] = getDatabaseConfig('host')
  databaseConfig['port'] = getDatabaseConfig('port')
  databaseConfig['user'] = getDatabaseConfig('user')
  databaseConfig['password'] = getDatabaseConfig('password')
  return databaseConfig
}

function setProjectConfig (name, value) {
  localStorage.setItem('project.config.' + name, value)
}

function getProjectConfig (name) {
  return localStorage.getItem('project.config.' + name)
}

function getAllProjectConfig () {
  let projectConfig = {}
  projectConfig['path'] = getProjectConfig('path')
  projectConfig['groupId'] = getProjectConfig('groupId')
  projectConfig['artifactId'] = getProjectConfig('artifactId')
  projectConfig['version'] = getProjectConfig('version')
  projectConfig['author'] = getProjectConfig('author')
  return projectConfig
}

function getDatabase () {
  return localStorage.getItem('database.database')
}

function setDatabase (database) {
  localStorage.setItem('database.database', database)
}

function setDatabaseList (data) {
  localStorage.setItem('database.database.list', JSON.stringify(data))
  eventbus.fire(EventType.DATABASE_LIST_CHANGE)
}

function getDatabaseList () {
  let database = localStorage.getItem('database.database.list')
  return JSON.parse(database)
}

function setTableList (data) {
  localStorage.setItem('database.table.list', JSON.stringify(data))
  eventbus.fire(EventType.TABLE_LIST_CHANGE)
}

function getTableList () {
  let tables = localStorage.getItem('database.table.list')
  return JSON.parse(tables)
}

function getTableName () {
  return localStorage.getItem('table')
}

function setTableName (tablename) {
  localStorage.setItem('table', tablename)
  eventbus.fire(EventType.TABLE_DATA_CHANGE)
}

function getColumnFields () {
  let columnFields = localStorage.getItem('table.column')
  return JSON.parse(columnFields)
}

function setColumnFields (columnFields) {
  let json = JSON.stringify(columnFields)
  localStorage.setItem('table.column', json)
  eventbus.fire(EventType.TABLE_DATA_CHANGE)
}

function getJavaName () {
  let tableName = getTableName()
  if (tableName) {
    return CodeUtils.bigCamelCase(tableName)
  }
  return null
}

function getJavaFields () {
  let tableFields = getColumnFields()
  let modelFields = []
  if (tableFields && Array.isArray(tableFields)) {
    for (const tableField of tableFields) {
      let modelField = {}
      // 字段定义
      const columnName = tableField['COLUMN_NAME']
      modelField['column'] = columnName
      modelField['name'] = CodeUtils.littleCamelCase(columnName)
      modelField['firstLetterUpperName'] = CodeUtils.bigCamelCase(columnName)
      // 类型
      const dataType = tableField['DATA_TYPE']
      modelField['type'] = CodeUtils.tableType2ModelType(dataType)
      // 特殊表示
      modelField['isPK'] = tableField['COLUMN_KEY'] == 'PRI'
      modelField['increment'] = tableField['EXTRA'] == 'auto_increment'

      modelField['comment'] = tableField['COLUMN_COMMENT']
      modelFields.push(modelField)
    }
  }
  return modelFields
}

const AppData = {
  getAllDatabaseConfig: getAllDatabaseConfig,
  setDatabaseConfig: setDatabaseConfig,
  getDatabaseConfig: getDatabaseConfig,

  getAllProjectConfig: getAllProjectConfig,
  setProjectConfig: setProjectConfig,
  getProjectConfig: getProjectConfig,

  setDatabaseList,
  getDatabaseList,

  setTableList,
  getTableList,

  getDatabase: getDatabase,
  setDatabase: setDatabase,

  getTableName: getTableName,
  setTableName: setTableName,

  getColumnFields: getColumnFields,
  setColumnFields: setColumnFields,

  getJavaName: getJavaName,

  getJavaFields: getJavaFields
}

export default AppData
