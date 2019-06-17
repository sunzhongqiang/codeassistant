import React, { Component } from 'react'
import { Modal, Input, Button } from 'antd'
import eventbus from '../../eventbus/EventBus'
import EventType from '../../eventbus/EventTyp'
import AppData from '../../constants/AppData'
const dialog = require('electron').remote.dialog

export default class ProjectSettingDailog extends Component {
  state = { visible: false }

  constructor () {
    super()
    localStorage.setItem('groupId', 'com.linshang')
    localStorage.setItem('artifactId', 'app')
    localStorage.setItem('version', '1.0.0')
    localStorage.setItem('author', 'code assistant')
  }

  componentDidMount () {
    eventbus.on(EventType.PROJECT_SETTING_SHOW, this.showDailog.bind(this))
    this.setState({
      projectPath: localStorage.getItem('projectPath')
    })
  }

  showDailog (visible) {
    this.setState({
      visible: visible
    })
  }

  closeDailog () {
    eventbus.fire(EventType.PROJECT_SETTING_SHOW, false)
  }

  changeConfig (name, e) {
    localStorage.setItem(name, e.target.value)
  }

  saveConfig () {
    eventbus.fire(EventType.PROJECT_SETTING_SHOW, false)
    eventbus.fire(EventType.PROJECT_SETTING_SAVE)
    eventbus.fire(EventType.VARIABLE_CHANGE)
  }

  selectWorkDirectory () {
    dialog.showOpenDialog(
      {
        title: '选择项目的工作目录）',
        properties: ['openDirectory']
      },
      filePaths => {
        let projectPath = filePaths[0]
        localStorage.setItem('projectPath', projectPath)
        AppData.projectPath = projectPath
        this.setState({
          projectPath: projectPath
        })
      }
    )
  }

  render () {
    return (
      <Modal
        title='项目设置'
        visible={this.state.visible}
        onCancel={this.closeDailog.bind(this)}
        onOk={this.saveConfig.bind(this)}
      >
        <Input
          name='host'
          style={{ margin: 10 }}
          placeholder='groupId'
          onChange={this.changeConfig.bind(this, 'groupId')}
          defaultValue={'com.linshang'}
          allowClear
        />
        <Input
          name='artifactId'
          style={{ margin: 10 }}
          placeholder='artifactId'
          onChange={this.changeConfig.bind(this, 'artifactId')}
          defaultValue={'app'}
          allowClear
        />
        <Input
          name='version'
          style={{ margin: 10 }}
          placeholder='version'
          onChange={this.changeConfig.bind(this, 'version')}
          defaultValue='1.0.0'
          allowClear
        />
        <Input
          name='author'
          style={{ margin: 10 }}
          placeholder='author'
          onChange={this.changeConfig.bind(this, 'author')}
          defaultValue='code assistant'
          allowClear
        />
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          项目地址：{this.state.projectPath}
          <Button onClick={this.selectWorkDirectory.bind(this)}>
            选择工作目录
          </Button>
        </div>
      </Modal>
    )
  }
}
