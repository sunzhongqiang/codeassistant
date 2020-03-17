import AppData from '../../constants/AppData'
import DateUtils from '../../utils/DateUtils'
import TemplateEngin from '../../generator/TemplateEngin'
import modelTemplateContent from '../../template/java/model'
import variableTemplateContent from '../../template/variable'
import dtoTemplateContent from '../../template/java/dto'
import CodeUtils from '../../utils/CodeUtils'
import copyModelTemplateContent from '../../template/java/dto2model'
import repositoryTemplate from '../../template/java/repository'
import daoTemplate from '../../template/java/dao'
import daoImplTemplate from '../../template/java/daoImpl'
import serviceTemplate from '../../template/java/service'
import serviceImplTemplate from '../../template/java/serviceImpl'
import controllerTemplate from '../../template/java/controller'
import jsonTemplateContent from '../../template/common/json'
import apiTemplateContent from '../../template/common/api'

export default class CodeGengerator {
  /**
   * 生成系统变量的模版
   */
  static generatorTemplateVariable () {
    let keyValue = {}

    keyValue['host'] = AppData.getDatabaseConfig('host')
    keyValue['port'] = AppData.getDatabaseConfig('port')
    keyValue['user'] = AppData.getDatabaseConfig('user')
    keyValue['password'] = AppData.getDatabaseConfig('password')
    keyValue['database'] = AppData.getDatabase()
    keyValue['table'] = AppData.getTableName()
    keyValue['fields'] = AppData.getColumnFields()
    keyValue['model'] = AppData.getJavaName()
    keyValue['projectPath'] = AppData.getProjectConfig('path')
    keyValue['groupId'] = AppData.getProjectConfig('groupId')
    keyValue['artifactId'] = AppData.getProjectConfig('artifactId')
    keyValue['version'] = AppData.getProjectConfig('version')
    keyValue['author'] = AppData.getProjectConfig('author')
    keyValue['comment'] = AppData.getTableComment()

    return TemplateEngin.generatorCodeByContent(
      variableTemplateContent,
      keyValue
    )
  }

  static generatorJson () {
    let keyValue = {}

    keyValue['fields'] = AppData.getJavaFields()
    keyValue['mockData'] = JSON.stringify(AppData.getMockData())
    keyValue['javaMockData'] = JSON.stringify(AppData.getJavaMockData())

    return TemplateEngin.generatorCodeByContent(jsonTemplateContent, keyValue)
  }

  static generatorApi () {
    let keyValue = {}
    keyValue['groupId'] = AppData.getProjectConfig('groupId')
    keyValue['artifactId'] = AppData.getProjectConfig('artifactId')
    const javaModel = AppData.getJavaName()
    keyValue['model'] = javaModel
    keyValue['modelVar'] = CodeUtils.littleCamelCase(javaModel)
    return TemplateEngin.generatorCodeByContent(apiTemplateContent, keyValue)
  }
}
