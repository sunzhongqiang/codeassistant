const controllerTemplate = `package {{=it.groupId}}.{{=it.artifactId}}.web.controller;

import {{=it.groupId}}.{{=it.artifactId}}.dto.{{=it.model}}Dto;
import {{=it.groupId}}.{{=it.artifactId}}.model.{{=it.model}};
import {{=it.groupId}}.{{=it.artifactId}}.service.{{=it.model}}Service;
import com.mmk.common.web.ResultData;
import javax.annotation.Resource;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

/**
 * {{=it.model}}Controller: {{=it.comment}} web控制层.
 * 
 * <p>{{=it.date}}.
 * 
 * @author {{=it.author}}
 * @version {{=it.version}}
 */
@RestController
public class {{=it.model}}Controller {
    
  private Log log = LogFactory.getLog(this.getClass());
  
  @Resource 
  private {{=it.model}}Service {{=it.modelVar}}Service;

  /**
   * 跳转至列表页面.
   *
   * @param {{=it.modelVar}}Dto 查询参数
   * @param pageable 分页参数
   * @return 返回分页数据
   */
  @GetMapping("/{{=it.modelVar}}")
  public ResultData list({{=it.model}}Dto {{=it.modelVar}}Dto, Pageable pageable) {
    log.info("{{=it.comment}}列表查询");
    Page<{{=it.model}}> {{=it.modelVar}}Page = {{=it.modelVar}}Service.list({{=it.modelVar}}Dto, pageable);
    return  ResultData.SUCCESS("{{=it.comment}}列表查询").content({{=it.modelVar}}Page);
  }
  
  
  
  /**
   * {{=it.comment}}数据保存方法.
   * 
   * @param {{=it.modelVar}}Dto 要保存的数据
   * @return {{=it.modelVar}} 保存后的数据
   */
  @PostMapping("/{{=it.modelVar}}")
  @PutMapping("/{{=it.modelVar}}")
  @ResponseBody
  public ResultData save(@RequestBody {{=it.model}}Dto {{=it.modelVar}}Dto) {
    log.info("{{=it.comment}}保存");
    try {
      {{=it.model}} {{=it.modelVar}} = {{=it.modelVar}}Dto.toEntity();
      {{=it.modelVar}}Service.save({{=it.modelVar}});
    } catch (Exception e) {
      log.error(e.getMessage(),e);
      return ResultData.ERROR("{{=it.comment}}保存失败");
    }
    return ResultData.SUCCESS("{{=it.comment}}保存成功");
  }
  
  
  
  /**
   * 跳转至详细信息页面.
   * 
   * @param id 参数
   * @return 详情数据
   */ 
  @GetMapping("/{{=it.modelVar}}/{id}")
  @ResponseBody
  public {{=it.model}} detail(@PathVariable {{=it.pkField['type']}} id) {
    log.info("{{=it.comment}}详细信息");
    return {{=it.modelVar}}Service.find(id);
  }
  
  /**
   * 删除数据操作组方法.
   * 
   * @param id 主键参数
   * @return 操作结果
   */
  @DeleteMapping("/{{=it.modelVar}}/{id}")
  public ResultData delete(@PathVariable {{=it.pkField['type']}} id) {
    log.info("{{=it.comment}}删除");
    try {
      {{=it.modelVar}}Service.deleteById(id);
    } catch (Exception e) {
      log.error(e.getMessage(), e);
      return ResultData.ERROR("删除失败");
    }
    return ResultData.SUCCESS("删除成功"); 
  }

}
`

export default controllerTemplate
