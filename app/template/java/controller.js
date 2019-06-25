const controllerTemplate = `package {{=it.groupId}}.{{=it.artifactId}}.web.controller;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import com.mmk.common.web.ResultData;
import {{=it.groupId}}.{{=it.artifactId}}.service.{{=it.model}}Service;
import {{=it.groupId}}.{{=it.artifactId}}.model.{{=it.model}};
import {{=it.groupId}}.{{=it.artifactId}}.condition.{{=it.model}}Dto;


/**
 * {{=it.model}}Controller: {{=it.comment}} web控制层
 * 
 * {{=it.date}}.
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
   * 跳转至列表页面
   * @return 返回页面以及页面模型
   */
  @GetMapping("/{{=it.modelVar}}")
  public ResultData list(){
    log.info("{{=it.comment}}列表查询");
    ResultData result = new ResultData(true,"{{=it.comment}}列表查询");
    result.addData("result", {{=it.modelVar}}Service.findAll());
    return  result;
  }
  
  
  
  /**
   * {{=it.comment}}数据保存方法
   * @param {{=it.modelVar}} 要保存的数据
   * @return {{=it.modelVar}} 保存后的数据
   */
  @PostMapping("/{{=it.modelVar}}")
  @PutMapping("/{{=it.modelVar}}")
  @ResponseBody
  public ResultData save(@RequestBody {{=it.model}}Dto {{=it.modelVar}}Dto){
      log.info("{{=it.comment}}保存");
      try {
        {{=it.model}} {{=it.modelVar}} = null
        //从数据库中进行加载，以进行修改
        if({{=it.modelVar}}Dto.get{{=it.pkField['firstLetterUpperName']}}()!=null){
          {{=it.modelVar}} = {{=it.modelVar}}Service.find({{=it.modelVar}}.get{{=it.pkField['firstLetterUpperName']}}());
        }
        //如果数据库不存在，新建并新增
        if({{=it.modelVar}} == null){
          {{=it.modelVar}} = new {{=it.model}}();
        }
        
        {{~it.fields: field:index}}
        {{=it.modelVar}}.set{{=field['firstLetterUpperName']}}({{=it.modelVar}}Dto.get{{=field['firstLetterUpperName']}}());{{~}}
        {{=it.modelVar}}Service.save({{=it.modelVar}});
      } catch (Exception e) {
        log.error(e.getMessage(),e);
        return new ResultData(false,"{{=it.comment}}保存失败");
      }
      return new ResultData(true,"{{=it.comment}}保存成功");
  }
  
  
  
  /**
   * 跳转至详细信息页面
   * @param {{=it.modelVar}} 参数
   * @return 详情数据
   */ 
  @GetMapping("/{{=it.modelVar}}/{id}")
  @ResponseBody
  public {{=it.model}} detail(@PahtVariable {{=it.pkField['type']}} id){
      log.info("{{=it.comment}}详细信息");
      {{=it.model}} {{=it.modelVar}} = {{=it.modelVar}}Service.find({{=it.modelVar}}.get{{=it.pkField['firstLetterUpperName']}}());
      return {{=it.modelVar}};
  }
  
  /**
   * 删除数据操作组方法
   * @param {{=it.modelVar}}
   * @return
   */
  @DeleteMapping("/{{=it.modelVar}}/{id}")
  public ResultData delete(@PahtVariable {{=it.pkField['type']}} id){
      log.info("{{=it.comment}}删除");
      try {
        {{=it.modelVar}}Service.delete(id);
      } catch (Exception e) {
        log.error(e.getMessage(), e);
        return new ResultData(false, "删除失败");
      }
      return new ResultData(true,"删除成功"); 
  }

}
`

export default controllerTemplate
