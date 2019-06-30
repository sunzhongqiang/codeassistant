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
import { FreeModel } from '../code/FreeModel'
import MysqlModel from '../code/MysqlModel'
const { TabPane } = Tabs

export default class ContentTab extends Component {
  state = {
    modelCode: '',
    keyValue: ''
  }

  showCodeChange (data) {
    this.setState({ modelCode: data })
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
        <TabPane tab='自由模式' key='6'>
          <FreeModel />
        </TabPane>
        <TabPane tab='SQL模式' key='sql'>
          <MysqlModel />
        </TabPane>
      </Tabs>
    )
  }
}
