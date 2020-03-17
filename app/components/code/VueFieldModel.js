import React, { Component } from 'react'
import { Table,Button, Select } from 'antd';
import ContentPreview from './ContentPreview';
import JavaCodeGengerator from '../../generator/JavaCodeGenerator'
import eventbus from '../../eventbus/EventBus'
import EventType from '../../eventbus/EventTyp'
import AppData from '../../constants/AppData'
const { Option } = Select;

const columns = [
  {
    title: '字段',
    dataIndex: 'name',
  },
  {
    title: '字段名',
    dataIndex: 'comment',
  },
  {
    title: '类型',
    dataIndex: 'inputtype',
    editable: true,
    width:'150px',
    render(text, record, index){
      return <Select style={{ width: '100%' }} value="text" onChange={(value)=>{record.inputtype = value}}>
              <Option value="text">text</Option>
              <Option value="textarea">textarea</Option>
              <Option value="password">password</Option>
              <Option value="inputnumber">inputnumber</Option>
              <Option value="select">select</Option>
              <Option value="radio">radio</Option>
              <Option value="checkbox">checkbox</Option>
              <Option value="cascader">cascader</Option>
              <Option value="switch">switch</Option>
              <Option value="slider">slider</Option>
              <Option value="date">date</Option>
              <Option value="daterange">daterange</Option>
              <Option value="upload">upload</Option>
            </Select>
    }
  },
  {
    title: '规则',
    dataIndex: 'rule',
    width:'500px',
    render(text, record, index){
      return <Select style={{ width: '100%' }}  mode="tags" onChange={(value)=>{record.rule = value}}>
              <Option value="required">required</Option>
              <Option value="number">number</Option>
              <Option value="string">string</Option>
              <Option value="date">date</Option>
              <Option value="boolean">boolean</Option>
              <Option value="float">float</Option>
              <Option value="integer">integer</Option>
              <Option value="telephone">telephone</Option>
            </Select>
    }
  }
];


export default class VueFieldMode extends Component {

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
          <Button style={{marginRight:10}}>表单代码</Button>
          <Button style={{marginRight:10}}>列表代码</Button>
          <Button style={{marginRight:10}}>详情代码</Button>
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
      </div>
    )
  }

  
}