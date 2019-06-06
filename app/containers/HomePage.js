// @flow
import React, { Component } from 'react';
import { Layout, Button, Tree, Modal, Input } from 'antd';
import TopButtonGroup from '../components/TopButtonGroup';
import DbTree from '../components/DbTree';
import ContentTab from '../components/content/ContentTab';

const { Header, Footer, Sider, Content } = Layout;

export default class HomePage extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    showDbSettingDailog: false
  };

  render() {
    return (
      <div>
        <Layout>
          <Header style={{ background: '#fff' }}>
            <TopButtonGroup />
          </Header>
          <Layout>
            <Sider
              style={{
                background: '#999',
                overflow: 'auto',
                height: '100vh',
                position: 'fixed',
                left: 0
              }}
            >
              <DbTree />
            </Sider>
            <Layout style={{ marginLeft: 200 }}>
              <Content>
                <ContentTab />
              </Content>
            </Layout>
          </Layout>
        </Layout>
      </div>
    );
  }
}
