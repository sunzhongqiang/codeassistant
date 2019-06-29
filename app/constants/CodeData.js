let javaLayer = [
  'model',
  'dto',
  'dao',
  'dao.impl',
  'repository',
  'service',
  'service.impl',
  'web.controller'
]
let jsLayer = ['model', 'component', 'api']

let flutter = ['model']

const CodeData = {
  getLayer: function (language) {
    if (language == 'java') {
      return javaLayer
    } else if (language == 'javascript' || language == 'js') {
      return jsLayer
    } else if (language == 'flutter') {
      return flutter
    }
  }
}

export default CodeData
