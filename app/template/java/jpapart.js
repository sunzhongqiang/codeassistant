const sqlPartCode = `
StringBuilder sb = new StringBuilder();
Map<Integer, Object> params = new HashMap<>(16);
{{~it.sqlLines:line:index}}sb.append(" {{=line}}");
{{~}}
return queryFieldsBySql(sb.toString(), params, pageable);
`
export default sqlPartCode
