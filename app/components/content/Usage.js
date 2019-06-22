import React, { Component } from 'react'
import { Tabs } from 'antd'

export default class Usage extends Component {
  render () {
    return (
      <div>
        <h1>基本用法</h1>
        <p>
          点击连接数据库进行数据库配置，连接上数据库后，选择对应的数据库，点击对应的表，点击对应的tab页查看生成的信息
          帮助和参考文档：
        </p>
        <h2>帮助和参考文档：</h2>
        <ul>
          <li>
            <a
              href='https://github.com/sunzhongqiang/JavaCodeStyle/blob/master/README.md'
              target='_blank'
            >
              遵循的Java代码风格
            </a>
          </li>
          <li>
            <a
              href='http://note.youdao.com/noteshare?id=9ecb2f953f82a823c799a9300bb7fa14'
              target='_blank'
            >
              遵循的前端代码风格
            </a>
          </li>
        </ul>
        <webview
          src='https://github.com/sunzhongqiang/JavaCodeStyle/blob/master/README.md'
          style={{ display: 'inline-flex', width: '100%', height: '880px' }}
        />
      </div>
    )
  }
}
