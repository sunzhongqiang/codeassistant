const vueTemplate = `
import { get, payload, deleteUrl } from '@/lib/baseapi'

export default {
  loadData(page) {
    return get('/{{=it.modelVar}}', { page })
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
    return get(\`/{{=it.modelVar}}/toggle/\${id}\`)
  }
}
`

export default vueTemplate
