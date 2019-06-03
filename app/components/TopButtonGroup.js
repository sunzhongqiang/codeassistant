import React, { Component } from 'react';
import { Button } from 'antd';
import DbSetting from './DbSetting';
import eventbus from '../eventbus/EventBus';
import EventType from '../eventbus/EventTyp';

export default class TopButtonGroup extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <Button icon="database" onClick={this.showDatabaseSetting.bind(this)}>
          Database
        </Button>
        <Button icon="database">KeyValue</Button>
        <Button icon="database">Template</Button>
        <Button icon="database">Code</Button>

        <DbSetting />
      </div>
    );
  }

  showDatabaseSetting() {
    eventbus.fire(EventType.DATA_SETTING_SHOW, true);
  }
}
