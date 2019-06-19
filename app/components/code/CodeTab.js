import React, { Component } from 'react'
import { Tabs } from 'antd'
import CodePreview from './CodePreview'
import CodeGengerator from './CodeGenerator'
import eventbus from '../../eventbus/EventBus'
import EventType from '../../eventbus/EventTyp'
import AppData from '../../constants/AppData'

const { TabPane } = Tabs

export default class CodeTab extends Component {
  state = {
    currentKey: 'variable'
  }

  componentDidMount () {
    let code = CodeGengerator.generatorTemplateVariable()
    this.setState({
      variableCode: code,
      filename: AppData.getJavaName() + '.txt'
    })
    eventbus.on(EventType.TABLE_DATA_CHANGE, this.refreshCode.bind(this))
    eventbus.on(EventType.PROJECT_CONFIG_CHANGE, this.refreshCode.bind(this))
  }

  showCode (key) {
    if (key == 'variable') {
      let code = CodeGengerator.generatorTemplateVariable()
      this.setState({
        variableCode: code,
        currentKey: key,
        filename: AppData.getJavaName() + '.txt'
      })
    }

    if (key == 'model') {
      let code = CodeGengerator.generatorModelCode()
      this.setState({
        modelCode: code,
        currentKey: key,
        filename: AppData.getJavaName() + '.java'
      })
    }

    if (key == 'dto') {
      let code = CodeGengerator.generatorDtoCode()
      this.setState({
        modelCode: code,
        currentKey: key,
        filename: AppData.getJavaName() + 'Dto.java'
      })
    }
    if (key == 'copy') {
      let code = CodeGengerator.generatorCopyCode()
      this.setState({
        copyDtoCode: code,
        currentKey: key,
        filename: AppData.getJavaName() + 'Snipt.java'
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
            path='/variable/'
            filename={this.state.filename}
          />
        </TabPane>
        <TabPane tab='model code' key='model'>
          <CodePreview
            code={this.state.modelCode}
            path='/model/'
            filename={this.state.filename}
          />
        </TabPane>
        <TabPane tab='dto code' key='dto'>
          <CodePreview
            code={this.state.modelCode}
            path='/dto/'
            filename={this.state.filename}
          />
        </TabPane>
        <TabPane tab='copydto2model' key='copy'>
          <CodePreview
            code={this.state.copyDtoCode}
            path='/snipt/'
            filename={this.state.filename}
          />
        </TabPane>
      </Tabs>
    )
  }
}
