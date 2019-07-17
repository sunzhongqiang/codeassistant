import React, { Component } from 'react'
import { Input, Button, Radio, message, Modal, Tabs } from 'antd'
import copy from 'copy-to-clipboard'
import ContentPreview from './ContentPreview'
import CodeData from '../../constants/CodeData'
import JavaCodeGengerator from './JavaCodeGenerator'
import PathUtils from '../../utils/PathUtils'
import AppData from '../../constants/AppData'
import FileSystemUtils from '../../utils/FileSystemUtils'
import DataLoad from '../database/DataLoad'
import eventbus from '../../eventbus/EventBus'
import EventType from '../../eventbus/EventTyp'
import sqlFormatter from 'sql-formatter'
const confirm = Modal.confirm
const { TextArea } = Input
const { TabPane } = Tabs

export default class MysqlModel extends Component {
  state = {
    layer: '',
    filename: '',
    data: 'no sql result',
    layerList: CodeData.getLayer('java')
  }

  componentDidMount () {
    eventbus.on(EventType.DATABASE_DATA_LOAD, this.showDatabaseData.bind(this))
    eventbus.on(EventType.TABLE_DATA_CHANGE, this.showSql.bind(this))
  }

  showDatabaseData (data) {
    this.setState({
      data: data
    })
  }

  showSql () {
    let sql = 'select '
    let columns = AppData.getColumnFields()
    for (let column of columns) {
      sql = sql.concat(`${column['COLUMN_NAME']},`)
    }
    sql = sql.substr(0, sql.length - 1)
    sql = sql.concat(' FROM ')
    sql = sql.concat(AppData.getTableName())
    sql = sql.concat(' limit 10 ')
    sql = sqlFormatter.format(sql)

    this.setState({
      sql
    })
  }

  copyCode () {
    let result = copy(this.state.code)
    if (result) {
      message.success('代码复制成功')
    }
  }

  copyJavaCode () {
    let result = copy(this.state.data)
    if (result) {
      message.success('代码复制成功')
    }
  }

  onTextareaChange (e) {
    let value = e.target.value
    console.log('sql', value)
    this.sql = value
    this.setState({
      sql: value
    })
  }

  action (e) {
    let value = e.target.value
    if (value == 'execute') {
      DataLoad.loadDataBySql(this.state.sql)
      this.setState({
        layer: e.target.value
      })
    }

    if (value == 'formate') {
      let prettySql = sqlFormatter.format(this.state.sql)
      this.setState({
        layer: e.target.value,
        sql: prettySql
      })
    }

    if (value == 'code') {
      let sql = this.state.sql

      let code = JavaCodeGengerator.generatorSqlPartCode(sql)

      this.setState({
        layer: e.target.value,
        data: code
      })
    }
  }

  render () {
    return (
      <div>
        <div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: 8,
              justifyContent: 'space-between',
              background: '#eaeaea'
            }}
          >
            <Radio.Group
              value={this.state.layer}
              onChange={this.action.bind(this)}
            >
              <Radio.Button value='execute'>执行语句</Radio.Button>
              <Radio.Button value='formate'>格式化语句</Radio.Button>
              <Radio.Button value='code'>java代码</Radio.Button>
            </Radio.Group>
            <Button icon='copy' onClick={this.copyCode.bind(this)} />
          </div>
        </div>
        <TextArea
          placeholder='write sql here'
          autosize={{ minRows: 6, maxRows: 50 }}
          onChange={this.onTextareaChange.bind(this)}
          value={this.state.sql}
        />
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            padding: 8,
            justifyContent: 'flex-end',
            background: '#eaeaea'
          }}
        >
          <Button icon='copy' onClick={this.copyJavaCode.bind(this)} />
        </div>
        <ContentPreview code={this.state.data} />
      </div>
    )
  }
}
