const serviceImplTemplate = `package {{=it.groupId}}.{{=it.artifactId}}.service.impl;

import {{=it.groupId}}.{{=it.artifactId}}.model.{{=it.model}};
import {{=it.groupId}}.{{=it.artifactId}}.dto.{{=it.model}}Dto;
import {{=it.groupId}}.{{=it.artifactId}}.service.{{=it.model}}Service;
import {{=it.groupId}}.{{=it.artifactId}}.repository.{{=it.model}}Repository;
import com.mmk.gene.service.impl.BaseServiceImpl;
import java.util.List;
import java.util.Map;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * {{=it.model}}ServiceImpl: {{=it.comment}} 业务服务层实现.
 * 
 * <p>{{=it.date}}
 * 
 * @author {{=it.author}}
 * @version {{=it.version}}
 */

public class {{=it.model}}ServiceImpl extends BaseServiceImpl<{{=it.model}}, {{=it.pkType}}> implements {{=it.model}}Service {

  private Log log = LogFactory.getLog(this.getClass());
    
  private {{=it.model}}Repository {{=it.modelVar}}Repository;

  /**
  * 构造方法. 
  * 
  * @param {{=it.modelVar}}Repository 数据容器
  */
  @Autowired
  public {{=it.model}}ServiceImpl({{=it.model}}Repository {{=it.modelVar}}Repository) {
    super({{=it.modelVar}}Repository);
    this.{{=it.modelVar}}Repository = {{=it.modelVar}}Repository;
  }

  @Override
  public Page<{{=it.model}}> list({{=it.model}}Dto {{=it.modelVar}}Dto, Pageable pageable) {
    log.info("分页查询{{=it.comment}}列表");
    return {{=it.modelVar}}Repository.list({{=it.modelVar}}Dto, pageable);
  }

  @Override 
  public {{=it.model}} findBy(String field,Object value) {
    log.info("{{=it.comment}}根据字[" + field + "=" + value + "] 进行查询符合条件的唯一值");
    return {{=it.modelVar}}Repository.findBy(field,value);
  }
  
  @Override 
  public List<{{=it.model}}> findAllBy(String field,Object value) {
    log.info("{{=it.comment}}根据字[" + field + "=" + value + "] 进行查询符合条件的所有记录");
    return {{=it.modelVar}}Repository.findAllBy(field,value);
  }
}
`

export default serviceImplTemplate
