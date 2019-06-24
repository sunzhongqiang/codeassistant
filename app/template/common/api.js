const apiTemplateContent = `
{
  '{{=it.modelVar}}_query':'/{{=it.artifactId}}/{{=it.modelVar}}/query',   //对应的查询方法，综合查询
  '{{=it.modelVar}}_list':'/{{=it.artifactId}}/{{=it.modelVar}}/list',     //对应的列表方法，可以简单的筛选
  '{{=it.modelVar}}_get':'/{{=it.artifactId}}/{{=it.modelVar}}/get',       //对应的单个对象方法，一般传递主键
  '{{=it.modelVar}}_save':'/{{=it.artifactId}}/{{=it.modelVar}}/save',     //对应的数据保存和修复方法，一般对应的业务数据
  '{{=it.modelVar}}_delete':'/{{=it.artifactId}}/{{=it.modelVar}}/delete'  //对应的数据删除方法，一般传递主键
}

`

export default apiTemplateContent
