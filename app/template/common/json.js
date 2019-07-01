const jsonTemplateContent = `
{
  {{~it.fields : field : index}}{{=field['name']}} : '{{=field['type']}}', //{{=field['comment']}} 
  {{~}}
}
`

export default jsonTemplateContent
