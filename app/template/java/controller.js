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
   * 获取{{=it.comment}}列表接口.
   *
   * @param {{=it.modelVar}}Dto 查询参数
   * @param pageable 分页参数
   * @return 返回分页数据
   */
  @GetMapping("/{{=it.modelVar}}")
  public ResultData list({{=it.model}}Dto {{=it.modelVar}}Dto, Pageable pageable) {
    log.info("{{=it.comment}}列表查询");
    Page<{{=it.model}}> {{=it.modelVar}}Page = {{=it.modelVar}}Service.list({{=it.modelVar}}Dto, pageable);
    return  ResultData.SUCCESS("{{=it.comment}}列表查询").addData("page",{{=it.modelVar}}Page);
  }
  
  
  
  /**
   * {{=it.comment}}数据保存接口.
   * 
   * @param {{=it.modelVar}}Dto 要保存的数据
   * @return {{=it.modelVar}} 保存后的数据
   */
  @PostMapping("/{{=it.modelVar}}")
  @PutMapping("/{{=it.modelVar}}")
  @ResponseBody
  public ResultData save(@RequestBody {{=it.model}}Dto {{=it.modelVar}}Dto) {
    log.info("{{=it.comment}}保存");
    {{=it.model}} {{=it.modelVar}} = {{=it.modelVar}}Dto.toEntity();
    {{=it.modelVar}}Service.save({{=it.modelVar}});
    return ResultData.SUCCESS("{{=it.comment}}保存成功");
  }
  
  
  
  /**
   * 获取{{=it.comment}}详情接口.
   * 
   * @param id 参数
   * @return 详情数据
   */ 
  @GetMapping("/{{=it.modelVar}}/{id}")
  @ResponseBody
  public {{=it.model}} detail(@PathVariable {{=it.pkType}} id) {
    log.info("{{=it.comment}}详细信息");
    return {{=it.modelVar}}Service.find(id);
  }
  
  /**
   * 删除{{=it.comment}}数据接口.
   * 
   * @param id 主键参数
   * @return 操作结果
   */
  @DeleteMapping("/{{=it.modelVar}}/{id}")
  public ResultData delete(@PathVariable {{=it.pkType}} id) {
    log.info("{{=it.comment}}删除");
    {{=it.modelVar}}Service.deleteById(id);
    return ResultData.SUCCESS("删除成功"); 
  }

  /**
   * 更改{{=it.comment}}状态.
   * 
   * @param id 主键参数
   * @return 操作结果
   */
  @PostMapping("/{{=it.modelVar}}/toggle/{id}")
  public ResultData toggle(@PathVariable {{=it.pkType}} id) {
    log.info("{{=it.comment}}变更状态");
    {{=it.model}} {{=it.modelVar}} = {{=it.modelVar}}Service.find(id);
    // if ("enable".equals({{=it.modelVar}}.getStatus())) {
    //   {{=it.modelVar}}.setStatus("disable");
    // } else {
    //   {{=it.modelVar}}.setStatus("enable");
    // }
    {{=it.modelVar}}Service.save({{=it.modelVar}});
    return ResultData.SUCCESS("状态变更成功"); 
  }

}
`

export default controllerTemplate
