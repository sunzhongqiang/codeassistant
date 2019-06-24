import React, { Component } from 'react'
import { Button, message, Modal } from 'antd'
import copy from 'copy-to-clipboard'
import PathUtils from '../../utils/PathUtils'
import FileSystemUtils from '../../utils/FileSystemUtils'
const confirm = Modal.confirm

export default class CodeSaveWidget extends Component {
  state = {
    file: ''
  }
  componentDidMount () {
    this.initValue()
  }

  componentWillReceiveProps () {
    console.log('componentWillReceiveProps', arguments)
    this.initValue()
  }

  initValue () {
    let completePath = PathUtils.getPackagePath(this.props.moudle)
    this.setState({
      file: completePath + '/' + this.props.filename
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
    if (FileSystemUtils.existFile(this.state.file)) {
      confirm({
        title: '文件已经存在',
        content: '否发要覆盖已经存在的文件',
        onOk () {
          self.directSave()
        },
        onCancel () {
          message.info('取消了代码生成，没有进行任何的操作！')
        }
      })
    } else {
      this.directSave()
    }
  }

  directSave () {
    let completePath = PathUtils.getPackagePath(this.props.moudle)
    FileSystemUtils.mkdir(completePath)
    let result = FileSystemUtils.saveCode(this.state.file, this.props.code)
    if (!result) {
      message.success('代码保存成功：' + this.state.file)
    }
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
          <Button icon='copy' onClick={this.copyCode.bind(this)} />
          <Button icon='save' onClick={this.saveFile.bind(this)} />
        </div>
      </div>
    )
  }
}
