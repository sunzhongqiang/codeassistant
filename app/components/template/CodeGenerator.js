import doT from 'dot'
import eventbus from '../../eventbus/EventBus'
import EventType from '../../eventbus/EventTyp'
const fs = require('fs')
const path = require('path')
const process = require('process')

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

const sep = path.sep
const templatePath = process.cwd() + sep + 'template' + sep + 'api'

export default class CodeGengerator {
  static generatorModelCode (template, data) {
    console.log('gengerator data', data, template)
    let modelTemplateFile = templatePath + sep + 'model.dot'
    fs.readFile(modelTemplateFile, 'utf8', function (error, data) {
      eventbus.fire(EventType.CODE_DATA_CHANGE, data)
    })
  }
}
