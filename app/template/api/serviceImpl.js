const serviceImplTemplate = `package {{=it.groupId}}.{{=it.artifactId}}.service.impl;

import java.util.List;
import java.util.Map;
import com.mmk.gene.service.BaseServiceImpl;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import {{=it.groupId}}.{{=it.artifactId}}.model.{{=it.model}};
import {{=it.groupId}}.{{=it.artifactId}}.model.{{=it.model}}Dto;
import {{=it.groupId}}.{{=it.artifactId}}.model.{{=it.model}}Service;
import {{=it.groupId}}.{{=it.artifactId}}.dao.{{=it.model}}Repository;


/**
 * {{=it.model}}ServiceImpl: {{=it.comment}} 业务服务层实现 
 * {{=it.date}}.
 * @author {{=it.author}}
 * @version {{=it.version}}
 */

public class {{=it.model}}ServiceImpl extends BaseServiceImpl<{{=it.model}}, {{=it.pkType}}> implements {{=it.model}}Service {

  private Log log = LogFactory.getLog(this.getClass());
    
  private {{=it.model}}Repository {{=it.modelVar}}Repository;
  /**
  *构造方法
  * @param {{=it.modelVar}}Repository 数据容器
  */
  @Autowired
  public {{=it.model}}ServiceImpl( {{=it.model}}Repository {{=it.modelVar}}Repository) {
      super({{=it.modelVar}}Repository);
      this.{{=it.modelVar}}Repository = {{=it.modelVar}}Repository;
  }

  @Override
  public Page<{{=it.model}}> list({{=it.model}}Condition {{=it.modelVar}}Condition, Pageable pageable) {
      log.info("{{=it.comment}}查询列表");
      return {{=it.modelVar}}Repository.list({{=it.modelVar}}Condition, pageable);
  }

  @Override 
  public {{=it.model}} findBy(String field,Object value){
      log.info("{{=it.comment}}根据字["+field+"="+value+"] 进行查询符合条件的唯一值");
      return {{=it.modelVar}}Repository.findBy(field,value);
  }
  
  @Override 
  public List<{{=it.model}}> findAllBy(String field,Object value){
      log.info("{{=it.comment}}根据字["+field+"="+value+"] 进行查询符合条件的所有记录");
      return {{=it.modelVar}}Repository.findAllBy(field,value);
  }
}
`

export default serviceImplTemplate
