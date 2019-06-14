import React, { Component } from 'react'
import { Form, Input, Button } from 'antd'

export default class CodeSaveWidget extends Component {
  render () {
    return (
      <Form layout='inline' style={{ width: '100%' }}>
        <Form.Item
          label='路径：'
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 20 }}
        >
          <Input placeholder='input placeholder' />
        </Form.Item>
        <Form.Item>
          <Button>保存</Button>
        </Form.Item>
      </Form>
    )
  }
}
