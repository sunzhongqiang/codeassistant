import React, { Component } from 'react'
import { Layout } from 'antd'
import TopButtonGroup from '../components/TopButtonGroup'
import DbTree from '../components/DbTree'
import ContentTab from '../components/content/ContentTab'
import eventbus from '../eventbus/EventBus'
import EventType from '../eventbus/EventTyp'
import CodeGengerator from '../components/template/CodeGenerator'

const { Header, Sider, Content } = Layout

export default class HomePage extends Component {
  state = {
    showDbSettingDailog: false
  }

  constructor () {
    super()
    eventbus.on(EventType.VARIABLE_CHANGE, this.showVariableChange.bind(this))
  }

  showVariableChange () {
    CodeGengerator.generatorTemplateVariable()
  }

  render () {
    return (
      <div>
        <Layout>
          <Header
            style={{
              background: '#666',
              position: 'fixed',
              top: 0,
              height: 60,
              width: '100vw'
            }}
          >
            <TopButtonGroup />
          </Header>
          <Layout style={{ marginTop: 60 }}>
            <Sider
              width={200}
              style={{
                background: '#eee',
                overflow: 'auto',
                height: '100vh',
                position: 'fixed',
                left: 0
              }}
            >
              <DbTree />
            </Sider>

            <Content
              style={{
                height: '100vh',
                marginLeft: 210,
                background: '#fff',
                position: 'fixed',
                top: 70,
                overflow: 'scroll'
              }}
            >
              <ContentTab />
            </Content>
          </Layout>
        </Layout>
      </div>
    )
  }
}
