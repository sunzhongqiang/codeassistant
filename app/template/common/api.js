const apiTemplateContent = `
{
  'model_query':'/{{=it.artifactId}}/{{=it.modelVar}}/query',
  'model_list':'/{{=it.artifactId}}/{{=it.modelVar}}/list',
  'model_get':'/{{=it.artifactId}}/{{=it.modelVar}}/get',
  'model_save':'/{{=it.artifactId}}/{{=it.modelVar}}/save',
  'model_delete':'/{{=it.artifactId}}/{{=it.modelVar}}/delete'
}

`

export default apiTemplateContent
