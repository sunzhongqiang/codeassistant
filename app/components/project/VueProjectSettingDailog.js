import React, { Component } from 'react'
import { Modal, Input, Button, Form } from 'antd'
import eventbus from '../../eventbus/EventBus'
import EventType from '../../eventbus/EventTyp'
import AppData from '../../constants/AppData'
import PathUtils from '../../utils/PathUtils'
const dialog = require('electron').remote.dialog

export default class VueProjectSettingDailog extends Component {
  state = { visible: false }

  constructor () {
    super()
  }

  componentDidMount () {
    eventbus.on(EventType.VUE_PROJECT_SETTING_SHOW, this.switchDailog.bind(this))
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
  }

  saveConfig () {
    eventbus.fire(EventType.PROJECT_CONFIG_CHANGE)
    this.setState({
      visible: false
    })
  }

  selectWorkDirectory () {
    dialog.showOpenDialog(
      {
        title: '选择项目的工作目录）',
        properties: ['openDirectory']
      },
      filePaths => {
        let projectPath = filePaths[0]
        AppData.setProjectConfig('vuepath', projectPath),
        this.setState({
          path:projectPath
        })
      }
    )
  }

  render () {
    return (
      <Modal
        title='VUE项目设置'
        width={800}
        visible={this.state.visible}
        onCancel={this.closeDailog.bind(this)}
        onOk={this.saveConfig.bind(this)}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between'
          }}
        >
          <span>项目地址：{this.state.path}</span>
          <Button onClick={this.selectWorkDirectory.bind(this)} size='small'>
            选择工作目录
          </Button>
        </div>
        <div>源码路径：/src/</div>
        
      </Modal>
    )
  }
}
