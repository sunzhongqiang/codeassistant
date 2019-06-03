import React, { Component } from 'react';
import { Tree, Modal, Input } from 'antd';
import eventbus from '../eventbus/EventBus';
import EventType from '../eventbus/EventTyp';
import MySqlDriver from '../service/mysqlDriver';

const { TreeNode } = Tree;
const DirectoryTree = Tree.DirectoryTree;

export default class DbTree extends Component {
  state = {
    database: []
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    eventbus.on(EventType.DATABASE_CONFIG_SAVE, this.reRenderTree.bind(this));
  }

  reRenderTree() {
    const mysqldb = new MySqlDriver();
    mysqldb.query(
      "select SCHEMA_NAME from information_schema.SCHEMATA where SCHEMA_NAME not  in('information_schema','mysql','performance_schema')",
      this.showDatabaseName.bind(this)
    );
  }

  showDatabaseName(data) {
    this.setState({
      database: data
    });
  }

  loadTable(keys, event) {
    console.log('keys', keys);
    let key = keys[0];
    console.log('key', key);

    const mysqldb = new MySqlDriver();
    mysqldb.query(
      'select TABLE_NAME,TABLE_SCHEMA ,true as isNode from information_schema.TABLES where TABLE_SCHEMA = ? ',
      [key],
      this.showTable.bind(this, key)
    );
  }

  showTable(key, data) {
    let database = this.state.database;
    for (let item of database) {
      if (item['SCHEMA_NAME'] == key) {
        item['RowData'] = data;
      }
    }
    this.setState({
      database: database
    });
  }

  render() {
    let treeNode = [];
    for (let item of this.state.database) {
      console.log('render item', item);
      if (item['RowData']) {
        let rowData = [];
        for (let table of item['RowData']) {
          rowData.push(
            <TreeNode
              key={'table-' + table['TABLE_NAME']}
              title={table['TABLE_NAME']}
              isLeaf
            />
          );
        }
        treeNode.push(
          <TreeNode key={item['SCHEMA_NAME']} title={item['SCHEMA_NAME']}>
            {rowData}
          </TreeNode>
        );
      } else {
        treeNode.push(
          <TreeNode key={item['SCHEMA_NAME']} title={item['SCHEMA_NAME']} />
        );
      }
    }
    return (
      <DirectoryTree onSelect={this.loadTable.bind(this)} defaultExpandAll>
        {treeNode}
      </DirectoryTree>
    );
  }
}
