import React, { Component } from 'react'
import { Tabs } from 'antd'
import TableColumn from './TableColumn'
import Usage from './Usage'
import CommonCodeTab from '../code/CommonCode'
import { JavaModel } from '../code/JavaModel'
import MysqlModel from '../code/MysqlModel'
import JavaFieldModel from '../code/JaveFieldModel'
import VueFieldModel from '../code/VueFieldModel'
import { VueModel } from '../code/VueModel'
import { AngularModel } from '../code/AngularModel'
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
        <TabPane tab='数据字典' key='1'>
          <TableColumn />
        </TabPane>
        <TabPane tab='通用代码' key='2'>
          <CommonCodeTab />
        </TabPane>

        <TabPane tab='JAVA模式' key='java'>
          <JavaModel />
        </TabPane>
        <TabPane tab='VUE模式' key='vue'>
          <VueModel />
        </TabPane>
        <TabPane tab='angular' key='angular'>
          <AngularModel />
        </TabPane>
        <TabPane tab='JAVA字段模式' key='javafield'>
          <JavaFieldModel/>
        </TabPane>
        <TabPane tab='VUE字段模式' key='vuefield'>
          <VueFieldModel/>
        </TabPane>
        <TabPane tab='SQL模式' key='sql'>
          <MysqlModel />
        </TabPane>
      </Tabs>
    )
  }
}
