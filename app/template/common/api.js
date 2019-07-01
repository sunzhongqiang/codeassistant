const apiTemplateContent = `
// 基本的CURD 接口使用的Restful风格的接口
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
    description:'对应的数据保存和新增，一般对应的业务数据',
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

// 更细致的颗粒度接口,针对业务的接口
{
  //读取接口R1
  '{{=it.modelVar}}_business_action1':{
    description:'对应的业务读取，限定词，一般为某个字段或者名称',
    method:'GET',
    url:'/{{=it.modelVar}}/名词限定词'
  }
  //数据写入W1
  '{{=it.modelVar}}_business_action2':{
    description:'对应的业务读取，限定词，一般为某个操作或者动词',
    method:'POST',
    url:'/{{=it.modelVar}}/动词限定词'
  }
  //业务组合
  '{{=it.modelVar}}_business_action2':{
    description:'更复杂更加颗粒度的业务操纵',
    method:'POST',
    url:'/{{=it.modelVar}}/名词限定词/动词限定词'
  }
}
`

export default apiTemplateContent
