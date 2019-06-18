import React, { Component } from 'react'
import { Tabs } from 'antd'
import eventbus from '../../eventbus/EventBus'
import EventType from '../../eventbus/EventTyp'
import CodeGengerator from '../code/CodeGenerator'
import TableColumn from './TableColumn'
import Usage from './Usage'
import CodeTab from '../code/CodeTab'
const { TabPane } = Tabs

export default class ContentTab extends Component {
  state = {
    modelCode: '',
    keyValue: ''
  }

  componentDidMount () {
    eventbus.on(EventType.TABLE_DATA_CHANGE, this.updateCode.bind(this))
    eventbus.on(EventType.CODE_DATA_CHANGE, this.showCodeChange.bind(this))
    eventbus.on(EventType.VARIABLE_CHANGE, this.updateVariable.bind(this))
    eventbus.on(
      EventType.VARIABLE_CODE_CHANGE,
      this.showVariableChange.bind(this)
    )
  }

  updateVariable () {
    CodeGengerator.generatorTemplateVariable()
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
      <Tabs onChange={this.callback} type='card' style={{ height: '100%' }}>
        <TabPane tab='使用说明' key='usage'>
          <Usage />
        </TabPane>
        <TabPane tab='字段信息' key='1'>
          <TableColumn />
        </TabPane>

        <TabPane tab='代码' key='3'>
          <CodeTab />
        </TabPane>
      </Tabs>
    )
  }
}
