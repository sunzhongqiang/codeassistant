import EventType from '../../eventbus/EventTyp'
import AppData from '../../constants/AppData'
import DateUtils from '../../utils/DateUtils'
import TemplateEngin from './TemplateEngin'
import modelTemplateContent from '../../template/api/model'
import variableTemplateContent from '../../template/variable'
import dtoTemplateContent from '../../template/api/dto'

export default class CodeGengerator {
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

    return TemplateEngin.generatorCodeByContent(
      variableTemplateContent,
      keyValue,
      EventType.VARIABLE_CODE_CHANGE
    )
  }

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

    return TemplateEngin.generatorCodeByContent(
      modelTemplateContent,
      keyValue,
      EventType.CODE_DATA_CHANGE
    )
  }

  /**
   * 生成java dto 的代码
   */
  static generatorDtoCode () {
    let keyValue = {}

    for (let i = 0; i < localStorage.length; i++) {
      let key = localStorage.key(i)
      keyValue[key] = localStorage.getItem(key)
    }

    keyValue['fields'] = AppData.getModelFields()
    keyValue['date'] = DateUtils.format(new Date(), 'yyyy-MM-dd h:mm:ss')

    return TemplateEngin.generatorCodeByContent(
      dtoTemplateContent,
      keyValue,
      EventType.CODE_DATA_CHANGE
    )
  }
}
