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
              href='https://github.com/sunzhongqiang/CodeGuide/blob/master/docs/Java.md'
              target='_blank'
            >
              Java代码风格： [
              <a
                href='https://github.com/sunzhongqiang/CodeGuide/blob/master/docs/Java.md'
                target='_blank'
              >
                https://github.com/sunzhongqiang/CodeGuide/blob/master/docs/Java.md
              </a>
              ]
            </a>
          </li>
          <li>
            <a
              href='https://github.com/sunzhongqiang/gene/blob/master/README.md'
              target='_blank'
            >
              基础代码介绍： [
              <a
                href='https://github.com/sunzhongqiang/gene/blob/master/README.md'
                target='_blank'
              >
                https://github.com/sunzhongqiang/gene/blob/master/README.md
              </a>
              ]
            </a>
          </li>
          <li>
            <a
              href='https://github.com/sunzhongqiang/common-web/blob/master/README.md'
              target='_blank'
            >
              common-web介绍: [
              <a
                href='https://github.com/sunzhongqiang/common-web/blob/master/README.md'
                target='_blank'
              >
                https://github.com/sunzhongqiang/common-web/blob/master/README.md
              </a>
              ]
            </a>
          </li>
          <li>
            <a
              href='https://github.com/sunzhongqiang/JavaCodeStyle/blob/master/README.md'
              target='_blank'
            >
              API架构风格： [
              <a
                href='https://github.com/sunzhongqiang/JavaCodeStyle/blob/master/README.md'
                target='_blank'
              >
                https://github.com/sunzhongqiang/JavaCodeStyle/blob/master/README.md
              </a>
              ]
            </a>
          </li>
          <li>
            <a
              href='http://note.youdao.com/noteshare?id=9ecb2f953f82a823c799a9300bb7fa14'
              target='_blank'
            >
              前端代码风格： [
              <a
                href='http://note.youdao.com/noteshare?id=9ecb2f953f82a823c799a9300bb7fa14'
                target='_blank'
              >
                http://note.youdao.com/noteshare?id=9ecb2f953f82a823c799a9300bb7fa14
              </a>
              ]
            </a>
          </li>
        </ul>
      </div>
    )
  }
}
