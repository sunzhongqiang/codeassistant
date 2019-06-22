import React, { Component } from 'react'
import { Tabs } from 'antd'
import ContentPreview from './ContentPreview'
import CodeGengerator from './CodeGenerator'
import eventbus from '../../eventbus/EventBus'
import EventType from '../../eventbus/EventTyp'

const { TabPane } = Tabs

export default class CommonCodeTab extends Component {
  state = {
    currentKey: 'variable'
  }

  componentDidMount () {
    eventbus.on(EventType.TABLE_DATA_CHANGE, this.refreshCode.bind(this))
    eventbus.on(EventType.PROJECT_CONFIG_CHANGE, this.refreshCode.bind(this))
    this.showCode('variable')
  }

  showCode (key) {
    if (key == 'variable') {
      let code = CodeGengerator.generatorTemplateVariable()
      this.setState({
        variableCode: code,
        currentKey: key
      })
    }
    if (key == 'json') {
      let jsonCode = CodeGengerator.generatorJson()
      this.setState({
        jsonCode,
        currentKey: key
      })
    }
    if (key == 'api') {
      let apiCode = CodeGengerator.generatorApi()
      this.setState({
        apiCode,
        currentKey: key
      })
    }
  }

  refreshCode () {
    this.showCode(this.state.currentKey)
  }

  render () {
    return (
      <Tabs
        onChange={this.callback}
        tabPosition='right'
        onChange={this.showCode.bind(this)}
      >
        <TabPane tab='工作变量' key='variable'>
          <ContentPreview code={this.state.variableCode} />
        </TabPane>
        <TabPane tab='json' key='json'>
          <ContentPreview code={this.state.jsonCode} />
        </TabPane>
        <TabPane tab='api' key='api'>
          <ContentPreview code={this.state.apiCode} />
        </TabPane>
      </Tabs>
    )
  }
}
