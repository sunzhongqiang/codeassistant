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
    if (key == 'repository') {
      let repositoryCode = CodeGengerator.generatorRepositoryCode()
      this.setState({
        repositoryCode,
        currentKey: key,
        repositoryFilename: AppData.getJavaName() + 'Repository.java'
      })
    }

    if (key == 'dao') {
      let daoCode = CodeGengerator.generatorDaoCode()
      this.setState({
        daoCode,
        currentKey: key,
        daoFilename: AppData.getJavaName() + 'Dao.java'
      })
    }

    if (key == 'daoImpl') {
      let daoImplCode = CodeGengerator.generatorDaoImplCode()
      this.setState({
        daoImplCode,
        currentKey: key,
        daoImplFilename: AppData.getJavaName() + 'DaoImpl.java'
      })
    }
    if (key == 'service') {
      let serviceCode = CodeGengerator.generatorServiceCode()
      this.setState({
        serviceCode,
        currentKey: key,
        daoFilename: AppData.getJavaName() + 'Service.java'
      })
    }

    if (key == 'serviceImpl') {
      let serviceImplCode = CodeGengerator.generatorServiceImplCode()
      this.setState({
        serviceImplCode,
        currentKey: key,
        daoFilename: AppData.getJavaName() + 'ServiceImpl.java'
      })
    }

    if (key == 'controller') {
      let controllerCode = CodeGengerator.generatorControllerCode()
      this.setState({
        controllerCode,
        currentKey: key,
        daoFilename: AppData.getJavaName() + 'Controller.java'
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
        <TabPane tab='repository' key='repository'>
          <CodePreview
            code={this.state.repositoryCode}
            moudle='repository'
            filename={this.state.repositoryFilename}
          />
        </TabPane>
        <TabPane tab='dao' key='dao'>
          <CodePreview
            code={this.state.daoCode}
            moudle='dao'
            filename={this.state.daoFilename}
          />
        </TabPane>
        <TabPane tab='daoImpl' key='daoImpl'>
          <CodePreview
            code={this.state.daoImplCode}
            moudle='daoImpl'
            filename={this.state.daoImplFilename}
          />
        </TabPane>
        <TabPane tab='service' key='service'>
          <CodePreview
            code={this.state.serviceCode}
            moudle='service'
            filename={this.state.serviceFilename}
          />
        </TabPane>
        <TabPane tab='serviceImpl' key='serviceImpl'>
          <CodePreview
            code={this.state.serviceImplCode}
            moudle='serviceImpl'
            filename={this.state.serviceImplFilename}
          />
        </TabPane>
        <TabPane tab='controller' key='controller'>
          <CodePreview
            code={this.state.controllerCode}
            moudle='controller'
            filename={this.state.controllerFilename}
          />
        </TabPane>
      </Tabs>
    )
  }
}
