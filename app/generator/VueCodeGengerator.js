import AppData from '../constants/AppData'
import DateUtils from '../utils/DateUtils'
import TemplateEngin from './TemplateEngin'
import vueformtemplate from '../template/vue/vue-form'
import vueTabletemplate from '../template/vue/vue-table'
import vueQueryFormTemplate from '../template/vue/vue-query-form'
import vueApiemplate from '../template/vue/api'
import CodeUtils from '../utils/CodeUtils'

export default class VueCodeGengerator {
  /**
   * 生成vue model 的代码
   */
  static generatorVueTableCode () {
    console.log('generatorVUETableCode')
    let keyValue = {}

    keyValue['author'] = AppData.getProjectConfig('author')
    keyValue['model'] = AppData.getJavaName()
    keyValue['modelVar'] = CodeUtils.littleCamelCase(AppData.getJavaName())
    keyValue['comment'] = AppData.getTableComment()
    keyValue['table'] = AppData.getTableName()
    keyValue['fields'] = AppData.getJavaFields()
    keyValue['date'] = DateUtils.format(new Date(), 'yyyy-MM-dd h:mm:ss')

    return TemplateEngin.generatorCodeByContent(vueTabletemplate, keyValue)
  }

  static generatorVueFormCode () {
    console.log('generatorVueFromCode')
    let keyValue = {}

    keyValue['author'] = AppData.getProjectConfig('author')
    keyValue['model'] = AppData.getJavaName()
    keyValue['comment'] = AppData.getTableComment()
    keyValue['modelVar'] = CodeUtils.littleCamelCase(AppData.getJavaName())
    keyValue['table'] = AppData.getTableName()
    keyValue['fields'] = AppData.getJavaFields()
    keyValue['date'] = DateUtils.format(new Date(), 'yyyy-MM-dd h:mm:ss')

    return TemplateEngin.generatorCodeByContent(vueformtemplate, keyValue)
  }

  static generatorVueApiCode(){
    console.log('generatorApiCode')
    let keyValue = {}

    keyValue['author'] = AppData.getProjectConfig('author')
    keyValue['model'] = AppData.getJavaName()
    keyValue['comment'] = AppData.getTableComment()
    keyValue['modelVar'] = CodeUtils.littleCamelCase(AppData.getJavaName())
    keyValue['table'] = AppData.getTableName()
    keyValue['fields'] = AppData.getJavaFields()
    keyValue['date'] = DateUtils.format(new Date(), 'yyyy-MM-dd h:mm:ss')

    return TemplateEngin.generatorCodeByContent(vueApiemplate, keyValue)
  }

  static generatorQueryFormCode(){
    console.log('generatorQueryCode')
    let keyValue = {}

    keyValue['author'] = AppData.getProjectConfig('author')
    keyValue['model'] = AppData.getJavaName()
    keyValue['comment'] = AppData.getTableComment()
    keyValue['modelVar'] = CodeUtils.littleCamelCase(AppData.getJavaName())
    keyValue['table'] = AppData.getTableName()
    keyValue['fields'] = AppData.getJavaFields()
    keyValue['date'] = DateUtils.format(new Date(), 'yyyy-MM-dd h:mm:ss')

    return TemplateEngin.generatorCodeByContent(vueQueryFormTemplate, keyValue)
  }

 
}
