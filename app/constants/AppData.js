const path = require('path')
const process = require('process')

const SEP = path.sep
const evnpath = process.env.NODE_ENV === 'development' ? '' : 'resources' + SEP
const PROCESSCWD = process.cwd()
const TEMPLATE_PATH = process.cwd() + SEP + evnpath + 'template'
const VARIABLE_TEMPLATE = TEMPLATE_PATH + SEP + evnpath + 'variable.dot'
const MODEL_TEMPLATE = TEMPLATE_PATH + SEP + evnpath + 'api' + SEP + 'model.dot'

let currentFields = []

const AppData = {
  TEMPLATE_PATH: TEMPLATE_PATH,
  SEP: SEP,
  MODEL_TEMPLATE: MODEL_TEMPLATE,
  VARIABLE_TEMPLATE: VARIABLE_TEMPLATE,
  PROCESSCWD: PROCESSCWD,
  currentFields: []
}

export default AppData
