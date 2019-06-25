import React, { Component } from 'react'
import { Tree, Button } from 'antd'
import eventbus from '../../eventbus/EventBus'
import EventType from '../../eventbus/EventTyp'
import MySqlDriver from '../../service/mysqlDriver'
import AppData from '../../constants/AppData'
import DataLoad from './DataLoad'

const { TreeNode } = Tree
const DirectoryTree = Tree.DirectoryTree

export default class DbTree extends Component {
  state = {
    database: []
  }

  componentDidMount () {
    eventbus.on(EventType.DATABASE_CONFIG_CHANGE, () => DataLoad.loadDatabase())
    eventbus.on(EventType.DATABASE_LIST_CHANGE, this.reRenderTree.bind(this))
    eventbus.on(EventType.TABLE_LIST_CHANGE, this.showTable.bind(this))
    this.reRenderTree()
  }

  showDatabaseSetting () {
    eventbus.fire(EventType.DATABASE_SETTING_SHOW, true)
  }

  reRenderTree () {
    let database = AppData.getDatabaseList()
    this.setState({
      database: database
    })
  }

  treeAction (keys) {
    let key = keys[0]
    let data = key.split('->')
    const length = data.length
    let database = data[1]
    let table = data[3]

    if (length === 2) {
      AppData.setDatabase(database)
      DataLoad.loadTable(database)
    } else {
      AppData.setTableName(table)
      DataLoad.loadColumn(database, table)
      DataLoad.loadTableComment(database, table)
      DataLoad.loadMockData(table)
    }
  }

  /**
   * 将表展示在对应的数据库中
   * @param {获得的数据库表} tables
   */
  showTable () {
    let tables = AppData.getTableList()
    if (tables.length > 0) {
      let table = tables[0]
      let database = this.state.database
      for (let item of database) {
        if (item['SCHEMA_NAME'] === table['TABLE_SCHEMA']) {
          item['RowData'] = tables
          break
        }
      }
      this.setState({
        database: database
      })
    }
  }

  render () {
    // 如果数据没有初始化，则显示加载数据按钮
    if (!Array.isArray(this.state.database)) {
      return (
        <div
          style={{
            display: 'flex',
            height: 400,
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <Button onClick={this.showDatabaseSetting.bind(this)}>
            设置数据库连接
          </Button>
        </div>
      )
    }
    //
    let treeNode = []
    for (let item of this.state.database) {
      if (item['RowData']) {
        let rowData = []
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
          )
        }
        treeNode.push(
          <TreeNode
            key={'database->' + item['SCHEMA_NAME']}
            title={item['SCHEMA_NAME']}
          >
            {rowData}
          </TreeNode>
        )
      } else {
        treeNode.push(
          <TreeNode
            key={'database->' + item['SCHEMA_NAME']}
            title={item['SCHEMA_NAME']}
          />
        )
      }
    }
    return (
      <DirectoryTree
        onSelect={this.treeAction.bind(this)}
        defaultExpandAll={false}
      >
        {treeNode}
      </DirectoryTree>
    )
  }
}
