import React, { Component } from 'react'
import { Button, Radio, message, Modal } from 'antd'
import copy from 'copy-to-clipboard'
import ContentPreview from './ContentPreview'
import VueCodeGengerator from '../../generator/VueCodeGengerator'
import FileSystemUtils from '../../utils/FileSystemUtils'
import eventbus from '../../eventbus/EventBus'
import EventType from '../../eventbus/EventTyp'
const confirm = Modal.confirm

export class VueModel extends Component {
  state = {
    layer: '',
    filename: '',
    layerList: [
      'vue-form',
      'vue-table',
      'vue-query-form',
      'vue-model',
      'api',
      'ClassApi'
    ]
  }

  componentDidMount () {
    eventbus.on(
      EventType.TABLE_DATA_CHANGE,
      this.generatorCode.bind(this, 'vue-form')
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
    if('vue-form'===value){
      code = VueCodeGengerator.generatorVueFormCode()
    }

    if('api'===value){
      code = VueCodeGengerator.generatorVueApiCode()
    }

    if('ClassApi'===value){
      code = VueCodeGengerator.generatorClassApiCode()
    }

    if('vue-table'===value){
      code = VueCodeGengerator.generatorVueTableCode()
    }

    if('vue-query-form'===value){
      code = VueCodeGengerator.generatorQueryFormCode()
    }
    if('vue-model'===value){
      code = VueCodeGengerator.generatorModelCode()
    }

    this.setState({
      layer: value,
      code: code,
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

  saveAllCode () {
    let self = this
    confirm({
      title: '全部保存警告',
      content: '如果代码已存在对情况下，会被覆盖，请确保代码安全对情况下使用！',
      onOk () {
        message.info("功能尚未实现");
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
                onClick={this.saveAllCode.bind(this)}
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
