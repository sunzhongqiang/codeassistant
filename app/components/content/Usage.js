import React, { Component } from 'react'
import Remarkable from 'remarkable'
import rp from 'request-promise'
import { Tabs } from 'antd'
const { TabPane } = Tabs

export default class Usage extends Component {
  state = {
    javaGuide: '',
    basicCode: '',
    commonWeb: '',
    apiStyle: '',
    pom: ''
  }

  componentDidMount () {
    rp.get(
      'https://raw.githubusercontent.com/sunzhongqiang/CodeGuide/master/docs/Java.md'
    ).then(result => {
      this.setState({
        javaGuide: result
      })
    })
    rp.get(
      'https://raw.githubusercontent.com/sunzhongqiang/gene/master/README.md'
    ).then(result => {
      this.setState({
        basicCode: result
      })
    })

    rp.get(
      'https://raw.githubusercontent.com/sunzhongqiang/common-web/master/README.md'
    ).then(result => {
      this.setState({
        commonWeb: result
      })
    })

    rp.get(
      'https://raw.githubusercontent.com/sunzhongqiang/JavaCodeStyle/master/README.md'
    ).then(result => {
      this.setState({
        apiStyle: result
      })
    })

    rp.get(
      'https://raw.githubusercontent.com/sunzhongqiang/JavaCodeStyle/master/pom.md'
    ).then(result => {
      this.setState({
        pom: result
      })
    })
  }

  getRawMarkup (markText) {
    const md = new Remarkable()
    return { __html: md.render(markText) }
  }

  render () {
    return (
      <div style={{ padding: 8 }}>
        <h1>基本用法</h1>
        <p>
          点击连接数据库进行数据库配置，连接上数据库后，选择对应的数据库，点击对应的表，点击对应的tab页查看生成的信息
          帮助和参考文档：
        </p>
        <h2>帮助和参考文档：</h2>

        <Tabs type='card'>
          <TabPane tab='Java代码风格' key='usage'>
            <div
              className='content'
              dangerouslySetInnerHTML={this.getRawMarkup(this.state.javaGuide)}
            />
          </TabPane>
          <TabPane tab='基础代码介绍' key='basic-code'>
            <div
              className='content'
              dangerouslySetInnerHTML={this.getRawMarkup(this.state.basicCode)}
            />
          </TabPane>
          <TabPane tab='common-web介绍' key='common-web'>
            <div
              className='content'
              dangerouslySetInnerHTML={this.getRawMarkup(this.state.commonWeb)}
            />
          </TabPane>
          <TabPane tab='API架构风格' key='api-style'>
            <div
              className='content'
              dangerouslySetInnerHTML={this.getRawMarkup(this.state.apiStyle)}
            />
          </TabPane>
          <TabPane tab='可能需要用到的POM'>
            <div
              className='content'
              dangerouslySetInnerHTML={this.getRawMarkup(this.state.pom)}
            />
          </TabPane>
        </Tabs>
      </div>
    )
  }
}
