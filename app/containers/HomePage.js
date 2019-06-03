// @flow
import React, { Component } from 'react';
import { Layout, Button, Tree, Modal, Input } from 'antd';
import TopButtonGroup from '../components/TopButtonGroup';
import DbTree from '../components/DbTree';

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
            <Sider style={{ background: '#fff' }}>
              <DbTree />
            </Sider>
            <Layout>
              <Content>Content</Content>
              <Footer>Footer</Footer>
            </Layout>
          </Layout>
        </Layout>
      </div>
    );
  }
}
