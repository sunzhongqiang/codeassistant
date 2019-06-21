import EventType from '../../eventbus/EventTyp'
import AppData from '../../constants/AppData'
import DateUtils from '../../utils/DateUtils'
import TemplateEngin from '../template/TemplateEngin'
import modelTemplateContent from '../../template/api/model'
import variableTemplateContent from '../../template/variable'
import dtoTemplateContent from '../../template/api/dto'
import CodeUtils from '../../utils/CodeUtils'
import copyModelTemplateContent from '../../template/api/dto2model'
import repositoryTemplate from '../../template/api/repository'

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
    keyValue['modelVar'] = CodeUtils.littleCamelCase(javaModel)

    return TemplateEngin.generatorCodeByContent(repositoryTemplate, keyValue)
  }
}
