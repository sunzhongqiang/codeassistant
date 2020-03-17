import React, { Component } from 'react'
import { Table,Row, Col,Radio } from 'antd';
import ContentPreview from './ContentPreview';
import JavaCodeGengerator from '../../generator/JavaCodeGenerator'
import eventbus from '../../eventbus/EventBus'
import EventType from '../../eventbus/EventTyp'
import AppData from '../../constants/AppData'
const columns = [
  {
    title: '字段',
    dataIndex: 'name',
  },
  {
    title: '字段名',
    dataIndex: 'comment',
  }
];


export default class JavaFieldModel extends Component {

  state = {
    fields :[]
  }
  componentDidMount () {
    eventbus.on(EventType.TABLE_DATA_CHANGE, this.refreshCode.bind(this))
    this.showField()
  }

  refreshCode(){
    this.showField()
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

  showField(){
    const fields = AppData.getJavaFields();
    console.log('fields',fields);
    this.setState({
      fields
    });
  }

  render () {
    return (
      <div >
        <Row>
          <Col span={8}> 
              <Table
            columns={columns}
            dataSource={this.state.fields}
            pagination={false}
            rowSelection={{
              onChange: (selectedRowKeys, selectedRows) => {
                console.log('selectedRows',selectedRows);
                AppData.setSelectedFields(selectedRows);
              },
              getCheckboxProps: record => ({
                disabled: record.name === 'Disabled User', // Column configuration not to be checked
                name: record.name,
              })
            }}
          />
          </Col>
          <Col span={1}></Col>
          <Col span={15}>
            <Row>
            <span>返回值：</span>
          <Radio.Group onChange={this.onChange.bind(this)} defaultValue="page">
            <Radio.Button value="page">分页</Radio.Button>
            <Radio.Button value="list">列表</Radio.Button>
            <Radio.Button value="object">对象</Radio.Button>
          </Radio.Group>
            </Row>
            <Row>
            <ContentPreview code={this.state.code} />
            </Row>
          </Col>
        </Row>
      </div>
    )
  }

  
}