import AppData from '../constants/AppData'
import DateUtils from '../utils/DateUtils'
import TemplateEngin from './TemplateEngin'
import vueformtemplate from '../template/vue/vue-form'
import vueTabletemplate from '../template/vue/vue-table'
import vueModelTemplate from '../template/vue/vue-model'
import vueQueryFormTemplate from '../template/vue/vue-query-form'
import vueApiemplate from '../template/vue/api'
import vueFieldTemplate from '../template/vue/vue-field-form'
import classApi from '../template/vue/classApi'
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

  static generatorModelCode () {
    console.log('generatorModel')
    let keyValue = {}

    keyValue['author'] = AppData.getProjectConfig('author')
    keyValue['model'] = AppData.getJavaName()
    keyValue['modelVar'] = CodeUtils.littleCamelCase(AppData.getJavaName())
    keyValue['comment'] = AppData.getTableComment()
    keyValue['table'] = AppData.getTableName()
    keyValue['fields'] = AppData.getJavaFields()
    keyValue['date'] = DateUtils.format(new Date(), 'yyyy-MM-dd h:mm:ss')

    return TemplateEngin.generatorCodeByContent(vueModelTemplate, keyValue)
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
  static generatorFieldCode(field,formType,validation,config){
    console.log('generatorFieldCode',arguments)
    let keyValue = {}

    keyValue['author'] = AppData.getProjectConfig('author')
    keyValue['model'] = AppData.getJavaName()
    keyValue['comment'] = AppData.getTableComment()
    keyValue['modelVar'] = CodeUtils.littleCamelCase(AppData.getJavaName())
    keyValue['table'] = AppData.getTableName()
    keyValue['field'] = field
    keyValue['formType'] = formType
    keyValue['validation'] = validation
    keyValue['config'] = config
    keyValue['date'] = DateUtils.format(new Date(), 'yyyy-MM-dd h:mm:ss')

    return TemplateEngin.generatorCodeByContent(vueFieldTemplate, keyValue)
  }

  static generatorClassApiCode(){
    console.log('生成 class api 对象代码',arguments)
    let keyValue = {}

    keyValue['model'] = AppData.getJavaName()
    keyValue['comment'] = AppData.getTableComment()
    keyValue['modelVar'] = CodeUtils.littleCamelCase(AppData.getJavaName())

    return TemplateEngin.generatorCodeByContent(classApi, keyValue)
  }

 
}
