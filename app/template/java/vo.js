const voTemplateContent  = `package {{=it.groupId}}.{{=it.artifactId}}.vo;


/**
 * {{=it.comment}} 传值对象 : {{=it.model}} 
 *
 * <p>{{=it.date}}.
 * 
 * @author :{{=it.author}}
 * @version {{=it.version}}
 */
public class {{=it.model}}Vo {
}
`

export default voTemplateContent
