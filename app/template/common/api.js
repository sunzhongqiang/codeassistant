const apiTemplateContent = `
## 基本的CURD 接口使用的Restful风格的接口
{
  '{{=it.modelVar}}_query':{
    description:'对应的查询方法，综合查询',
    method:'GET',
    url:'/{{=it.modelVar}}'
  },
  '{{=it.modelVar}}_get':{
    description:'对应的单个对象方法，一般传递主键',
    method:'GET',
    url:'/{{=it.modelVar}}/\{id}'
  }, 
  '{{=it.modelVar}}_save':{
    description:'对应的数据保存和修改方法，一般对应的业务数据',
    method:'POST',
    url:'/{{=it.modelVar}}'
  },
  '{{=it.modelVar}}_update':{
    description:'修改方法，参数在body中一般对应的业务数据',
    method:'PUT',
    url:'/{{=it.modelVar}}'
  },
  '{{=it.modelVar}}_delete':{
    description:'对应的数据删除方法，一般传递主键',
    method:'DELETE',
    url:'/{{=it.modelVar}}/\{id}'
  }
}
`

export default apiTemplateContent
