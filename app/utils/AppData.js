const path = require('path')
const process = require('process')
const SEP = path.sep
const TEMPLATE_PATH = process.cwd() + SEP + 'template'
const VARIABLE_TEMPLATE = TEMPLATE_PATH + SEP + 'variable.dot'
const MODEL_TEMPLATE = TEMPLATE_PATH + SEP + 'api' + SEP + 'model.dot'

let currentFields = []

const AppData = {
  TEMPLATE_PATH: TEMPLATE_PATH,
  SEP: SEP,
  MODEL_TEMPLATE: MODEL_TEMPLATE,
  VARIABLE_TEMPLATE: VARIABLE_TEMPLATE,
  currentFields: []
}

export default AppData
