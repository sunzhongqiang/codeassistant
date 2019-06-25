import React, { Component } from 'react'
import { Tabs } from 'antd'
import eventbus from '../../eventbus/EventBus'
import EventType from '../../eventbus/EventTyp'
import CodeGengerator from '../code/CodeGenerator'
import TableColumn from './TableColumn'
import Usage from './Usage'
import JavaCodeTab from '../code/JavaCodeTab'
import AntdCodeTab from '../code/AntDCode'
import CommonCodeTab from '../code/CommonCode'
const { TabPane } = Tabs

export default class ContentTab extends Component {
  state = {
    modelCode: '',
    keyValue: ''
  }

  componentDidMount () {
    eventbus.on(EventType.VARIABLE_CHANGE, this.updateVariable.bind(this))
    eventbus.on(
      EventType.VARIABLE_CODE_CHANGE,
      this.showVariableChange.bind(this)
    )
  }

  updateVariable () {
    CodeGengerator.generatorTemplateVariable()
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
        <TabPane tab='通用代码' key='2'>
          <CommonCodeTab />
        </TabPane>
        <TabPane tab='Java代码' key='3'>
          <JavaCodeTab />
        </TabPane>
        <TabPane tab='PC前端代码' key='4'>
          <AntdCodeTab />
        </TabPane>
        <TabPane tab='App端Flutter代码' key='5'>
          <AntdCodeTab />
        </TabPane>
      </Tabs>
    )
  }
}
