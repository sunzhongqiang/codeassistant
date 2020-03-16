import React, { Component } from 'react'
import { Table,Row, Col } from 'antd';
import ContentPreview from './ContentPreview';
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


export default class FieldMode extends Component {

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
          <Col span={12}> 
              <Table
            columns={columns}
            dataSource={this.state.fields}
            pagination={false}
            rowSelection={{
              onChange: (selectedRowKeys, selectedRows) => {
                console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
              },
              getCheckboxProps: record => ({
                disabled: record.name === 'Disabled User', // Column configuration not to be checked
                name: record.name,
              })
            }}
          />
          </Col>
          <Col span={12}>
            <ContentPreview/>
          </Col>
        </Row>
       
      </div>
    )
  }

  
}