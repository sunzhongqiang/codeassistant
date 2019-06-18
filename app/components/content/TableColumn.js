import React, { Component } from 'react'
import { Table } from 'antd'
import eventbus from '../../eventbus/EventBus'
import EventType from '../../eventbus/EventTyp'
import AppData from '../../constants/AppData'

const columns = [
  {
    title: '字段',
    dataIndex: 'COLUMN_NAME',
    key: 'COLUMN_NAME'
  },
  {
    title: '类型',
    dataIndex: 'DATA_TYPE',
    key: 'DATA_TYPE'
  },
  {
    title: '特殊',
    dataIndex: 'COLUMN_KEY',
    key: 'COLUMN_KEY',
    render: (text, record) => {
      return text + ' ' + record['EXTRA']
    }
  },
  {
    title: '注释',
    dataIndex: 'COLUMN_COMMENT',
    key: 'COLUMN_COMMENT'
  }
]

export default class ContentTab extends Component {
  state = {
    data: []
  }

  componentDidMount () {
    eventbus.on(EventType.TABLE_DATA_CHANGE, this.showData.bind(this))
    this.showData(AppData.getColumnFields())
  }

  showData (data) {
    this.setState({
      data: AppData.getColumnFields()
    })
  }

  render () {
    return (
      <Table
        bordered
        columns={columns}
        rowKey={'COLUMN_NAME'}
        dataSource={this.state.data}
        pagination={false}
        size={'small'}
      />
    )
  }
}
