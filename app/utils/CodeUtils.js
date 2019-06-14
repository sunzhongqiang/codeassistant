import FieldTypeUtils from './FieldTypeUtils'

export default class CodeUtils {
  static table2Model (tableName) {
    return this.preSql(tableName)
  }

  static column2Field (column) {
    let preSql = this.preSql(column)
    return this.firstLetterLowerCase(preSql)
  }

  static firstLetterUpperCase (name) {
    if (name.length > 1) {
      return name
        .substring(0, 1)
        .toUpperCase()
        .concat(name.substring(1, name.length))
    }
  }

  static firstLetterLowerCase (name) {
    if (name.length > 1) {
      return name
        .substring(0, 1)
        .toLowerCase()
        .concat(name.substring(1, name.length))
    }
  }

  static preSql (sql) {
    let preSql = sql.replace(/-/g, '_')
    let names = preSql.split('_')
    let result = []
    for (const name of names) {
      result.push(this.firstLetterUpperCase(name))
    }
    return result.join('')
  }

  static tableType2ModelType (datatype) {
    let modelType = 'String'
    if (datatype) {
      modelType = FieldTypeUtils.getModelTypeFromDataType(datatype)
    }
    return modelType
  }
}
