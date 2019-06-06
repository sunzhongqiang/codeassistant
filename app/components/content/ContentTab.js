import React, { Component } from 'react';
import { Tabs } from 'antd';
import TabelColumn from './TableColumn';
const { TabPane } = Tabs;

export default class ContentTab extends Component {
  callback(key) {}

  render() {
    return (
      <Tabs onChange={this.callback} type="card">
        <TabPane tab="基本信息" key="1">
          <TabelColumn />
        </TabPane>
        <TabPane tab="模版" key="2">
          Content of Tab Pane 2
        </TabPane>
        <TabPane tab="代码输出" key="3">
          Content of Tab Pane 3
        </TabPane>
      </Tabs>
    );
  }
}
