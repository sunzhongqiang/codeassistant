import doT from 'dot'
import { message } from 'antd'
import eventbus from '../../eventbus/EventBus'
import EventType from '../../eventbus/EventTyp'
import AppData from '../../utils/AppData'
import DateUtils from '../../utils/DateUtils'
import { from } from 'rxjs'

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
  static generatorModelCode () {
    let keyValue = {}

    for (let i = 0; i < localStorage.length; i++) {
      let key = localStorage.key(i)
      keyValue[key] = localStorage.getItem(key)
    }

    keyValue['fields'] = AppData.currentFields
    keyValue['date'] = DateUtils.format(new Date(), 'yyyy-MM-dd h:mm:ss')

    this.generatorCode(
      AppData.MODEL_TEMPLATE,
      keyValue,
      EventType.CODE_DATA_CHANGE
    )
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

    keyValue['fields'] = AppData.currentFields

    keyValue['processcwd'] = AppData.PROCESSCWD

    console.log('keyvalue', keyValue)

    this.generatorCode(
      AppData.VARIABLE_TEMPLATE,
      keyValue,
      EventType.VARIABLE_CODE_CHANGE
    )
  }

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
