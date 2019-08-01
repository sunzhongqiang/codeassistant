import { message } from 'antd'

const fs = require('fs')

export default class FileSystemUtils {
  /**
   * 逐级检查是否存在文件路径并进行创建
   * @param {完成路径} completePath
   */
  static mkdir (completePath) {
    let paths = completePath.split('/')
    let existsPath = []
    for (let path of paths) {
      if (path == '') {
        existsPath.push('/')
      } else {
        existsPath.push(path)
      }
      let currentPath = existsPath.join('/')
      if (!fs.existsSync(currentPath)) {
        fs.mkdirSync(currentPath)
      }
    }
  }

  static saveCode (file, content) {
    try {
      fs.writeFileSync(file, content)
    } catch (error) {
      message.error(error.message)
      return false
    }
    return true
  }

  static existFile (filename) {
    return fs.existsSync(filename)
  }
}
