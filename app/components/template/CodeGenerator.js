import EventType from '../../eventbus/EventTyp'
import AppData from '../../constants/AppData'
import DateUtils from '../../utils/DateUtils'
import TemplateEngin from './TemplateEngin'

export default class CodeGengerator {
  /**
   * 生成java model 的代码
   */
  static generatorModelCode () {
    let keyValue = {}

    for (let i = 0; i < localStorage.length; i++) {
      let key = localStorage.key(i)
      keyValue[key] = localStorage.getItem(key)
    }

    keyValue['fields'] = AppData.getModelFields()
    keyValue['date'] = DateUtils.format(new Date(), 'yyyy-MM-dd h:mm:ss')

    TemplateEngin.generatorCode(
      AppData.MODEL_TEMPLATE,
      keyValue,
      EventType.CODE_DATA_CHANGE
    )
  }

  /**
   * 生成系统变量的模版
   */
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

    TemplateEngin.generatorCode(
      AppData.VARIABLE_TEMPLATE,
      keyValue,
      EventType.VARIABLE_CODE_CHANGE
    )
  }
}
