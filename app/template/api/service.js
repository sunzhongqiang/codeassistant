const serviceTemplate = `package {{=it.groupId}}.{{=it.artifactId}}.service;

import java.util.Date;
import java.util.List;
import com.mmk.gene.service.BaseService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import {{=it.groupId}}.{{=it.artifactId}}.model.{{=it.model}};
import {{=it.groupId}}.{{=it.artifactId}}.model.{{=it.model}}Dto;


/**
 * {{=it.model}}Servie: {{=it.comment}} 数据资源层 
 * 
 * {{=it.date}}.
 * 
 * @author {{=it.author}}
 * @version {{=it.version}}
 */

public interface {{=it.model}}Service extends BaseService<{{=it.model}}, {{=it.pkType }}> {

  /**
   * 生成的列表分页查询方法
   * @param {{=it.model}}Dto  查询条件
   * @param pageable 分页参数
   * @return 分页返回查询的结果
   * 
   */
  Page<{{=it.model}}> list({{=it.model}}Dto {{=it.model}}Dto, Pageable pageable);
  
  /**
   * 不分页查询相关信息，根据传入的model类对象取得查询结果集List
   * @param  {{=it.model}} 查询类
   * @return 查询的结果集
   * 
   */
  public List<{{=it.model}}> list({{=it.model}}Dto {{=it.model}});


  /**
   * 根据给定的字段和属性值，获得符合条件的第一个结果
   * @param field {{=it.model}} 中的某个字段
   * @param value 字段的值
   * @return {{=it.model}} 返回符合条件的结果，如果没有返回null
   * 
   * 
   */
  {{=it.model}} findBy(String field,Object value);
  
  /**
   * 根据给定的字段和属性值，获得符合条件的所有结果
   * @param field {{=it.model}}中的某个字段
   * @param value 字段的值
   * @return 返回符合条件的所有结果
   * 
   */
  List<{{=it.model}}> findAllBy(String field,Object value);
}
`

export default serviceTemplate
