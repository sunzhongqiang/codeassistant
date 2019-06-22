import React, { Component } from 'react'
import { Tree } from 'antd'
import eventbus from '../../eventbus/EventBus'
import EventType from '../../eventbus/EventTyp'
import MySqlDriver from '../../service/mysqlDriver'
import CodeUtils from '../../utils/CodeUtils'
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
    DataLoad.loadDatabase()
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

    const mysqldb = new MySqlDriver()
    if (length === 2) {
      AppData.setDatabase(database)
      DataLoad.loadTable(database)
    } else {
      AppData.setTableName(table)
      DataLoad.loadColumn(database, table)
      DataLoad.loadTableComment(database, table)
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
      <DirectoryTree onSelect={this.treeAction.bind(this)} defaultExpandAll>
        {treeNode}
      </DirectoryTree>
    )
  }
}
