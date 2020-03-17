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
  let database = getDatabase()
  if (database) {
    databaseConfig['database'] = database
  } else {
    delete databaseConfig['database']
  }
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

function setTableComment (comment) {
  localStorage.setItem('table.comment', comment)
  eventbus.fire(EventType.TABLE_COMMENT_CHANGE)
}

function getTableComment () {
  return localStorage.getItem('table.comment')
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
  setJavaFields()
  eventbus.fire(EventType.TABLE_DATA_CHANGE)
}

function getJavaName () {
  let tableName = getTableName()
  if (tableName) {
    return CodeUtils.bigCamelCase(tableName)
  }
  return null
}

function setJavaFields () {
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
  let json = JSON.stringify(modelFields)
  localStorage.setItem('java.field.list', json)
}

function getJavaFields () {
  let modelFields = localStorage.getItem('java.field.list')
  return JSON.parse(modelFields)
}

function setMockData (data) {
  console.log('data is ', data)
  if (data && data.length > 0) {
    console.log('set mock action')
    let json = JSON.stringify(data[0])
    localStorage.setItem('mock.table.data', json)
  }
}

function getMockData () {
  let data = localStorage.getItem('mock.table.data')
  return JSON.parse(data)
}

function getSelectedFields () {
  let data = localStorage.getItem('java.field.selected')
  return JSON.parse(data)
}
function setSelectedFields (row) {
  let json = JSON.stringify(row)
  localStorage.setItem('java.field.selected', json)
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

  setTableComment,
  getTableComment,

  getMockData,
  getJavaMockData: function () {
    let data = localStorage.getItem('mock.table.data')
    let json = JSON.parse(data)
    let result = {}
    for (let key in json) {
      let fieldName = CodeUtils.littleCamelCase(key)
      result[fieldName] = json[key]
    }
    return result
  },
  setMockData,

  getDatabase: getDatabase,
  setDatabase: setDatabase,

  getTableName: getTableName,
  setTableName: setTableName,

  getColumnFields: getColumnFields,
  setColumnFields: setColumnFields,

  getJavaName: getJavaName,

  getJavaFields: getJavaFields,
  setSelectedFields,
  getSelectedFields
}

export default AppData
