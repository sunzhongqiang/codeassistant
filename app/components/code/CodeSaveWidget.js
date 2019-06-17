import React, { Component } from 'react'
import { Button, message } from 'antd'
import copy from 'copy-to-clipboard'

export default class CodeSaveWidget extends Component {
  state = {
    projectPath: ''
  }

  componentDidMount () {
    let projectPath = localStorage.getItem('projectPath')
    this.setState({
      projectPath: projectPath
    })
  }

  copyCode () {
    let result = copy(this.props.code)
    if (result) {
      message.success('代码复制成功')
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
          <div style={{ marginLeft: 4 }}>
            {this.state.projectPath + this.props.path}
          </div>
        </div>
        <div>
          <Button style={{ margin: 8 }} onClick={this.copyCode.bind(this)}>
            复制代码
          </Button>
          <Button>保存</Button>
        </div>
      </div>
    )
  }
}
