import CodeUtils from '../utils/CodeUtils'

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

function getTableName () {
  return localStorage.getItem('table')
}

function setTableName (tablename) {
  localStorage.setItem('table', tablename)
}

function getColumnFields () {
  let columnFields = localStorage.getItem('table.column')
  return JSON.parse(columnFields)
}

function setColumnFields (columnFields) {
  let json = JSON.stringify(columnFields)
  localStorage.setItem('table.column', json)
}

function getJavaName () {
  let tableName = getTableName()
  if (tableName) {
    return CodeUtils.table2Model(tableName)
  }
  return null
}

function getJavaFields () {
  let tableFields = getColumnFields()
  let modelFields = []
  if (tableFields && Array.isArray(tableFields)) {
    for (const tableField of tableFields) {
      let modelField = {}
      modelField['name'] = CodeUtils.column2Field(tableField['COLUMN_NAME'])

      modelField['firstLetterUpperName'] = CodeUtils.firstLetterUpperFiledName(
        tableField['COLUMN_NAME']
      )

      modelField['type'] = CodeUtils.tableType2ModelType(
        tableField['DATA_TYPE']
      )

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
