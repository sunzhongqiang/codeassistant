const variableTemplateContent = `#当前系统变量

#数据库连接配置
host:{{=it.host}}
port:{{=it.port}}
user:{{=it.user}}
password:{{=it.password}}
#项目配置
groupId:{{=it.groupId}}
artifactId:{{=it.artifactId}}
version:{{=it.version}}

#当前工作变量
database:{{=it.database}}
table:{{=it.table}}
model:{{=it.model}}
`

export default variableTemplateContent
