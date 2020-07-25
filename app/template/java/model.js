const modelTemplateContent = `package {{=it.groupId}}.{{=it.artifactId}}.model;


import java.math.BigDecimal;
import java.util.Date;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import lombok.Data;
import org.hibernate.annotations.GenericGenerator;


/**
 * {{=it.model}}: {{=it.comment}} 数据领域模型.
 * 
 * <p>{{=it.date}}.
 * 
 * @author : {{=it.author}}
 * @version {{=it.version}}
 */
@Data
@Entity
@Table(name = "{{=it.table}}")
@GenericGenerator(name = "{{=it.table}}_uuid", strategy = "uuid")
public class {{=it.model}} {

{{~it.fields: field:index}}
  /**
   * {{=field['comment']}}.
   */
  {{? field['isPK'] }}@Id
  {{? field['increment']}}@GeneratedValue(strategy = GenerationType.IDENTITY)
  {{??}}@GeneratedValue(generator = "{{=it.table}}_uuid"){{?}}{{?}}
  {{? field['type'] == 'Date' }}@Temporal(TemporalType.TIMESTAMP)
  {{?}}@Column(name = "{{=field['column']}}", columnDefinition = "COMMENT '{{=field['comment']}}'")
  private {{=field['type']}} {{=field['name']}};
  {{~}}
}
`

export default modelTemplateContent
