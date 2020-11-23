const template = `
export interface {{=it.model}} {
{{~it.fields: field:index}}
  /**
   * {{=field['comment']}}.
   */
  {{=field['name']}}: {{=field['type']}};
{{~}}
}
`

export default template
