const jsonTemplateContent = `
{
  {{~it.fields : field : index}}{{=field['name']}} : '{{=field['type']}}', //{{=field['comment']}} 
  {{~}}
}

{{=it.mockData}}

{{=it.javaMockData}}

`

export default jsonTemplateContent
