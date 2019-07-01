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

  sql = ''

  componentDidMount () {
    eventbus.on(EventType.DATABASE_DATA_LOAD, this.showDatabaseData.bind(this))
  }

  showDatabaseData (data) {
    this.setState({
      data: data
    })
  }

  copyCode () {
    let result = copy(this.state.code)
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
      DataLoad.loadDataBySql(this.sql)
      this.setState({
        layer: e.target.value
      })
    }

    if (value == 'formate') {
      let prettySql = sqlFormatter.format(this.state.sql)
      console.log(prettySql)
      this.setState({
        layer: e.target.value,
        sql: prettySql
      })
    }
  }

  saveFile () {
    let self = this
    if (FileSystemUtils.existFile(this.state.filename)) {
      confirm({
        title: '文件已经存在',
        content: '否发要覆盖已经存在的文件',
        onOk () {
          self.directSave()
        },
        onCancel () {
          message.info('取消了代码生成，没有进行任何的操作！')
        }
      })
    } else {
      this.directSave()
    }
  }

  directSave () {
    FileSystemUtils.mkdir(this.state.packagename)
    let result = FileSystemUtils.saveCode(this.state.filename, this.state.code)
    if (!result) {
      message.success('代码保存成功')
    }
  }

  renderLayer () {
    let layerList = this.state.layerList

    let result = []
    for (let item of layerList) {
      result.push(
        <Radio.Button key={item} value={item}>
          {item}
        </Radio.Button>
      )
    }
    return result
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

        <Tabs type='card' style={{ height: '100%', marginTop: 8 }}>
          <TabPane tab='结果集' key='6'>
            <ContentPreview code={this.state.data} />
          </TabPane>
          <TabPane tab='Java代码' key='sql'>
            <ContentPreview code={this.state.code} />
          </TabPane>
        </Tabs>
      </div>
    )
  }
}
