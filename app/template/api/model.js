const modelTemplateContent = `package {{=it.groupId}}.{{=it.artifactId}}.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Column;

/**
* {{=it.model}}: {{=it.model}} 数据领域模型
* {{=it.date}}
*@author : {{=it.author}}
*@version {{=it.version}}
*/
@Entity
@Table(name="{{=it.table}}")
public class {{=it.model}} {

{{for (field of it.fields){ }}
  /**
  * {{=field['comment']}}.
  */
  private {{=field['type']}} {{=field['name']}}
{{}}}

{{for (field of it.fields){ }}
  /**
  * 获得{{=field['comment']}}.
  * @return {{=field['name']}} {{=field['comment']}}
  */
  public {{=field['type']}} get{{=field['firstLetterUpperName']}}(){
    return this.{{=field['name']}};
  }

  /**
  * 设置{{=field['comment']}}.
  * @param {{=field['name']}} {{=field['comment']}}
  */
  public void set{{=field['firstLetterUpperName']}}({{=field['type']}} {{=field['name']}}){
    this.{{=field['name']}} = {{=field['name']}};
  }
{{}}}
}
`

export default modelTemplateContent
