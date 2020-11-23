let typeMap = {}

typeMap['TINYINT'] = 'Long'
typeMap['SMALLINT'] = 'Long'
typeMap['MEDIUMINT'] = 'Long'
typeMap['INTEGER'] = 'Long'
typeMap['BIGINT'] = 'Long'
typeMap['INT'] = 'Long'
typeMap['BIT'] = 'Boolean'

typeMap['FLOAT'] = 'BigDecimal'
typeMap['DOUBLE'] = 'BigDecimal'
typeMap['DECIMAL'] = 'BigDecimal'

typeMap['CHAR'] = 'String'
typeMap['VARCHAR'] = 'String'
typeMap['TINYBLOB'] = 'String'
typeMap['TINYTEXT'] = 'String'
typeMap['BLOB'] = 'String'
typeMap['TEXT'] = 'String'
typeMap['MEDIUMBLOB'] = 'String'
typeMap['MEDIUMTEXT'] = 'String'
typeMap['LONGBLOB'] = 'String'
typeMap['LONGTEXT'] = 'String'
typeMap['VARBINARY'] = 'String'
typeMap['BINARY'] = 'String'
typeMap['JSON'] = 'String'

typeMap['DATE'] = 'Date'
typeMap['TIME'] = 'Date'
typeMap['DATETIME'] = 'Date'
typeMap['TIMESTAMP'] = 'Date'
typeMap['YEAR'] = 'Date'

export default class JavaTypeUtils {
  static getModelTypeFromDataType (dataType) {
    let result = typeMap[dataType.toUpperCase()]
    return result
  }
}
