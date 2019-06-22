const controllerTemplate = `package {{=it.groupId}}.{{=it.artifactId}}.web.controller;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.servlet.ModelAndView;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import com.linshang.balance.common.ResultData;
import {{=it.groupId}}.{{=it.artifactId}}.service.{{=it.model}}Service;
import {{=it.groupId}}.{{=it.artifactId}}.model.{{=it.model}};
import {{=it.groupId}}.{{=it.artifactId}}.condition.{{=it.model}}Condition;


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
  @RequestMapping("/{{=it.artifactId}}/{{=it.modelVar}}/list")
  public ResultData list(){
      log.info("{{=it.comment}}列表查询");
      ResultData result = new ResultData(true,"{{=it.comment}}列表查询");
      result.addData("result", {{=it.modelVar}}Service.findAll());
      return  result;
  }
  
  
  /**
   * 加载表格数据 用户
   * 
   * @param {{=it.modelVar}}Condition
   *            用户查询参数
   * @param pageable
   *            分页参数
   * @return 查询所得数据
   */
  @RequestMapping("/{{=it.artifactId}}/{{=it.modelVar}}/gridData")
  @ResponseBody
  public  Page<{{=it.model}}> loadList({{=it.model}}Condition {{=it.modelVar}}Condition, Pageable pageable){
      log.info("获取{{=it.comment}}列表数据");
      Page<{{=it.model}}> {{=it.modelVar}}Page = {{=it.modelVar}}Service.list({{=it.modelVar}}Condition,pageable);
      return {{=it.modelVar}}Page;
  }
  
  
  
  /**
   * {{=it.comment}}数据保存方法
   * @param {{=it.modelVar}} 要保存的数据
   * @return {{=it.modelVar}} 保存后的数据
   */
  @RequestMapping("/{{=it.artifactId}}/{{=it.modelVar}}/save")
  @ResponseBody
  public ResultData save({{=it.model}} {{=it.modelVar}}){
      log.info("{{=it.comment}}保存");
      try {
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
  @RequestMapping("/{{=it.artifactId}}/{{=it.modelVar}}/details")
  @ResponseBody
  public {{=it.model}} details({{=it.model}} {{=it.modelVar}}){
      log.info("{{=it.comment}}详细信息");
      {{=it.modelVar}} = {{=it.modelVar}}Service.find({{=it.modelVar}}.get{{=it.pkField['firstLetterUpperName']}}());
      return {{=it.modelVar}};
  }
  
  /**
   * 删除数据操作组方法
   * @param {{=it.modelVar}}
   * @return
   */
  @RequestMapping("/{{=it.artifactId}}/{{=it.modelVar}}/delete")
  public ResultData delete({{=it.model}} {{=it.modelVar}}){
      log.info("{{=it.comment}}删除");
      try {
          {{=it.modelVar}}Service.delete({{=it.modelVar}});
      } catch (Exception e) {
          log.error(e.getMessage(), e);
          return new ResultData(false, "删除失败");
      }
      return new ResultData(true,"删除成功"); 
  }
  
  /**
   * 批量删除数据操作组方法
   * @param  {{=it.modelVar}}List
   * @return ture or false 如果成功返回true ,出现错误返回false
   */
  @RequestMapping("/{{=it.artifactId}}/{{=it.modelVar}}/deleteAll")
  public boolean delete(List<{{=it.model}}> {{=it.modelVar}}List){
      log.info("{{=it.comment}}批量删除");
      try {
          {{=it.modelVar}}Service.delete({{=it.modelVar}}List);
      } catch (Exception e) {
          log.error(e.getMessage(), e);
          return false;
      }
      return true; 
  }

}
`

export default controllerTemplate
