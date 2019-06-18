import React, { Component } from 'react'
import { Modal, Form, Input } from 'antd'
import eventbus from '../../eventbus/EventBus'
import EventType from '../../eventbus/EventTyp'
import AppData from '../../constants/AppData'

class DbSettingForm extends Component {
  changeDbConfig (name, e) {
    let value = e.target.value
    AppData.setDatabaseConfig(name, value)
  }

  render () {
    const { getFieldDecorator } = this.props.form
    return (
      <Form>
        {getFieldDecorator('host', {
          initialValue: AppData.getDatabaseConfig('host')
        })(
          <Input
            name='host'
            style={{ margin: 10 }}
            placeholder='数据库链接地址'
            onChange={this.changeDbConfig.bind(this, 'host')}
            allowClear
          />
        )}
        {getFieldDecorator('port', {
          initialValue: AppData.getDatabaseConfig('port')
        })(
          <Input
            name='port'
            style={{ margin: 10 }}
            placeholder='数据库端口号'
            onChange={this.changeDbConfig.bind(this, 'port')}
            allowClear
          />
        )}
        {getFieldDecorator('user', {
          initialValue: AppData.getDatabaseConfig('user')
        })(
          <Input
            name='user'
            style={{ margin: 10 }}
            placeholder='user'
            onChange={this.changeDbConfig.bind(this, 'user')}
            allowClear
          />
        )}
        {getFieldDecorator('password', {
          initialValue: AppData.getDatabaseConfig('password')
        })(
          <Input
            name='password'
            style={{ margin: 10 }}
            placeholder='password'
            onChange={this.changeDbConfig.bind(this, 'password')}
            allowClear
          />
        )}
      </Form>
    )
  }
}

DbSettingForm = Form.create({})(DbSettingForm)

class DbSetting extends Component {
  constructor () {
    super()
  }

  state = {
    visible: false
  }

  componentDidMount () {
    eventbus.on(EventType.DATABASE_SETTING_SHOW, this.switchDailog.bind(this))
  }

  closeDbSetting () {
    this.setState({
      visible: false
    })
  }

  switchDailog (visible) {
    this.setState({
      visible: visible
    })
  }

  saveConfig () {
    eventbus.fire(EventType.DATABASE_CONFIG_CHANGE)
    this.closeDbSetting()
  }

  render () {
    return (
      <Modal
        title='数据库链接'
        visible={this.state.visible}
        onCancel={this.closeDbSetting.bind(this)}
        onOk={this.saveConfig.bind(this)}
      >
        <DbSettingForm />
      </Modal>
    )
  }
}

export default DbSetting
