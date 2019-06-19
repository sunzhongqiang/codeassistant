import AppData from '../constants/AppData'
const javaPath = '/src/main/java'

export default class PathUtils {
  /**
   * 获取当前的项目路径
   */
  static getProjectPath () {
    let projectPath = AppData.getProjectConfig('path')
    return projectPath
  }

  /**
   * 获取当前项目代码存放的目录
   */
  static getSrcPath () {
    return this.getProjectPath() + javaPath
  }

  static getPackagePath (packagename) {
    let groupId = AppData.getProjectConfig('groupId')
    let artifactId = AppData.getProjectConfig('artifactId')
    let completePackage = groupId + '.' + artifactId + '.' + packagename
    let path = completePackage.split('.')

    return this.getSrcPath() + '/' + path.join('/')
  }
}
