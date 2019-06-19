import React, { Component } from 'react'
import { Modal, Input, Button } from 'antd'
import eventbus from '../../eventbus/EventBus'
import EventType from '../../eventbus/EventTyp'
import AppData from '../../constants/AppData'
import PathUtils from '../../utils/PathUtils'
const dialog = require('electron').remote.dialog

export default class ProjectSettingDailog extends Component {
  state = { visible: false }

  constructor () {
    super()
  }

  componentDidMount () {
    eventbus.on(EventType.PROJECT_SETTING_SHOW, this.switchDailog.bind(this))
    this.initValue()
  }

  initValue () {
    let projectConfig = AppData.getAllProjectConfig()
    let modelPath = PathUtils.getPackagePath('model')
    let dtoPath = PathUtils.getPackagePath('dto')
    let servicePath = PathUtils.getPackagePath('service')
    let serviceImplPath = PathUtils.getPackagePath('service.impl')
    let daoPath = PathUtils.getPackagePath('dao')
    let daoImplPath = PathUtils.getPackagePath('dao.impl')
    this.setState({
      modelPath: modelPath,
      dtoPath,
      servicePath,
      serviceImplPath,
      daoPath,
      daoImplPath,
      ...projectConfig
    })
  }

  closeDailog () {
    this.setState({
      visible: false
    })
  }

  switchDailog (visible) {
    this.setState({
      visible: visible
    })
  }

  changeConfig (name, e) {
    let value = e.target.value
    AppData.setProjectConfig(name, value)
    this.initValue()
  }

  saveConfig () {
    eventbus.fire(EventType.PROJECT_SETTING_SHOW, false)
    eventbus.fire(EventType.PROJECT_CONFIG_CHANGE)
  }

  selectWorkDirectory () {
    dialog.showOpenDialog(
      {
        title: '选择项目的工作目录）',
        properties: ['openDirectory']
      },
      filePaths => {
        let projectPath = filePaths[0]
        AppData.setProjectConfig('path', projectPath)
        this.initValue()
      }
    )
  }

  render () {
    return (
      <Modal
        title='项目设置'
        width={800}
        visible={this.state.visible}
        onCancel={this.closeDailog.bind(this)}
        onOk={this.saveConfig.bind(this)}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: '10px',
            marginLeft: '10px'
          }}
        >
          <span>项目地址：{this.state.path}</span>
          <Button onClick={this.selectWorkDirectory.bind(this)}>
            选择工作目录
          </Button>
        </div>
        <div
          style={{
            display: 'flex',
            marginTop: '10px',
            marginLeft: '10px',
            justifyContent: 'space-between'
          }}
        >
          <span>源码路径：/src/main/java</span>
        </div>
        <Input
          name='groupId'
          style={{ margin: 10 }}
          placeholder='groupId'
          onChange={this.changeConfig.bind(this, 'groupId')}
          defaultValue={this.state.groupId}
          allowClear
        />
        <Input
          name='artifactId'
          style={{ margin: 10 }}
          placeholder='artifactId'
          onChange={this.changeConfig.bind(this, 'artifactId')}
          defaultValue={this.state.artifactId}
          allowClear
        />
        <Input
          name='version'
          style={{ margin: 10 }}
          placeholder='version'
          onChange={this.changeConfig.bind(this, 'version')}
          defaultValue={this.state.version}
          allowClear
        />
        <Input
          name='author'
          style={{ margin: 10 }}
          placeholder='author'
          onChange={this.changeConfig.bind(this, 'author')}
          defaultValue={this.state.author}
          allowClear
        />
        <div
          style={{
            display: 'flex',
            marginTop: '10px',
            marginLeft: '10px'
          }}
        >
          <div style={{ width: 150 }}>model路径：</div>
          <div>{this.state.modelPath}</div>
        </div>
        <div
          style={{
            display: 'flex',
            marginTop: '10px',
            marginLeft: '10px'
          }}
        >
          <div style={{ width: 150 }}>dto路径：</div>
          <div>{this.state.dtoPath}</div>
        </div>
        <div
          style={{
            display: 'flex',
            marginTop: '10px',
            marginLeft: '10px'
          }}
        >
          <div style={{ width: 150 }}>service路径：</div>
          <div>{this.state.servicePath}</div>
        </div>
        <div
          style={{
            display: 'flex',
            marginTop: '10px',
            marginLeft: '10px'
          }}
        >
          <div style={{ width: 150 }}>serviceImpl路径：</div>
          <div>{this.state.serviceImplPath}</div>
        </div>
        <div
          style={{
            display: 'flex',
            marginTop: '10px',
            marginLeft: '10px'
          }}
        >
          <div style={{ width: 150 }}>dao路径：</div>
          <div>{this.state.daoPath}</div>
        </div>
        <div
          style={{
            display: 'flex',
            marginTop: '10px',
            marginLeft: '10px'
          }}
        >
          <div style={{ width: 150 }}>daoImpl路径：</div>
          <div>{this.state.daoImplPath}</div>
        </div>
      </Modal>
    )
  }
}
