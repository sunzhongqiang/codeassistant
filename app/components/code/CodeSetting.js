import React, { Component } from 'react'
import { Divider ,Button} from 'antd'
import eventbus from '../../eventbus/EventBus'
import EventType from '../../eventbus/EventTyp'
import JavaCodeDialog from '../codedialog/JavaCodeDialog'
const button = {
  margin:'10px',
  width:'100px'
}
export default class FieldMode extends Component {

  showJavaCodeDialog(){
    eventbus.fire(EventType.JAVA_CODE_DIALOG_SHOW,true)
  }
  
  render(){
    return <div>
      <Divider>FormInput</Divider>
      <Button style={button}>number</Button>
      <Button style={button}>textarea</Button>
      <Button style={button}>password</Button>
      <Button style={button}>date</Button>
      <Button style={button}>file</Button>
      <Button style={button}>select</Button>
      <Button style={button}>radio</Button>
      <Divider>Validation</Divider>
      <Button style={button}>require</Button>
      <Button style={button}>number</Button>
      <Button style={button}>telephone</Button>
      <Button style={button}>date</Button>
      <Button style={button}>array</Button>
      <Button style={button}>boolean</Button>
      <Button style={button}>enum</Button>
      <Button style={button}>string</Button>
      <Button style={button}>regexp</Button>
      
      <Divider>JavaCode</Divider>
     
      <JavaCodeDialog />
    </div>
  }
}
