const apiTemplateContent = `
{
  '{{=it.modelVar}}_query':'/{{=it.artifactId}}/{{=it.modelVar}}/query',
  '{{=it.modelVar}}_list':'/{{=it.artifactId}}/{{=it.modelVar}}/list',
  '{{=it.modelVar}}_get':'/{{=it.artifactId}}/{{=it.modelVar}}/get',
  '{{=it.modelVar}}_save':'/{{=it.artifactId}}/{{=it.modelVar}}/save',
  '{{=it.modelVar}}_delete':'/{{=it.artifactId}}/{{=it.modelVar}}/delete'
}

`

export default apiTemplateContent
