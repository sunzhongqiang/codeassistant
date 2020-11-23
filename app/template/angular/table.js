const template = `
<div class="{{=it.modelVar}}-container">
  <div class="{{=it.modelVar}}-top-action-list">
    <button mat-raised-button color="primary" (click)="add()">新增</button>
  </div>
  <table mat-table [dataSource]="dataSource" class="mat-elevation-z8">
  {{~it.fields: field:index}}
  <!--{{=field['comment']}} -->
  <ng-container matColumnDef="{{=field['name']}}">
    <th mat-header-cell *matHeaderCellDef>{{=field['comment']}}</th>
    <td mat-cell *matCellDef="let element">{~{ element.{{=field['name']}} }~}</td>
  </ng-container>
  {{~}}

    <tr mat-header-row *matHeaderRowDef="[{{~it.fields: field:index}}{{?index!=0}},{{?}}'{{=field['name']}}'{{~}}]"></tr>
    <tr mat-row *matRowDef="let row; columns: [{{~it.fields: field:index}}{{?index!=0}},{{?}}'{{=field['name']}}'{{~}}]"></tr>
  </table>
  <mat-paginator
    [pageSizeOptions]="[5, 10, 20]"
    showFirstLastButtons
    [length]="100"
    (page)="pageEvent($event)"
  ></mat-paginator>
</div>
`

export default template