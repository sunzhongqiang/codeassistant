const template = `
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-{{=it.modelVar}}',
  templateUrl: './{{=it.modelVar}}.component.html',
  styleUrls: ['./{{=it.modelVar}}.component.css']
})
export class {{=it.model}}Component implements OnInit {
  dataSource: any = [];
  constructor() { }

  ngOnInit(): void {
  }

  add(){

  }

  pageEvent(event: any){

  }

}
`

export default template