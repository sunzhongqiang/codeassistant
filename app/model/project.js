import { observable } from 'mobx';

let project = observable({
  name: 'projectname',
  path: '',
  dbConfig: {}
});
