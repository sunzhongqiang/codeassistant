const vueTemplate = `
import BaseApi from '@/api/BaseApi'
/**
 * {{=it.comment}}数据访问接口
 */
class {{=it.model}}Api extends BaseApi {
  constructor() {
    super('/{{=it.modelVar}}')
  }
}

const {{=it.modelVar}}Api = new {{=it.model}}Api()
export default {{=it.modelVar}}Api;
`

export default vueTemplate
