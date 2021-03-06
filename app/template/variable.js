const variableTemplateContent = `
#数据库连接配置
host:{{=it.host}}
port:{{=it.port}}
user:{{=it.user}}
password:{{=it.password}}
#项目配置
projectPath:{{=it.projectPath}}
groupId:{{=it.groupId}}
artifactId:{{=it.artifactId}}
version:{{=it.version}}
author:{{=it.author}}

#当前工作变量
database:{{=it.database}}
comment:{{=it.comment}}
table:{{=it.table}}
model:{{=it.model}}

`

export default variableTemplateContent
