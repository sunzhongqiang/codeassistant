import FieldTypeUtils from './FieldTypeUtils'

export default class CodeUtils {
  /**
   *将数据字段以大驼峰命名方式返回
   * @param {数据库命名方式} name
   */
  static bigCamelCase (name) {
    return this.preSql(name)
  }

  /**
   * 将数据字段以小驼峰命名方式返回
   * @param {数据库命名方式} name
   */
  static littleCamelCase (name) {
    let preSql = this.preSql(name)
    return this.firstLetterLowerCase(preSql)
  }

  /**
   * 将命名的第一个首字母大写
   * @param {命名} name
   */
  static firstLetterUpperCase (name) {
    if (name.length > 1) {
      return name
        .substring(0, 1)
        .toUpperCase()
        .concat(name.substring(1, name.length))
    }
  }

  /**
   * 将命名的第一个首字母小写
   * @param {命名} name
   */
  static firstLetterLowerCase (name) {
    if (name.length > 1) {
      return name
        .substring(0, 1)
        .toLowerCase()
        .concat(name.substring(1, name.length))
    }
  }

  /**
   *
   * @param {数据库命名方式} databaseName
   */
  static preSql (databaseName) {
    let preSql = databaseName.replace(/-/g, '_')
    let names = preSql.split('_')
    let result = []
    for (const name of names) {
      result.push(this.firstLetterUpperCase(name))
    }
    return result.join('')
  }

  /**
   * 将数据库的数据类型翻译为java的数据类型
   * @param {数据库数据类型} datatype
   */
  static tableType2ModelType (datatype) {
    let modelType = 'String'
    if (datatype) {
      modelType = FieldTypeUtils.getModelTypeFromDataType(datatype)
    }
    return modelType
  }

  /**
   * 获取当前字段列表的主键类型
   * @param { 当前的字段列表} fields
   */
  static getPkType (fields) {
    for (let field of fields) {
      if (field['isPK']) {
        return field['type']
      }
    }
  }

  static getPkField (fields) {
    for (let field of fields) {
      if (field['isPK']) {
        return field
      }
    }
  }
}
