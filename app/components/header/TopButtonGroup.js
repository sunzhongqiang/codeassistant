import React, { Component } from 'react'
import { Button } from 'antd'
import DbSetting from '../database/DbSetting'
import eventbus from '../../eventbus/EventBus'
import EventType from '../../eventbus/EventTyp'
import JavaProjectSettingDailog from '../project/JavaProjectSettingDailog'
import VueProjectSettingDailog from '../project/VueProjectSettingDailog'

export default class TopButtonGroup extends Component {
  constructor (props) {
    super(props)
  }
  render () {
    return (
      <div>
        <Button icon='database' onClick={this.showDatabaseSetting.bind(this)}>
          连接数据库
        </Button>
        <Button
          style={{ margin: 12 }}
          icon='database'
          onClick={this.showProjectSetting.bind(this)}
        >
          JAVA项目设置
        </Button>
        <Button
          style={{ margin: 12 }}
          icon='database'
          onClick={this.showVueProjectSetting.bind(this)}
        >
          VUE项目设置
        </Button>
        <DbSetting />
        <JavaProjectSettingDailog />
        <VueProjectSettingDailog />
      </div>
    )
  }

  showDatabaseSetting () {
    eventbus.fire(EventType.DATABASE_SETTING_SHOW, true)
  }

  showProjectSetting () {
    eventbus.fire(EventType.PROJECT_SETTING_SHOW, true)
  }

  showVueProjectSetting(){
    eventbus.fire(EventType.VUE_PROJECT_SETTING_SHOW, true)
  }
}
