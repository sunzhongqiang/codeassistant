const dtoTemplateContent = `package {{=it.groupId}}.{{=it.artifactId}}.dto;

import {{=it.groupId}}.{{=it.artifactId}}.model.{{=it.model}};
import java.math.BigDecimal;
import java.util.Date;
import java.util.Map;
import org.apache.commons.collections4.MapUtils;

/**
 * {{=it.comment}} 传值对象 : {{=it.model}} 
 * 
 * <p>{{=it.date}}.
 * @author :{{=it.author}}
 * @version {{=it.version}}
 */
public class {{=it.model}}Dto extends {{=it.model}} {
  /**
   * 由Dto转变成Entity.
   */
  public {{=it.model}} toEntity() {

    {{=it.model}} {{=it.modelVar}} = new {{=it.model}}();
    {{~it.fields: field:index}}
    {{=it.modelVar}}.set{{=field['firstLetterUpperName']}}(this.get{{=field['firstLetterUpperName']}}());{{~}}

    return {{=it.modelVar}};
  }

  /**
   * 全局方法：由dto变为entity.
   *
   * @param {{=it.modelVar}}Dto dto
   * @return 对应的实体
   */
  public static {{=it.model}} toEntity({{=it.model}}Dto {{=it.modelVar}}Dto) {
    {{=it.model}} {{=it.modelVar}} = new {{=it.model}}();
    {{~it.fields: field:index}}
    {{=it.modelVar}}.set{{=field['firstLetterUpperName']}}({{=it.modelVar}}Dto.get{{=field['firstLetterUpperName']}}());{{~}}
    
    return {{=it.modelVar}};
  }

  /**
   * 将Entity转变成Dto.
   * @param {{=it.modelVar}} 实体
   * @return dto对象
   */
  public static {{=it.model}}Dto toDto({{=it.model}} {{=it.modelVar}}) {

    {{=it.model}}Dto {{=it.modelVar}}Dto = new {{=it.model}}Dto();
    {{~it.fields: field:index}}
    {{=it.modelVar}}Dto.set{{=field['firstLetterUpperName']}}({{=it.modelVar}}.get{{=field['firstLetterUpperName']}}());{{~}}

    return {{=it.modelVar}}Dto;
  }

  /**
   * 将map映射合成Dto对象.
   * 
   * @param map 对象
   * @return 对应的dto对象
   */
  public static {{=it.model}}Dto mapping(Map<String,Object> map) {
    {{=it.model}}Dto {{=it.modelVar}}Dto = new {{=it.model}}Dto();
    {{~it.fields: field:index}}
    {{? field['type']=='Date' || field['type']=='BigDecimal' }}
    if (MapUtils.getObject(map,"{{=field['name']}}") != null) {
      {{=it.modelVar}}Dto.set{{=field['firstLetterUpperName']}}(({{=field['type']}})MapUtils.getObject(map,"{{=field['name']}}"));
    } else if (MapUtils.getObject(map,"{{=field['column']}}") != null) {
      {{=it.modelVar}}Dto.set{{=field['firstLetterUpperName']}}(({{=field['type']}})MapUtils.getObject(map,"{{=field['column']}}"));
    }
    {{??}}
    if (MapUtils.get{{=field['type']}}(map,"{{=field['name']}}") != null) {
      {{=it.modelVar}}Dto.set{{=field['firstLetterUpperName']}}(MapUtils.get{{=field['type']}}(map,"{{=field['name']}}"));
    } else if (MapUtils.get{{=field['type']}}(map,"{{=field['column']}}") != null) {
      {{=it.modelVar}}Dto.set{{=field['firstLetterUpperName']}}(MapUtils.get{{=field['type']}}(map,"{{=field['column']}}"));
    }
    {{?}}
    {{~}}

    return {{=it.modelVar}}Dto;
  }
}
`

export default dtoTemplateContent
