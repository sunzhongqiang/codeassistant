import CodeUtils from '../utils/CodeUtils'

const path = require('path')
const process = require('process')
const { URL } = require('url')
const templateVariableUrl = new URL(
  'https://raw.githubusercontent.com/sunzhongqiang/codeassistant/master/template/variable.dot'
)

const templateModelUrl = new URL(
  'https://raw.githubusercontent.com/sunzhongqiang/codeassistant/master/template/api/model.dot'
)

const SEP = path.sep
const PROCESSCWD = process.cwd()
const TEMPLATE_PATH = process.cwd() + SEP + 'template'
const VARIABLE_TEMPLATE =
  process.env.NODE_ENV === 'development'
    ? TEMPLATE_PATH + SEP + 'variable.dot'
    : templateVariableUrl
const MODEL_TEMPLATE =
  process.env.NODE_ENV === 'development'
    ? TEMPLATE_PATH + SEP + 'api' + SEP + 'model.dot'
    : templateModelUrl

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
