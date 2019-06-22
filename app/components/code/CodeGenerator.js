import AppData from '../../constants/AppData'
import DateUtils from '../../utils/DateUtils'
import TemplateEngin from '../template/TemplateEngin'
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

  /**
   * 生成java model 的代码
   */
  static generatorModelCode () {
    let keyValue = {}

    keyValue['groupId'] = AppData.getProjectConfig('groupId')
    keyValue['artifactId'] = AppData.getProjectConfig('artifactId')
    keyValue['version'] = AppData.getProjectConfig('version')
    keyValue['author'] = AppData.getProjectConfig('author')
    keyValue['model'] = AppData.getJavaName()
    keyValue['comment'] = AppData.getTableComment()
    keyValue['table'] = AppData.getTableName()
    keyValue['fields'] = AppData.getJavaFields()
    keyValue['date'] = DateUtils.format(new Date(), 'yyyy-MM-dd h:mm:ss')

    return TemplateEngin.generatorCodeByContent(modelTemplateContent, keyValue)
  }

  /**
   * 生成java dto 的代码
   */
  static generatorDtoCode () {
    let keyValue = {}

    keyValue['groupId'] = AppData.getProjectConfig('groupId')
    keyValue['artifactId'] = AppData.getProjectConfig('artifactId')
    keyValue['version'] = AppData.getProjectConfig('version')
    keyValue['author'] = AppData.getProjectConfig('author')
    keyValue['model'] = AppData.getJavaName()
    keyValue['comment'] = AppData.getTableComment()
    keyValue['table'] = AppData.getTableName()
    keyValue['fields'] = AppData.getJavaFields()
    keyValue['date'] = DateUtils.format(new Date(), 'yyyy-MM-dd h:mm:ss')

    return TemplateEngin.generatorCodeByContent(dtoTemplateContent, keyValue)
  }

  static generatorCopyCode () {
    let keyValue = {}
    const javaModel = AppData.getJavaName()
    keyValue['model'] = javaModel
    keyValue['modelVar'] = CodeUtils.littleCamelCase(javaModel)
    keyValue['fields'] = AppData.getJavaFields()

    return TemplateEngin.generatorCodeByContent(
      copyModelTemplateContent,
      keyValue
    )
  }

  static generatorRepositoryCode () {
    let keyValue = {}
    const javaModel = AppData.getJavaName()
    keyValue['model'] = javaModel
    keyValue['groupId'] = AppData.getProjectConfig('groupId')
    keyValue['artifactId'] = AppData.getProjectConfig('artifactId')
    keyValue['version'] = AppData.getProjectConfig('version')
    keyValue['author'] = AppData.getProjectConfig('author')
    keyValue['comment'] = AppData.getTableComment()

    keyValue['date'] = DateUtils.format(new Date(), 'yyyy-MM-dd h:mm:ss')
    keyValue['modelVar'] = CodeUtils.littleCamelCase(javaModel)
    let fields = AppData.getJavaFields()
    keyValue['pkType'] = CodeUtils.getPkType(fields)

    return TemplateEngin.generatorCodeByContent(repositoryTemplate, keyValue)
  }

  static generatorDaoCode () {
    let keyValue = {}
    const javaModel = AppData.getJavaName()
    keyValue['model'] = javaModel
    keyValue['groupId'] = AppData.getProjectConfig('groupId')
    keyValue['artifactId'] = AppData.getProjectConfig('artifactId')
    keyValue['version'] = AppData.getProjectConfig('version')
    keyValue['author'] = AppData.getProjectConfig('author')
    keyValue['comment'] = AppData.getTableComment()
    keyValue['date'] = DateUtils.format(new Date(), 'yyyy-MM-dd h:mm:ss')

    return TemplateEngin.generatorCodeByContent(daoTemplate, keyValue)
  }

  static generatorDaoImplCode () {
    let keyValue = {}
    const javaModel = AppData.getJavaName()
    keyValue['model'] = javaModel
    keyValue['groupId'] = AppData.getProjectConfig('groupId')
    keyValue['artifactId'] = AppData.getProjectConfig('artifactId')
    keyValue['version'] = AppData.getProjectConfig('version')
    keyValue['author'] = AppData.getProjectConfig('author')
    keyValue['comment'] = AppData.getTableComment()

    keyValue['date'] = DateUtils.format(new Date(), 'yyyy-MM-dd h:mm:ss')
    keyValue['modelVar'] = CodeUtils.littleCamelCase(javaModel)
    let fields = AppData.getJavaFields()
    keyValue['fields'] = fields

    return TemplateEngin.generatorCodeByContent(daoImplTemplate, keyValue)
  }

  static generatorServiceCode () {
    let keyValue = {}
    const javaModel = AppData.getJavaName()
    keyValue['model'] = javaModel
    keyValue['groupId'] = AppData.getProjectConfig('groupId')
    keyValue['artifactId'] = AppData.getProjectConfig('artifactId')
    keyValue['version'] = AppData.getProjectConfig('version')
    keyValue['author'] = AppData.getProjectConfig('author')
    keyValue['comment'] = AppData.getTableComment()
    keyValue['date'] = DateUtils.format(new Date(), 'yyyy-MM-dd h:mm:ss')
    keyValue['modelVar'] = CodeUtils.littleCamelCase(javaModel)
    let fields = AppData.getJavaFields()
    keyValue['pkType'] = CodeUtils.getPkType(fields)

    return TemplateEngin.generatorCodeByContent(serviceTemplate, keyValue)
  }

  static generatorServiceImplCode () {
    let keyValue = {}
    const javaModel = AppData.getJavaName()
    keyValue['model'] = javaModel
    keyValue['groupId'] = AppData.getProjectConfig('groupId')
    keyValue['artifactId'] = AppData.getProjectConfig('artifactId')
    keyValue['version'] = AppData.getProjectConfig('version')
    keyValue['author'] = AppData.getProjectConfig('author')
    keyValue['comment'] = AppData.getTableComment()

    keyValue['date'] = DateUtils.format(new Date(), 'yyyy-MM-dd h:mm:ss')
    keyValue['modelVar'] = CodeUtils.littleCamelCase(javaModel)
    let fields = AppData.getJavaFields()
    keyValue['pkType'] = CodeUtils.getPkType(fields)

    return TemplateEngin.generatorCodeByContent(serviceImplTemplate, keyValue)
  }

  static generatorControllerCode () {
    let keyValue = {}
    const javaModel = AppData.getJavaName()
    keyValue['model'] = javaModel
    keyValue['groupId'] = AppData.getProjectConfig('groupId')
    keyValue['artifactId'] = AppData.getProjectConfig('artifactId')
    keyValue['version'] = AppData.getProjectConfig('version')
    keyValue['author'] = AppData.getProjectConfig('author')
    keyValue['comment'] = AppData.getTableComment()
    keyValue['date'] = DateUtils.format(new Date(), 'yyyy-MM-dd h:mm:ss')
    keyValue['modelVar'] = CodeUtils.littleCamelCase(javaModel)
    let fields = AppData.getJavaFields()
    keyValue['pkField'] = CodeUtils.getPkField(fields)

    return TemplateEngin.generatorCodeByContent(controllerTemplate, keyValue)
  }
}
