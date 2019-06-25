import React, { Component } from 'react'
import { Tabs } from 'antd'
import CodePreview from './CommonCodePreview'
import JavaCodeGenerator from './JavaCodeGenerator'
import eventbus from '../../eventbus/EventBus'
import EventType from '../../eventbus/EventTyp'
import AppData from '../../constants/AppData'

const { TabPane } = Tabs

export default class JavaCodeTab extends Component {
  state = {
    currentKey: 'variable'
  }

  componentDidMount () {
    eventbus.on(EventType.TABLE_DATA_CHANGE, this.refreshCode.bind(this))
    eventbus.on(EventType.PROJECT_CONFIG_CHANGE, this.refreshCode.bind(this))
    this.showCode('model')
  }

  showCode (key) {
    if (key == 'model') {
      let code = JavaCodeGenerator.generatorModelCode()
      this.setState({
        modelCode: code,
        currentKey: key,
        modelFilename: AppData.getJavaName() + '.java'
      })
    }

    if (key == 'dto') {
      let code = JavaCodeGenerator.generatorDtoCode()
      this.setState({
        dtoCode: code,
        currentKey: key,
        dtoFilename: AppData.getJavaName() + 'Dto.java'
      })
    }
    if (key == 'copy') {
      let code = JavaCodeGenerator.generatorCopyCode()
      this.setState({
        copyDtoCode: code,
        currentKey: key,
        copyFilename: AppData.getJavaName() + 'Snipt.java'
      })
    }
    if (key == 'repository') {
      let repositoryCode = JavaCodeGenerator.generatorRepositoryCode()
      this.setState({
        repositoryCode,
        currentKey: key,
        repositoryFilename: AppData.getJavaName() + 'Repository.java'
      })
    }

    if (key == 'dao') {
      let daoCode = JavaCodeGenerator.generatorDaoCode()
      this.setState({
        daoCode,
        currentKey: key,
        daoFilename: AppData.getJavaName() + 'Dao.java'
      })
    }

    if (key == 'daoImpl') {
      let daoImplCode = JavaCodeGenerator.generatorDaoImplCode()
      this.setState({
        daoImplCode,
        currentKey: key,
        daoImplFilename: AppData.getJavaName() + 'DaoImpl.java'
      })
    }
    if (key == 'service') {
      let serviceCode = JavaCodeGenerator.generatorServiceCode()
      this.setState({
        serviceCode,
        currentKey: key,
        serviceFilename: AppData.getJavaName() + 'Service.java'
      })
    }

    if (key == 'serviceImpl') {
      let serviceImplCode = JavaCodeGenerator.generatorServiceImplCode()
      this.setState({
        serviceImplCode,
        currentKey: key,
        serviceImplFilename: AppData.getJavaName() + 'ServiceImpl.java'
      })
    }

    if (key == 'controller') {
      let controllerCode = JavaCodeGenerator.generatorControllerCode()
      this.setState({
        controllerCode,
        currentKey: key,
        controllerFilename: AppData.getJavaName() + 'Controller.java'
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
            moudle='dao.impl'
            filename={this.state.daoImplFilename}
          />
        </TabPane>
        <TabPane tab='repository' key='repository'>
          <CodePreview
            code={this.state.repositoryCode}
            moudle='repository'
            filename={this.state.repositoryFilename}
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
