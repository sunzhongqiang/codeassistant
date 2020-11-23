let typeMap = {}

typeMap['TINYINT'] = 'number'
typeMap['SMALLINT'] = 'number'
typeMap['MEDIUMINT'] = 'number'
typeMap['INTEGER'] = 'number'
typeMap['BIGINT'] = 'number'
typeMap['INT'] = 'number'
typeMap['BIT'] = 'boolean'

typeMap['FLOAT'] = 'number'
typeMap['DOUBLE'] = 'number'
typeMap['DECIMAL'] = 'number'

typeMap['CHAR'] = 'string'
typeMap['VARCHAR'] = 'string'
typeMap['TINYBLOB'] = 'string'
typeMap['TINYTEXT'] = 'string'
typeMap['BLOB'] = 'string'
typeMap['TEXT'] = 'string'
typeMap['MEDIUMBLOB'] = 'string'
typeMap['MEDIUMTEXT'] = 'string'
typeMap['LONGBLOB'] = 'string'
typeMap['LONGTEXT'] = 'string'
typeMap['VARBINARY'] = 'string'
typeMap['BINARY'] = 'string'
typeMap['JSON'] = 'string'

typeMap['DATE'] = 'Date'
typeMap['TIME'] = 'Date'
typeMap['DATETIME'] = 'Date'
typeMap['TIMESTAMP'] = 'Date'
typeMap['YEAR'] = 'Date'

export default class TsFieldTypeUtils {
  static getModelTypeFromDataType (dataType) {
    let result = typeMap[dataType.toUpperCase()]
    return result
  }
}
