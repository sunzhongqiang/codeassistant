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

  
}
`

export default daoTemplate
