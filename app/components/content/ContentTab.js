import React, { Component } from 'react'
import { Tabs } from 'antd'
import CodePreview from '../template/CodePreview'
import eventbus from '../../eventbus/EventBus'
import EventType from '../../eventbus/EventTyp'
import CodeGengerator from '../template/CodeGenerator'
import TableColumn from './TableColumn'
const { TabPane } = Tabs

export default class ContentTab extends Component {
  state = {
    modelCode: '',
    keyValue: ''
  }

  componentDidMount () {
    eventbus.on(EventType.TABLE_DATA_LOAD, this.updateCode.bind(this))
    eventbus.on(EventType.CODE_DATA_CHANGE, this.showCodeChange.bind(this))
    eventbus.on(
      EventType.VARIABLE_CODE_CHANGE,
      this.showVariableChange.bind(this)
    )
  }

  updateCode (data) {
    CodeGengerator.generatorModelCode(data)
  }

  showCodeChange (data) {
    this.setState({ modelCode: data })
  }

  showVariableChange (data) {
    this.setState({ keyValue: data })
  }

  render () {
    return (
      <Tabs onChange={this.callback} type='card'>
        <TabPane tab='基本信息' key='1'>
          <TableColumn />
        </TabPane>
        <TabPane tab='当前变量' key='2'>
          <CodePreview code={this.state.keyValue} />
        </TabPane>
        <TabPane tab='Model代码' key='3'>
          <CodePreview code={this.state.modelCode} />
        </TabPane>
      </Tabs>
    )
  }
}
