import CodeUtils from '../utils/CodeUtils'

const path = require('path')
const process = require('process')

const SEP = path.sep
const evnpath = process.env.NODE_ENV === 'development' ? '' : 'resources' + SEP
const PROCESSCWD = process.cwd()
const TEMPLATE_PATH = process.cwd() + SEP + evnpath + 'template'
const VARIABLE_TEMPLATE = TEMPLATE_PATH + SEP + evnpath + 'variable.dot'
const MODEL_TEMPLATE = TEMPLATE_PATH + SEP + evnpath + 'api' + SEP + 'model.dot'

const AppData = {
  TEMPLATE_PATH: TEMPLATE_PATH,
  SEP: SEP,
  MODEL_TEMPLATE: MODEL_TEMPLATE,
  VARIABLE_TEMPLATE: VARIABLE_TEMPLATE,
  PROCESSCWD: PROCESSCWD,
  currentFields: [],
  getModelFields: function () {
    let tableFields = this.currentFields
    let modelFields = []
    if (tableFields && Array.isArray(tableFields)) {
      for (const tableField of tableFields) {
        let modelField = {}
        modelField['name'] = CodeUtils.column2Field(tableField['COLUMN_NAME'])
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
