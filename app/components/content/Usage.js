import React, { Component } from 'react'
import { Tabs } from 'antd'

export default class Usage extends Component {
  render () {
    return (
      <div>
        <h1>基本用法</h1>
        <p>
          点击连接数据库进行数据库配置，连接上数据库后，选择对应的数据库，点击对应的表，点击对应的tab页查看生成的信息
        </p>
      </div>
    )
  }
}
