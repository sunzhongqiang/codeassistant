import doT from 'dot'
import eventbus from '../../eventbus/EventBus'

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
  /**
   * 生成代码对核心方法
   * @param {*} templateContent
   * @param {*} keyValue
   * @param {*} noticeEvent
   */
  static generatorCodeByContent (templateContent, keyValue, noticeEvent) {
    if (!keyValue) {
      keyValue = {}
    }
    let template = doT.template(templateContent)
    let code = template(keyValue)
    eventbus.fire(noticeEvent, code)
  }
}
