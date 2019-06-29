import React, { Component } from 'react'
import { Button, Radio, message, Modal } from 'antd'
import copy from 'copy-to-clipboard'
import ContentPreview from './ContentPreview'
import CodeData from '../../constants/CodeData'
import JavaCodeGengerator from './JavaCodeGenerator'
import PathUtils from '../../utils/PathUtils'
import AppData from '../../constants/AppData'
import FileSystemUtils from '../../utils/FileSystemUtils'
const confirm = Modal.confirm

export class FreeModel extends Component {
  state = {
    layer: '',
    filename: '',
    layerList: CodeData.getLayer('java')
  }

  copyCode () {
    let result = copy(this.state.code)
    if (result) {
      message.success('代码复制成功')
    }
  }

  switchLayer (e) {
    let value = e.target.value
    let code = ''
    let filename = ''
    if (value == 'model') {
      code = JavaCodeGengerator.generatorModelCode()
      filename = PathUtils.getCompleteFilePath(
        value,
        AppData.getJavaName(),
        '.java'
      )
    }
    if (value == 'dto') {
      code = JavaCodeGengerator.generatorDtoCode()
      filename = PathUtils.getCompleteFilePath(
        value,
        AppData.getJavaName(),
        'Dto.java'
      )
    }
    if (value == 'dao') {
      code = JavaCodeGengerator.generatorDaoCode()
      filename = PathUtils.getCompleteFilePath(
        value,
        AppData.getJavaName(),
        'Dao.java'
      )
    }
    if (value == 'dao.impl') {
      code = JavaCodeGengerator.generatorDaoImplCode()
      filename = PathUtils.getCompleteFilePath(
        value,
        AppData.getJavaName(),
        'DaoImpl.java'
      )
    }
    if (value == 'repository') {
      code = JavaCodeGengerator.generatorRepositoryCode()
      filename = PathUtils.getCompleteFilePath(
        value,
        AppData.getJavaName(),
        'Repository.java'
      )
    }
    if (value == 'service') {
      code = JavaCodeGengerator.generatorDaoImplCode()
      filename = PathUtils.getCompleteFilePath(
        value,
        AppData.getJavaName(),
        'Service.java'
      )
    }
    if (value == 'service.impl') {
      code = JavaCodeGengerator.generatorServiceImplCode()
      filename = PathUtils.getCompleteFilePath(
        value,
        AppData.getJavaName(),
        'ServiceImpl.java'
      )
    }
    if (value == 'web.controller') {
      code = JavaCodeGengerator.generatorControllerCode()
      filename = PathUtils.getCompleteFilePath(
        value,
        AppData.getJavaName(),
        'Controller.java'
      )
    }

    if (value == 'copy') {
      code = JavaCodeGengerator.generatorCopyCode()
      filename = ''
    }

    this.setState({
      layer: e.target.value,
      code: code,
      packagename: value,
      filename
    })
  }

  saveFile () {
    let self = this
    if (FileSystemUtils.existFile(this.state.filename)) {
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
    FileSystemUtils.mkdir(this.state.packagename)
    let result = FileSystemUtils.saveCode(this.state.filename, this.state.code)
    if (!result) {
      message.success('代码保存成功')
    }
  }

  renderLayer () {
    let layerList = this.state.layerList

    let result = []
    for (let item of layerList) {
      result.push(
        <Radio.Button key={item} value={item}>
          {item}
        </Radio.Button>
      )
    }
    return result
  }

  render () {
    return (
      <div>
        <div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: 8,
              justifyContent: 'space-between',
              background: '#eaeaea'
            }}
          >
            <Radio.Group
              value={this.state.layer}
              onChange={this.switchLayer.bind(this)}
            >
              {this.renderLayer()}
            </Radio.Group>
            <Radio.Group
              value={this.state.layer}
              onChange={this.switchLayer.bind(this)}
            >
              <Radio.Button value='copy'>相互赋值</Radio.Button>
              <Radio.Button value='sql'>复杂查询</Radio.Button>
            </Radio.Group>
            <Button icon='copy' onClick={this.copyCode.bind(this)} />
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: 8,
              justifyContent: 'space-between',
              background: '#eaeaea'
            }}
          >
            路径：{this.state.filename}
            <Button icon='save' onClick={this.saveFile.bind(this)} />
          </div>
        </div>
        <ContentPreview code={this.state.code} />
      </div>
    )
  }
}
