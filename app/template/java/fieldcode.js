export default `

{{?it.config.show === 'page'}}
//repository & service
/**
 * 分页查询相关信息.
 * {{~it.fields:field:index}}
 * @param {{=field.name}} {{=field.comment}}{{~}}
 * @return 符合条件的查询分页结果
 */
  Page<{{=it.model}}> findAllBy{{~it.fields:field:index}}{{=field.firstLetterUpperName}}{{?index+1<it.fields.length}}And{{?}}{{~}}({{~it.fields:field:index}}{{=field.type}} {{=field.name}}{{?index+1<it.fields.length}}, {{?}}{{~}}, Pageable pageable);

  //service.impl

  @Override
  public Page<{{=it.model}}> findAllBy{{~it.fields:field:index}}{{=field.firstLetterUpperName}}{{?index+1<it.fields.length}}And{{?}}{{~}}({{~it.fields:field:index}}{{=field.type}} {{=field.name}}{{?index+1<it.fields.length}}, {{?}}{{~}}, Pageable pageable) {
    return {{=it.modelVar}}Repository.findAllBy{{~it.fields:field:index}}{{=field.firstLetterUpperName}}{{?index+1<it.fields.length}}And{{?}}{{~}}({{~it.fields:field:index}}{{=field.name}}{{?index+1<it.fields.length}}, {{?}}{{~}}, pageable);
  }

  //controller
  public ResultData findAllBy{{~it.fields:field:index}}{{=field.firstLetterUpperName}}{{?index+1<it.fields.length}}And{{?}}{{~}}({{~it.fields:field:index}}{{=field.type}} {{=field.name}}{{?index+1<it.fields.length}}, {{?}}{{~}}, Pageable pageable) {
    Page<{{=it.model}}>  result = {{=it.modelVar}}Service.findAllBy{{~it.fields:field:index}}{{=field.firstLetterUpperName}}{{?index+1<it.fields.length}}And{{?}}{{~}}({{~it.fields:field:index}}{{=field.name}}{{?index+1<it.fields.length}}, {{?}}{{~}},pageable);
    return ResultData.SUCCESS().addData("page",result);
  }


{{??it.config.show === 'list'}}
//repository & service
/**
 * 列表查询相关信息.
 * {{~it.fields:field:index}}
 * @param {{=field.name}} {{=field.comment}}{{~}}
 * @return 符合条件的结果列表
 */
  List<{{=it.model}}> findAllBy{{~it.fields:field:index}}{{=field.firstLetterUpperName}}{{?index+1<it.fields.length}}And{{?}}{{~}}({{~it.fields:field:index}}{{=field.type}} {{=field.name}}{{?index+1<it.fields.length}}, {{?}}{{~}});

  //service.impl
  
  @Override
  public List<{{=it.model}}> findAllBy{{~it.fields:field:index}}{{=field.firstLetterUpperName}}{{?index+1<it.fields.length}}And{{?}}{{~}}({{~it.fields:field:index}}{{=field.type}} {{=field.name}}{{?index+1<it.fields.length}}, {{?}}{{~}}) {
    return {{=it.modelVar}}Repository.findAllBy{{~it.fields:field:index}}{{=field.firstLetterUpperName}}{{?index+1<it.fields.length}}And{{?}}{{~}}({{~it.fields:field:index}}{{=field.name}}{{?index+1<it.fields.length}}, {{?}}{{~}});
  }

  //controller
  public ResultData findAllBy{{~it.fields:field:index}}{{=field.firstLetterUpperName}}{{?index+1<it.fields.length}}And{{?}}{{~}}({{~it.fields:field:index}}{{=field.type}} {{=field.name}}{{?index+1<it.fields.length}}, {{?}}{{~}}) {
    List<{{=it.model}}>  list = {{=it.modelVar}}Service.findAllBy{{~it.fields:field:index}}{{=field.firstLetterUpperName}}{{?index+1<it.fields.length}}And{{?}}{{~}}({{~it.fields:field:index}}{{=field.name}}{{?index+1<it.fields.length}}, {{?}}{{~}});
    return ResultData.SUCCESS().addData("list",list);
  }
{{??}}
//repository & service
/**
 * 查询相关信息.
 * {{~it.fields:field:index}}
 * @param {{=field.name}} {{=field.comment}}{{~}}
 * @return 符合条件的结果
 */
  {{=it.model}} findBy{{~it.fields:field:index}}{{=field.firstLetterUpperName}}{{?index+1<it.fields.length}}And{{?}}{{~}}({{~it.fields:field:index}}{{=field.type}} {{=field.name}}{{?index+1<it.fields.length}}, {{?}}{{~}});

  //service.impl

  @Override
  public {{=it.model}} findBy{{~it.fields:field:index}}{{=field.firstLetterUpperName}}{{?index+1<it.fields.length}}And{{?}}{{~}}({{~it.fields:field:index}}{{=field.type}} {{=field.name}}{{?index+1<it.fields.length}}, {{?}}{{~}}) {
    return {{=it.modelVar}}Repository.findBy{{~it.fields:field:index}}{{=field.firstLetterUpperName}}{{?index+1<it.fields.length}}And{{?}}{{~}}({{~it.fields:field:index}}{{=field.name}}{{?index+1<it.fields.length}}, {{?}}{{~}});
  }

  //controller
  public ResultData findAllBy{{~it.fields:field:index}}{{=field.firstLetterUpperName}}{{?index+1<it.fields.length}}And{{?}}{{~}}({{~it.fields:field:index}}{{=field.type}} {{=field.name}}{{?index+1<it.fields.length}}, {{?}}{{~}}) {
    {{=it.model}}  {{=it.modelVar}} = {{=it.modelVar}}Service.findBy{{~it.fields:field:index}}{{=field.firstLetterUpperName}}{{?index+1<it.fields.length}}And{{?}}{{~}}({{~it.fields:field:index}}{{=field.name}}{{?index+1<it.fields.length}}, {{?}}{{~}});
    return ResultData.SUCCESS().addData("{{=it.modelVar}}",{{=it.modelVar}});
  }
{{?}}
`