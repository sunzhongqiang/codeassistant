import React, { Component } from 'react'
import { Tabs } from 'antd'
import CodePreview from './CodePreview'
import CodeGengerator from './CodeGenerator'
import eventbus from '../../eventbus/EventBus'
import EventType from '../../eventbus/EventTyp'
import AppData from '../../constants/AppData'

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
        currentKey: key,
        variableFilename: AppData.getJavaName() + '.txt'
      })
    }
    if (key == 'json') {
      let jsonCode = CodeGengerator.generatorJson()
      this.setState({
        jsonCode,
        currentKey: key,
        variableFilename: AppData.getJavaName() + '.json'
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
        <TabPane tab='当前变量' key='variable'>
          <CodePreview
            code={this.state.variableCode}
            moudle='variable'
            filename={this.state.variableFilename}
          />
        </TabPane>
        <TabPane tab='json' key='json'>
          <CodePreview
            code={this.state.jsonCode}
            moudle='json'
            filename={this.state.jsonFile}
          />
        </TabPane>
        <TabPane tab='api' key='api'>
          <CodePreview
            code={this.state.variableCode}
            moudle='variable'
            filename={this.state.variableFilename}
          />
        </TabPane>
      </Tabs>
    )
  }
}
