const path = require('path')
const process = require('process')
const SEP = path.sep
const TEMPLATE_PATH = process.cwd() + SEP + 'template'
const VARIABLE_TEMPLATE = TEMPLATE_PATH + SEP + 'variable.dot'

const AppConfig = {
  TEMPLATE_PATH: TEMPLATE_PATH,
  SEP: SEP,
  MODEL_TEMPLATE: TEMPLATE_PATH + SEP + 'api' + SEP + 'model.dot',
  VARIABLE_TEMPLATE: VARIABLE_TEMPLATE
}

export default AppConfig
