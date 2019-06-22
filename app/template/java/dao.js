const daoTemplate = `package {{=it.groupId}}.{{=it.artifactId}}.dao;

import java.util.List;
import java.util.Map;
import com.mmk.gene.dao.SpringDataQueryDao;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import {{=it.groupId}}.{{=it.artifactId}}.model.{{=it.model}};


/**
 * {{=it.model}}Dao: {{=it.comment}} 数据资源层 
 * 
 * {{=it.date}}.
 * 
 * @author {{=it.author}}
 * @version {{=it.version}}
 */

public interface {{=it.model}}Dao extends SpringDataQueryDao<{{=it.model}}> {

  /**
   * 分页查询相关信息，根据传入的bean类对象和分页对象page取得查询结果集List
   * @param {{=it.model}} 查询类
   * @param pageable 传入的分页对象
   * @return 符合条件的查询结果集
   * 
   * 
   */
  Page<{{=it.model}}> list({{=it.model}}Dto {{=it.modelVar}}Dto,Pageable pageable);
  /**
   * 不分页查询相关信息，根据传入的model类对象取得查询结果集List
   * @param {{=it.model}} 查询类
   * @return 符合条件的查询结果集
   * 
   */
  
  Page< Map<String,Object>> listBySql({{=it.model}}Dto Dto,Pageable pageable);
  /**
   * 根据给定的字段和属性值，获得符合条件的第一个结果
   * @param field {{=it.model}} 中的某个字段
   * @param value 字段对应的值
   * @return 返回符合条件的结果，如果没有返回null
   * 
   * 
   */
  {{=it.model}} findBy(String field,Object value);
  
  /**
   * 根据给定的字段和属性值，获得符合条件的所有结果
   * @param field {{=it.model}} 中的某个字段
   * @param value 字段对应的值
   * @return 返回符合条件的所有结果
   * 
   * 
   */
  List<{{=it.model}}> findAllBy(String field,Object value);
  
}
`

export default daoTemplate
