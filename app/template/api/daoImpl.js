const daoImplTemplate = `package {{=it.groupId}}.{{=it.artifactId}}.dao.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.apache.commons.lang3.StringUtils;
import javax.annotation.Resource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;
import com.mmk.gene.dao.impl.SpringDataQueryDaoImpl;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import {{=it.groupId}}.{{=it.artifactId}}.model.{{=it.model}};
import {{=it.groupId}}.{{=it.artifactId}}.dao.{{=it.model}}Dao;

import {{=it.groupId}}.{{=it.artifactId}}.dto.{{=it.model}}Dto;



/**
 * {{=it.model}}DaoImpl: {{=it.comment}} 数据资源层 
 * 
 * {{=it.date}}.
 * 
 * @author {{=it.author}}
 * @version {{=it.version}}
 */
@Repository
public interface {{=it.model}}DaoImpl  extends SpringDataQueryDaoImpl<{{=it.model}}> implements {{=it.model}}Dao {

  public {{=it.model}}DaoImpl(){
    super({{=it.model}}.class);
  }

  /**
   * 分页查询相关信息，根据传入的bean类对象和分页对象page取得查询结果集List
   * @param {{=it.modelVar}}Dto 查询类
   * @param pageable 传入的分页对象
   * @return 符合条件的查询结果集
   * @author {{=it.author}}
   * 
   */
  @Override 
  public Page<{{=it.model}}> list({{=it.model}}Dto {{=it.modelVar}}Dto,Pageable pageable){
    StringBuilder sb=new StringBuilder("select model from {{=it.model}} model  where 1=1  ");
    Map<String,Object> params = new HashMap<>(16);
    {{~it.fields:field:index}}{{?field['type']=='String'}}
    if(StringUtils.isNotBlank({{=it.modelVar}}Dto.get{{=field['firstLetterUpperName']}}())){
      sb.append(" and model.{{=field['name']}} like :{{=field['name']}} ");
      params.put("{{=field['name']}}","%"+{{=it.modelVar}}Dto.get{{=field['firstLetterUpperName']}}()+"%");
    }{{??}}
    if({{=it.modelVar}}Dto.get{{=field['firstLetterUpperName']}}()!=null){
      sb.append(" and model.{{=field['name']}} = :{{=field['name']}} ");
      params.put("{{=field['name']}}",{{=it.modelVar}}Dto.get{{=field['firstLetterUpperName']}}());
    }{{?}}
    {{~}}
    return queryByJpql(sb.toString(), params, pageable);
  }


  @Override 
  public Page< Map<String,Object>> listBySql({{=it.model}}Dto Dto,Pageable pageable){
    StringBuilder sb=new StringBuilder("select {{~it.fields:field:index}}{{?index!=1}},{{?}}{{=field['column']}}{{~}} from {{=it.table}}  where 1=1  ");
    Map<Integer,Object> params = new HashMap<>(16);
    {{~it.fields:field:index}}{{?field['type']=='String'}}
    if(StringUtils.isNotBlank(Dto.get{{=field['firstLetterUpperName']}}())){
      sb.append(" and {{=field['column']}} like ?{{=index}} ");
      params.put({{=index}},"%"+Dto.get{{=field['firstLetterUpperName']}}()+"%");
    }
    {{??}}if({{=it.modelVar}}Dto.get{{=field['firstLetterUpperName']}}()!=null){
      sb.append(" and {{=field['column']}} like ?{{=index}} ");
      params.put({{=index}},Dto.get{{=field['firstLetterUpperName']}}());
    }
    {{?}}
    {{~}}
    return queryFieldsBySql(sb.toString(), params, pageable);
  }

@Override 
public {{=it.model}} findBy(String field,Object value){
    StringBuilder sb=new StringBuilder("select model from {{=it.model}} model  where model.");
    sb.append(field);
    sb.append(" = :value ");
    Map<String,Object> params = new HashMap<>(16);
    params.put("value",value);
    List<{{=it.model}}> result = queryByJpql(sb.toString(), params,0l,1l);
    return result.isEmpty() ? null : result.get(0);
}

@Override 
public List<{{=it.model}}> findAllBy(String field,Object value){
    StringBuilder sb=new StringBuilder("select model from {{=it.model}} model  where model.");
    sb.append(field);
    sb.append(" = :value ");
    Map<String,Object> params = new HashMap<>(16);
    params.put("value",value);
    return queryByJpql(sb.toString(), params);
}
  
}
`

export default daoImplTemplate
