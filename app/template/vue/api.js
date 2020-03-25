const vueTemplate = `
import { get, payload, deleteUrl,post } from '@/lib/baseapi'

export default {
  query(params) {
    return get('/{{=it.modelVar}}', params)
  },
  loadData(page) {
    return this.query({ page })
  },
  save(data) {
    return payload('/{{=it.modelVar}}', data)
  },
  find(id) {
    return get(\`/{{=it.modelVar}}/$\{id}\`)
  },
  delete(id) {
    return deleteUrl(\`/{{=it.modelVar}}/\${id}\`)
  },
  toggle(id) {
    return post(\`/{{=it.modelVar}}/toggle/\${id}\`)
  }
}
`

export default vueTemplate
