const template = `
import { Injectable } from '@angular/core';
import { BaseService } from '../base.service';

@Injectable({
  providedIn: 'root'
})
export class {{=it.model}}Service extends BaseService{
  
  /**
   * 保存{{=it.comment}}信息.
   * @param data 要保存的数据
   */
  public save(data: any){
    return this.http.post('/{{=it.modelVar}}', data).toPromise();
  }
  /**
   * 查询{{=it.comment}}列表.
   */
  public list(): any{
    return this.get('/{{=it.modelVar}}', null).toPromise();
  }

  /**
   * 删除{{=it.comment}}信息.
   * @param id 主键
   */
  public delete(id: any): any{
    return this.http.delete(\`/{{=it.modelVar}}/\${id}\`).toPromise();
  }

  /**
   * 加载{{=it.comment}}信息.
   * @param id 主键
   */
  public load(id: any): any{
    return this.http.get(\`/{{=it.modelVar}}/\${id}\`).toPromise();
  }
}
`

export default template