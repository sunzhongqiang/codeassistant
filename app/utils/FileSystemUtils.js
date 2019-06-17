const fs = require('fs')

export default class FileSystemUtils {
  static openDirect () {
    return fs.openSync('/', 'r')
  }
}
