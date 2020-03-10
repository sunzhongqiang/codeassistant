import React, { Component } from 'react'
import { Button, Radio, message, Modal } from 'antd'
import copy from 'copy-to-clipboard'
import ContentPreview from './ContentPreview'
import CodeData from '../../constants/CodeData'
import JavaCodeGengerator from './JavaCodeGenerator'
import PathUtils from '../../utils/PathUtils'
import AppData from '../../constants/AppData'
import FileSystemUtils from '../../utils/FileSystemUtils'
import eventbus from '../../eventbus/EventBus'
import EventType from '../../eventbus/EventTyp'
import { file } from '@babel/types'
const confirm = Modal.confirm

export class FreeModel extends Component {
  state = {
    layer: '',
    filename: '',
    layerList: [
      'model',
      'dto',
      'dao',
      'dao.impl',
      'repository',
      'service',
      'service.impl',
      'web.controller'
    ]
  }

  componentDidMount () {
    eventbus.on(
      EventType.TABLE_DATA_CHANGE,
      this.generatorCode.bind(this, 'model')
    )
  }

  copyCode () {
    let result = copy(this.state.code)
    if (result) {
      message.success('代码复制成功')
    }
  }

  switchLayer (e) {
    let value = e.target.value
    this.generatorCode(value)
  }

  generatorCode (value) {
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
      code = JavaCodeGengerator.generatorServiceCode()
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

    this.setState({
      layer: value,
      code: code,
      packagename: PathUtils.getPackagePath(value),
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

  saveModel () {
    let packagename = PathUtils.getPackagePath('model')
    FileSystemUtils.mkdir(packagename)
    let code = JavaCodeGengerator.generatorModelCode()
    let filename = PathUtils.getCompleteFilePath(
      'model',
      AppData.getJavaName(),
      '.java'
    )
    let result = FileSystemUtils.saveCode(filename, code)
    if (result) {
      message.success('成功保存model代码')
    } else {
      message.error('保存model代码失败')
    }
  }

  saveDto () {
    let packagename = PathUtils.getPackagePath('dto')
    FileSystemUtils.mkdir(packagename)
    let code = JavaCodeGengerator.generatorDtoCode()
    let filename = PathUtils.getCompleteFilePath(
      'dto',
      AppData.getJavaName(),
      'Dto.java'
    )
    let result = FileSystemUtils.saveCode(filename, code)
    if (result) {
      message.success('成功保存dto代码')
    } else {
      message.error('保存dto代码失败')
    }
  }

  saveDao () {
    let packagename = PathUtils.getPackagePath('dao')
    FileSystemUtils.mkdir(packagename)
    let code = JavaCodeGengerator.generatorDaoCode()
    let filename = PathUtils.getCompleteFilePath(
      'dao',
      AppData.getJavaName(),
      'Dao.java'
    )
    let result = FileSystemUtils.saveCode(filename, code)
    if (result) {
      message.success('成功保存dao代码')
    } else {
      message.error('保存dao代码失败')
    }
  }

  saveDaoImpl () {
    let packagename = PathUtils.getPackagePath('dao.impl')
    FileSystemUtils.mkdir(packagename)
    let code = JavaCodeGengerator.generatorDaoImplCode()
    let filename = PathUtils.getCompleteFilePath(
      'dao.impl',
      AppData.getJavaName(),
      'DaoImpl.java'
    )
    let result = FileSystemUtils.saveCode(filename, code)
    if (result) {
      message.success('成功保存dao.impl代码')
    } else {
      message.error('保存dao.impl代码失败')
    }
  }

  saveRepository () {
    let packagename = PathUtils.getPackagePath('repository')
    FileSystemUtils.mkdir(packagename)
    let code = JavaCodeGengerator.generatorRepositoryCode()
    let filename = PathUtils.getCompleteFilePath(
      'repository',
      AppData.getJavaName(),
      'Repository.java'
    )
    let result = FileSystemUtils.saveCode(filename, code)
    if (result) {
      message.success('成功保存repository代码')
    } else {
      message.error('保存repository代码失败')
    }
  }

  saveService () {
    let packagename = PathUtils.getPackagePath('service')
    FileSystemUtils.mkdir(packagename)
    let code = JavaCodeGengerator.generatorServiceCode()
    let filename = PathUtils.getCompleteFilePath(
      'service',
      AppData.getJavaName(),
      'Service.java'
    )
    let result = FileSystemUtils.saveCode(filename, code)
    if (result) {
      message.success('成功保存service代码')
    } else {
      message.error('保存service代码失败')
    }
  }

  saveServiceImpl () {
    let packagename = PathUtils.getPackagePath('service.impl')
    FileSystemUtils.mkdir(packagename)
    let code = JavaCodeGengerator.generatorServiceImplCode()
    let filename = PathUtils.getCompleteFilePath(
      'service.impl',
      AppData.getJavaName(),
      'ServiceImpl.java'
    )
    let result = FileSystemUtils.saveCode(filename, code)
    if (result) {
      message.success('成功保存service.impl代码')
    } else {
      message.error('保存service.impl代码失败')
    }
  }

  saveWebController () {
    let packagename = PathUtils.getPackagePath('web.controller')
    FileSystemUtils.mkdir(packagename)
    let code = JavaCodeGengerator.generatorControllerCode()
    let filename = PathUtils.getCompleteFilePath(
      'web.controller',
      AppData.getJavaName(),
      'Controller.java'
    )
    let result = FileSystemUtils.saveCode(filename, code)
    if (result) {
      message.success('成功保存WebController代码')
    } else {
      message.error('保存WebController代码失败')
    }
  }

  saveAllJavaCode () {
    let self = this
    confirm({
      title: '全部保存警告',
      content: '如果代码已存在对情况下，会被覆盖，请确保代码安全对情况下使用！',
      onOk () {
        FileSystemUtils.mkdir('model')
        // save model
        self.saveModel()
        self.saveDto()
        self.saveDao()
        self.saveDaoImpl()
        self.saveRepository()
        self.saveService()
        self.saveServiceImpl()
        self.saveWebController()
      },
      onCancel () {
        message.info('取消批量生成')
      }
    })
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
      <div
        style={{
          display: 'flex',
          height: '100',
          flexDirection: 'column'
        }}
      >
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
            <div>
              <Button
                icon='copy'
                title='复制内容'
                onClick={this.copyCode.bind(this)}
              />
              <Button
                icon='save'
                title='保存文件'
                style={{ marginLeft: 8, marginRight: 8 }}
                onClick={this.saveFile.bind(this)}
              />
              <Button
                icon='api'
                title='生成所有'
                onClick={this.saveAllJavaCode.bind(this)}
              />
            </div>
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
          </div>
        </div>
        <ContentPreview
          style={{ height: '75vh', overflow: 'scroll' }}
          code={this.state.code}
        />
      </div>
    )
  }
}
