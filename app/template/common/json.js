const jsonTemplateContent = `
{
  {{~it.fields : field : index}}{{=field['name']}} : {{?field['type']=='String'}}'string content'{{??field['Date']}}'2019-06-22'{{??}}123456{{?}}, //{{=field['comment']}} 
  {{~}}
}

`

export default jsonTemplateContent
