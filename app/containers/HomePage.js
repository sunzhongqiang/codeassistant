import React, { Component } from 'react'
import { Layout } from 'antd'
import TopButtonGroup from '../components/header/TopButtonGroup'
import DbTree from '../components/database/DbTree'
import ContentTab from '../components/content/ContentTab'

const { Header, Sider, Content } = Layout

export default class HomePage extends Component {
  state = {
    showDbSettingDailog: false
  }

  constructor () {
    super()
  }

  render () {
    return (
      <div>
        <Layout>
          <Header
            style={{
              background: '#666',
              position: 'fixed',
              zIndex: 1,
              width: '100vw'
            }}
          >
            <TopButtonGroup />
          </Header>

          <Content
            style={{
              marginLeft: 260,
              marginTop: 64,
              background: '#fff',
              overflow: 'scroll'
            }}
          >
                 
            <Layout>
              <Sider
                width={250}
                style={{
                  background: '#eee',
                  height:'700px',
                  overflowY:'scroll',
                  position: 'fixed',
                  left: 0
                }}
              >
                <DbTree />
              </Sider>
            </Layout>
            <ContentTab />
          </Content>
        </Layout>
      </div>
    )
  }
}
