import TemplateEngin from '../generator/TemplateEngin'

export default class JsonFormatter {
  static toJson (data) {
    let result = ''
    if (Array.isArray(data)) {
      result = result.concat('[')
      for (let item of data) {
        result = result.concat(this.objectAsJson(item))
        result = result.concat(',\n')
        console.log('json', result)
      }
      result = result.concat(']')
    } else {
      return this.objectAsJson(data)
    }
    return result
  }

  static objectAsJson (objectValue) {
    let result = ''
    result = result.concat('  {')
    for (let key in objectValue) {
      let keyValue = `  '${key}' : '${objectValue[key]}',\n`
      result = result.concat(keyValue)
    }
    result = result.concat('  }')
    return result
  }
}
