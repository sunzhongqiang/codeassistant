const variableTemplateContent = `
#数据库连接配置
host:{{=it.host}}
port:{{=it.port}}
user:{{=it.user}}
password:{{=it.password}}
#项目配置
groupId:{{=it.projectPath}}
groupId:{{=it.groupId}}
artifactId:{{=it.artifactId}}
version:{{=it.version}}
author:{{=it.author}}

#当前工作变量
database:{{=it.database}}
table:{{=it.table}}
model:{{=it.model}}
`

export default variableTemplateContent
