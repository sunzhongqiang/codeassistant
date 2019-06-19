const copyModelTemplateContent = `
{{=it.model}}Dto {{=it.modelVar}}Dto = new {{=it.model}}Dto();
{{=it.model}} {{=it.modelVar}} = new {{=it.model}}();

{{~it.fields: field:index}}
{{=it.modelVar}}.set{{=field['firstLetterUpperName']}}({{=it.modelVar}}Dto.get{{=field['firstLetterUpperName']}}());{{~}}

`

export default copyModelTemplateContent
