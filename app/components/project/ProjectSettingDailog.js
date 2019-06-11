import React, { Component } from 'react'
import { Modal, Input } from 'antd'
import eventbus from '../../eventbus/EventBus'
import EventType from '../../eventbus/EventTyp'

export default class ProjectSettingDailog extends Component {
  state = { visible: false }

  constructor () {
    super()
    localStorage.setItem('groupId', 'com.linshang')
    localStorage.setItem('artifactId', 'app')
    localStorage.setItem('version', '1.0.0')
  }

  componentDidMount () {
    eventbus.on(EventType.PROJECT_SETTING_SHOW, this.showDailog.bind(this))
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

  render () {
    return (
      <Modal
        title='数据库链接'
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
      </Modal>
    )
  }
}
