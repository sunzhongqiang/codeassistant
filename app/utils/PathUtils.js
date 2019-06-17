const javaPath = '/src/main/java'

export default class PathUtils {
  static getProjectPath () {
    let projectPath = localStorage.getItem('projectPath')
    return projectPath
  }

  static getPackagePath (packagename) {
    const path = packagename.split('.')
    return path.join('/')
  }
}
