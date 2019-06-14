const dtoTemplateContent = `package {{=it.groupId}}.{{=it.artifactId}}.model;
import {{=it.groupId}}.{{=it.artifactId}}.model.{{=it.model}};

/**
* 数据领域模型传值对象 : {{=it.model}} .
* {{=it.date}}
*@author 
*@version 1.0
*/
public class {{=it.model}}Dto extends {{=it.model}} {

  
}
`

export default dtoTemplateContent
