import React, { Component } from 'react'
import { Modal, Form, Input } from 'antd'
import eventbus from '../../eventbus/EventBus'
import EventType from '../../eventbus/EventTyp'
import AppData from '../../constants/AppData'

const formItemLayout = {
  labelCol: {
    span: 4
  },
  wrapperCol: {
    span: 18
  }
}

class DbSettingForm extends Component {
  changeDbConfig (name, e) {
    let value = e.target.value
    AppData.setDatabaseConfig(name, value)
  }

  render () {
    const { getFieldDecorator } = this.props.form
    return (
      <Form {...formItemLayout}>
        <Form.Item label='主机' style={{ marginBottom: 8 }}>
          {getFieldDecorator('host', {
            initialValue: AppData.getDatabaseConfig('host')
          })(
            <Input
              name='host'
              placeholder='数据库链接地址'
              onChange={this.changeDbConfig.bind(this, 'host')}
              allowClear
            />
          )}
        </Form.Item>
        <Form.Item label='端口号' style={{ marginBottom: 8 }}>
          {getFieldDecorator('port', {
            initialValue: AppData.getDatabaseConfig('port')
          })(
            <Input
              name='port'
              placeholder='数据库端口号'
              onChange={this.changeDbConfig.bind(this, 'port')}
              allowClear
            />
          )}
        </Form.Item>
        <Form.Item label='用户名' style={{ marginBottom: 8 }}>
          {getFieldDecorator('user', {
            initialValue: AppData.getDatabaseConfig('user')
          })(
            <Input
              name='user'
              placeholder='user'
              onChange={this.changeDbConfig.bind(this, 'user')}
              allowClear
            />
          )}
        </Form.Item>
        <Form.Item label='密码' style={{ marginBottom: 8 }}>
          {getFieldDecorator('password', {
            initialValue: AppData.getDatabaseConfig('password')
          })(
            <Input
              name='password'
              placeholder='password'
              onChange={this.changeDbConfig.bind(this, 'password')}
              allowClear
            />
          )}
        </Form.Item>
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
        title='连接数据库'
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
