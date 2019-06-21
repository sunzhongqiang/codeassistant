const repositoryTemplate = `package {{=it.groupId}}.{{=it.artifactId}}.repository;
import {{=it.groupId}}.{{=it.artifactId}}.model.{{=it.model}};

/**
 * {{=it.model}}Repository: {{=it.comment}} 数据资源层 
 * 
 * {{=it.date}}.
 * 
 * @author {{=it.author}}
 * @version {{=it.version}}
 */

public interface {{=it.model}}Repository extends JpaRepository<{{=it.model}}, Long> , {{=it.model}}Dao {

  
}
`

export default repositoryTemplate
