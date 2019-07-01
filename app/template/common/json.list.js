const jsonListTemplateContent = `
[
  {{~it.list : object : index}}
  {
    {{~object:field:index2}}
      {{=index2}}:{{=field}},
    {{~}}
  }
  {{~}}
]
`

export default jsonListTemplateContent
