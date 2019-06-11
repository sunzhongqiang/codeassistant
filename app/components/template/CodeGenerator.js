import doT from 'dot'
import eventbus from '../../eventbus/EventBus'
import EventType from '../../eventbus/EventTyp'
import AppConfig from '../../utils/AppConfig'

const fs = require('fs')

doT.templateSettings = {
  evaluate: /\{\{([\s\S]+?)\}\}/g,
  interpolate: /\{\{=([\s\S]+?)\}\}/g,
  encode: /\{\{!([\s\S]+?)\}\}/g,
  use: /\{\{#([\s\S]+?)\}\}/g,
  define: /\{\{##\s*([\w\.$]+)\s*(\:|=)([\s\S]+?)#\}\}/g,
  conditional: /\{\{\?(\?)?\s*([\s\S]*?)\s*\}\}/g,
  iterate: /\{\{~\s*(?:\}\}|([\s\S]+?)\s*\:\s*([\w$]+)\s*(?:\:\s*([\w$]+))?\s*\}\})/g,
  varname: 'it',
  strip: false,
  append: true,
  selfcontained: false
}

export default class CodeGengerator {
  static generatorModelCode (template, keyValue) {
    let modelTemplateFile = AppConfig.MODEL_TEMPLATE

    if (!keyValue) {
      keyValue = {}
    }

    for (let i = 0; i < localStorage.length; i++) {
      let key = localStorage.key(i)
      keyValue[key] = localStorage.getItem(key)
    }

    fs.readFile(modelTemplateFile, 'utf8', function (error, codeTemplate) {
      let template = doT.template(codeTemplate)
      let code = template(keyValue)
      eventbus.fire(EventType.CODE_DATA_CHANGE, code)
    })
  }

  static generatorTemplateVariable () {
    let keyValue = {}

    // loal中的变量
    for (let i = 0; i < localStorage.length; i++) {
      let key = localStorage.key(i)
      keyValue[key] = localStorage.getItem(key)
    }

    // session中的变量
    for (let i = 0; i < sessionStorage.length; i++) {
      let key = sessionStorage.key(i)
      keyValue[key] = sessionStorage.getItem(key)
    }

    let variableTemplate = AppConfig.VARIABLE_TEMPLATE

    fs.readFile(variableTemplate, 'utf8', function (error, templateText) {
      console.log('templateText', templateText)
      let template = doT.template(templateText)
      let code = template(keyValue)
      console.log('generatorTemplateVariable', code, keyValue)
      eventbus.fire(EventType.VARIABLE_CODE_CHANGE, code)
    })
  }
}
