import doT from 'dot'
import { message } from 'antd'
import eventbus from '../../eventbus/EventBus'
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

export default class TemplateEngin {
  static generatorCode (templateFile, keyValue, noticeEvent) {
    if (!keyValue) {
      keyValue = {}
    }

    fs.readFile(templateFile, 'utf8', function (error, codeTemplate) {
      if (error) {
        message.error(error)
        return
      }
      let template = doT.template(codeTemplate)
      let code = template(keyValue)
      eventbus.fire(noticeEvent, code)
    })
  }
}
