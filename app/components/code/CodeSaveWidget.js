import React, { Component } from 'react'
import { Button, message, Modal } from 'antd'
import copy from 'copy-to-clipboard'
import AppData from '../../constants/AppData'
import eventbus from '../../eventbus/EventBus'
import EventType from '../../eventbus/EventTyp'
const fs = require('fs')
const confirm = Modal.confirm

export default class CodeSaveWidget extends Component {
  state = {
    projectPath: ''
  }

  componentDidMount () {
    this.initValue()
    eventbus.on(EventType.PROJECT_CONFIG_CHANGE, this.initValue.bind(this))
  }

  initValue () {
    console.log(this.props)
    let projectPath = AppData.getProjectConfig('path')
    this.setState({
      file: projectPath + this.props.path + this.props.filename
    })
  }

  copyCode () {
    let result = copy(this.props.code)
    if (result) {
      message.success('代码复制成功')
    }
  }

  saveFile () {
    let self = this
    if (this.existsFile()) {
      confirm({
        title: '文件已经存在',
        content: '否发要覆盖已经存在的文件',
        onOk () {
          let path = AppData.getProjectConfig('path') + self.props.path
          if (!fs.existsSync(path)) {
            fs.mkdirSync(AppData.getProjectConfig('path') + self.props.path)
          }
          let result = fs.writeFileSync(self.state.file, self.props.code)
          if (!result) {
            message.success('代码保存成功：' + self.state.file)
          }
        },
        onCancel () {
          message.info('取消了代码生成，没有进行任何的操作！')
        }
      })
    }
  }

  existsFile () {
    let filename = this.state.file
    return fs.existsSync(filename)
  }

  render () {
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          padding: 10,
          justifyContent: 'space-between',
          background: '#eaeaea'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div>保存路径：</div>
          <div style={{ marginLeft: 4 }}>{this.state.file}</div>
        </div>
        <div>
          <Button style={{ margin: 8 }} onClick={this.copyCode.bind(this)}>
            复制代码
          </Button>
          <Button onClick={this.saveFile.bind(this)}>保存</Button>
        </div>
      </div>
    )
  }
}
