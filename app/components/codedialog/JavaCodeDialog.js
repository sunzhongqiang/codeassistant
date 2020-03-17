import React, { Component } from 'react'
import { Modal, Form, Input,Radio } from 'antd'
import eventbus from '../../eventbus/EventBus'
import EventType from '../../eventbus/EventTyp'
import ContentPreview from '../code/ContentPreview'
import JavaCodeGengerator from '../../generator/JavaCodeGenerator'
import AppData from '../../constants/AppData'

export default class JavaCodeDialog extends Component {

  constructor () {
    super()
  }

  state = {
    visible: false,
    code:''
  }

  componentDidMount () {
    eventbus.on(EventType.JAVA_CODE_DIALOG_SHOW, this.switchDailog.bind(this))
    this.generateCode('page')
  }

  onChange(e) {
    let value = e.target.value;
    
    this.generateCode(value)
  }

  generateCode(value){
    let fields = AppData.getSelectedFields();
    const code = JavaCodeGengerator.generatorCodeByFieldCode(fields,{show:value})
    this.setState({
        code
    })
  }

  close () {
    this.setState({
      visible: false
    })
  }

  switchDailog (visible) {
    this.setState({
      visible: visible
    })
  }

 

  render () {
    return (
      <Modal
        title='Java代码片段'
        visible={this.state.visible}
        onCancel={this.close.bind(this)}
        onOk={this.close.bind(this)}
        width={800}
      >
        <div>
          <span>返回值：</span>
          <Radio.Group onChange={this.onChange.bind(this)} defaultValue="page">
            <Radio.Button value="page">分页</Radio.Button>
            <Radio.Button value="list">列表</Radio.Button>
            <Radio.Button value="object">对象</Radio.Button>
          </Radio.Group>
        </div>
        <ContentPreview code={this.state.code} />
      </Modal>
    )
  }

}