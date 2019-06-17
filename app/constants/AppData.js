import CodeUtils from '../utils/CodeUtils'

const AppData = {
  projectPath: '',
  currentFields: [],
  getModelFields: function () {
    let tableFields = this.currentFields
    let modelFields = []
    if (tableFields && Array.isArray(tableFields)) {
      for (const tableField of tableFields) {
        let modelField = {}
        modelField['name'] = CodeUtils.column2Field(tableField['COLUMN_NAME'])

        modelField[
          'firstLetterUpperName'
        ] = CodeUtils.firstLetterUpperFiledName(tableField['COLUMN_NAME'])

        modelField['type'] = CodeUtils.tableType2ModelType(
          tableField['DATA_TYPE']
        )

        modelField['comment'] = tableField['COLUMN_COMMENT']
        modelFields.push(modelField)
      }
    }
    return modelFields
  }
}

export default AppData
