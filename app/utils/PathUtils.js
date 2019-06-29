import AppData from '../constants/AppData'
import CodeUtils from './CodeUtils'
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

  /**
   * 获得保存文件的全路径：根据包和文件名
   * @param {所在的包} packagename
   * @param {文件名} file
   */
  static getCompleteFilePath (packagename, filename, suffix) {
    let path = this.getPackagePath(packagename)
    return path + '/' + filename + suffix
  }
}
