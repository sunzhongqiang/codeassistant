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

  treeAction(keys, event) {
    let key = keys[0];
    let data = key.split('->');
    const length = data.length;
    let type = data[0];
    let database = data[1];
    let table = data[3];

    const mysqldb = new MySqlDriver();
    if (length == 2) {
      mysqldb.query(
        'select TABLE_NAME,TABLE_SCHEMA ,true as isNode from information_schema.TABLES where TABLE_SCHEMA = ? ',
        [database],
        this.showTable.bind(this, database)
      );
    } else {
      mysqldb.query(
        'Select TABLE_NAME,COLUMN_NAME ,DATA_TYPE,COLUMN_KEY,EXTRA,COLUMN_COMMENT FROM INFORMATION_SCHEMA.COLUMNS  WHERE TABLE_SCHEMA= ? and TABLE_NAME = ? ',
        [database, table],
        this.showColumn.bind(this)
      );
    }
  }

  showColumn(data) {
    eventbus.fire(EventType.TABLE_DATA_LOAD, data);
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
      if (item['RowData']) {
        let rowData = [];
        for (let table of item['RowData']) {
          rowData.push(
            <TreeNode
              key={
                'database->' +
                item['SCHEMA_NAME'] +
                '->table->' +
                table['TABLE_NAME']
              }
              title={table['TABLE_NAME']}
              isLeaf
            />
          );
        }
        treeNode.push(
          <TreeNode
            key={'database->' + item['SCHEMA_NAME']}
            title={item['SCHEMA_NAME']}
          >
            {rowData}
          </TreeNode>
        );
      } else {
        treeNode.push(
          <TreeNode
            key={'database->' + item['SCHEMA_NAME']}
            title={item['SCHEMA_NAME']}
          />
        );
      }
    }
    return (
      <DirectoryTree onSelect={this.treeAction.bind(this)} defaultExpandAll>
        {treeNode}
      </DirectoryTree>
    );
  }
}
