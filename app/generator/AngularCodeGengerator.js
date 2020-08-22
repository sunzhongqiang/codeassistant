import AppData from '../constants/AppData'
import DateUtils from '../utils/DateUtils'
import TemplateEngin from './TemplateEngin'
import angualarModelTemplate from '../template/angular/model'
import angualarServiceTemplate from '../template/angular/servcie'
import tableTemplate from '../template/angular/table'
import tableComponentTemplate from '../template/angular/table-compoonent'
import CodeUtils from '../utils/CodeUtils'

export default class AngularCodeGengerator {
  /**
   * 生成angular model 的代码
   */
  static generatorModelCode () {
    console.log('generator angular Model Code')
    let keyValue = {}
    keyValue['author'] = AppData.getProjectConfig('author')
    keyValue['model'] = AppData.getJavaName()
    keyValue['modelVar'] = CodeUtils.littleCamelCase(AppData.getJavaName())
    keyValue['comment'] = AppData.getTableComment()
    keyValue['table'] = AppData.getTableName()
    keyValue['fields'] = this.getTsFields();
    keyValue['date'] = DateUtils.format(new Date(), 'yyyy-MM-dd h:mm:ss')

    return TemplateEngin.generatorCodeByContent(angualarModelTemplate, keyValue)
  }

  static generateServiceCode(){
    console.log('generator angular Model Code')
    let keyValue = {}
    keyValue['author'] = AppData.getProjectConfig('author')
    keyValue['model'] = AppData.getJavaName()
    keyValue['modelVar'] = CodeUtils.littleCamelCase(AppData.getJavaName())
    keyValue['comment'] = AppData.getTableComment()
    keyValue['table'] = AppData.getTableName()
    keyValue['fields'] = this.getTsFields();
    keyValue['date'] = DateUtils.format(new Date(), 'yyyy-MM-dd h:mm:ss')
    return TemplateEngin.generatorCodeByContent(angualarServiceTemplate, keyValue)
  }

  static generateTableTemplate(){
    console.log('generator angular Model Code')
    let keyValue = {}
    keyValue['author'] = AppData.getProjectConfig('author')
    keyValue['model'] = AppData.getJavaName()
    keyValue['modelVar'] = CodeUtils.littleCamelCase(AppData.getJavaName())
    keyValue['comment'] = AppData.getTableComment()
    keyValue['table'] = AppData.getTableName()
    keyValue['fields'] = this.getTsFields();
    keyValue['date'] = DateUtils.format(new Date(), 'yyyy-MM-dd h:mm:ss')
    let result = TemplateEngin.generatorCodeByContent(tableTemplate, keyValue);
    return result.replace(/{~{/g,'{{').replace(/}~}/g,'}}');
  }

  static generateTableCopmonent(){
    console.log('generator angular Model Code')
    let keyValue = {}
    keyValue['author'] = AppData.getProjectConfig('author')
    keyValue['model'] = AppData.getJavaName()
    keyValue['modelVar'] = CodeUtils.littleCamelCase(AppData.getJavaName())
    keyValue['comment'] = AppData.getTableComment()
    keyValue['table'] = AppData.getTableName()
    keyValue['fields'] = this.getTsFields();
    keyValue['date'] = DateUtils.format(new Date(), 'yyyy-MM-dd h:mm:ss')
    return  TemplateEngin.generatorCodeByContent(tableComponentTemplate, keyValue);;
  }


  static getTsFields(){
    let column = localStorage.getItem('table.column')
    const tableFields = JSON.parse(column);
    console.log('tableFields',tableFields);
    let modelFields = []
    if (tableFields && Array.isArray(tableFields)) {
      for (const tableField of tableFields) {
        let modelField = {}
        // 字段定义
        const columnName = tableField['COLUMN_NAME']
        modelField['column'] = columnName
        modelField['name'] = CodeUtils.littleCamelCase(columnName)
        modelField['firstLetterUpperName'] = CodeUtils.bigCamelCase(columnName)
        // 类型
        const dataType = tableField['DATA_TYPE']
        modelField['type'] = CodeUtils.tableType2TsModelType(dataType)
        // 特殊表示
        modelField['comment'] = tableField['COLUMN_COMMENT']
        modelFields.push(modelField)
      }
    }
    console.log('modelfields',modelFields);
    return modelFields;
  }

 
}
