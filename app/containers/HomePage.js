import React, { Component } from 'react'
import { Layout } from 'antd'
import TopButtonGroup from '../components/TopButtonGroup'
import DbTree from '../components/DbTree'
import TabelColumn from '../components/content/TableColumn'
import ContentTab from '../components/content/ContentTab'

const { Header, Sider, Content } = Layout

export default class HomePage extends Component {
  state = {
    showDbSettingDailog: false
  }

  render () {
    return (
      <div>
        <Layout>
          <Header style={{ background: '#fff' }}>
            <TopButtonGroup />
          </Header>
          <Layout>
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

            <Content style={{ marginLeft: 200 }}>
              <ContentTab />
            </Content>
          </Layout>
        </Layout>
      </div>
    )
  }
}
