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
        variableFilename: AppData.getJavaName() + '.txt'
      })
    }

    if (key == 'model') {
      let code = CodeGengerator.generatorModelCode()
      this.setState({
        modelCode: code,
        currentKey: key,
        modelFilename: AppData.getJavaName() + '.java'
      })
    }

    if (key == 'dto') {
      let code = CodeGengerator.generatorDtoCode()
      this.setState({
        dtoCode: code,
        currentKey: key,
        dtoFilename: AppData.getJavaName() + 'Dto.java'
      })
    }
    if (key == 'copy') {
      let code = CodeGengerator.generatorCopyCode()
      this.setState({
        copyDtoCode: code,
        currentKey: key,
        copyFilename: AppData.getJavaName() + 'Snipt.java'
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
        <TabPane tab='model code' key='model'>
          <CodePreview
            code={this.state.modelCode}
            moudle='model'
            filename={this.state.modelFilename}
          />
        </TabPane>
        <TabPane tab='dto code' key='dto'>
          <CodePreview
            code={this.state.dtoCode}
            moudle='dto'
            filename={this.state.dtoFilename}
          />
        </TabPane>
        <TabPane tab='copydto2model' key='copy'>
          <CodePreview
            code={this.state.copyDtoCode}
            moudle='snipt'
            filename={this.state.copyFilename}
          />
        </TabPane>
      </Tabs>
    )
  }
}
