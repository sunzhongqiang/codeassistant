const repositoryTemplate = `package {{=it.groupId}}.{{=it.artifactId}}.repository;

import {{=it.groupId}}.{{=it.artifactId}}.dao.{{=it.model}}Dao;
import {{=it.groupId}}.{{=it.artifactId}}.model.{{=it.model}};
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * {{=it.model}}Repository: {{=it.comment}} 数据资源层.
 * 
 * <p>{{=it.date}}.
 * 
 * @author {{=it.author}}
 * @version {{=it.version}}
 */

public interface {{=it.model}}Repository extends JpaRepository<{{=it.model}}, {{=it.pkType}}>, {{=it.model}}Dao {

  
}
`

export default repositoryTemplate
