const modelTemplateContent = `package {{=it.groupId}}.{{=it.artifactId}}.model;

import java.util.Date;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Column;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;


/**
* {{=it.model}}: {{=it.comment}} 数据领域模型.
* {{=it.date}}
*@author : {{=it.author}}
*@version {{=it.version}}
*/
@Entity
@Table(name="{{=it.table}}")
public class {{=it.model}} {

{{~it.fields: field:index}}
  /**
  * {{=field['comment']}}.
  */
  {{? field['isPK'] }}@Id{{? field['increment']}}
  @GeneratedValue(strategy = GenerationType.IDENTITY){{?}}{{?}}{{? field['type']=='Date' }}@Temporal(TemporalType.TIMESTAMP){{?}}
  @Column(name="{{=field['column']}}",columnDefinition="COMMENT '{{=field['comment']}}'")
  private {{=field['type']}} {{=field['name']}}{{~}};

{{~it.fields: field:index}}
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
{{~}}
}
`

export default modelTemplateContent
