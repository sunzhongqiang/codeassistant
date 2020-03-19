import React, { Component } from 'react'
import { Row, Col,Switch, Select ,Divider, Radio,InputNumber} from 'antd';
import ContentPreview from './ContentPreview';
import JavaCodeGengerator from '../../generator/JavaCodeGenerator'
import eventbus from '../../eventbus/EventBus'
import EventType from '../../eventbus/EventTyp'
import AppData from '../../constants/AppData'
import VueCodeGengerator from '../../generator/VueCodeGengerator';
const { Option } = Select;

const buttonRadio = {
  width:'100px',
  textAlign:'center'
}

export default class VueFieldMode extends Component {

  state = {
    fields :[],
    field:{},
    children:[],
    formType:'text',
    validation:{},
    config :{
      required:false,
      trigger:true
    },
    code:' code'
  }
  componentDidMount () {
    eventbus.on(EventType.TABLE_DATA_CHANGE, this.refreshCode.bind(this))
    this.showField()
  }

  refreshCode(){
    this.showField()
  }

  onChange(e) {
    let value = e.target.value;
    this.generateCode(value)
  }

  generateCode(value){
    
    const code = JavaCodeGengerator.generatorCodeByFieldCode(fields,{show:value})
    this.setState({
        code
    })
  }

  showField(){
    const fields = AppData.getJavaFields();
    const children = [];
    for (let field of fields) {
      children.push(<Option key={field.name} value={field.name}>{field.name}:{field.comment}</Option>);
    }
    this.setState({
      children,
      fields
    });
  }

  changeFormInput(e){
    let formType = e.target.value;
    this.setState({
      formType
    },()=>{
      this.showCode()
    })
    
  }

  onFieldChange(value,option){
    const fields = AppData.getJavaFields();
    for(const field of fields){
      if(field.name === value){
        this.setState({
          field
        },()=>{
          this.showCode();
        })
        break;
      }
    }
  }

  showCode(){
    console.log('this.state',this.state);
    let code = VueCodeGengerator.generatorFieldCode(this.state.field,this.state.formType,this.state.validation,this.state.config)
    this.setState({
      code
    })
  }

  changeConfig(name,value){
    const config = this.state.config;
    console.log('changeConfig',name,value);
    config[name] = value
    this.setState({
      config
    },()=>{
      this.showCode()
    })
  }

  changeValidationType(e){
    let validation = this.state.validation;
    validation.type = e.target.value
    this.setState({
      validation
    },()=>{
      this.showCode()
    })
  }

  render () {
    return (
      <div >
         <div style={{display:'flex'}}>
         <Select defaultActiveFirstOption={true} style={{ width: '220px' }} onChange={this.onFieldChange.bind(this)}>
            {this.state.children}
          </Select>
         </div>
        <Row>
          <Col span={16}>
            <ContentPreview code={this.state.code} ></ContentPreview>
          </Col>
          <Col span={8}>
          <Divider>form input type</Divider>
          <Radio.Group defaultValue="text" onChange={this.changeFormInput.bind(this)}>
            <Radio.Button style={buttonRadio} value="text">text</Radio.Button>
            <Radio.Button style={buttonRadio} value="textarea">textarea</Radio.Button>
            <Radio.Button style={buttonRadio} value="password">password</Radio.Button>
            <Radio.Button style={buttonRadio} value="inputnumber">inputnumber</Radio.Button>
            <Radio.Button style={buttonRadio} value="slider">slider</Radio.Button>
            <Radio.Button style={buttonRadio} value="date">date</Radio.Button>
            <Radio.Button style={buttonRadio} value="select">select</Radio.Button>
            <Radio.Button style={buttonRadio} value="checkbox">checkbox</Radio.Button>
            <Radio.Button style={buttonRadio} value="radio">radio</Radio.Button>
            <Radio.Button style={buttonRadio} value="cascader">cascader</Radio.Button>
            <Radio.Button style={buttonRadio} value="switch">switch</Radio.Button>
            <Radio.Button style={buttonRadio} value="upload">upload</Radio.Button>
            <Radio.Button style={buttonRadio} value="search">search</Radio.Button>
          </Radio.Group>

          <Divider>Config</Divider>
          <Switch checkedChildren="range" style={{margin:'8px'}}  unCheckedChildren="range"  onChange={this.changeConfig.bind(this,"range")} />
          <InputNumber  placeholder="最小长度/值" style={{width:'100px'}} onChange={this.changeConfig.bind(this,"min")}/>
          <span> - </span>
          <InputNumber  placeholder="最大长度/值" style={{width:'100px'}} onChange={this.changeConfig.bind(this,'max')}/>
          <Divider>validation</Divider>
          <div style={{display:'flex',justifyContent:'space-between',padding:'12px 20px'}}>
          <Switch checkedChildren="必填"  unCheckedChildren="可空"  onChange={this.changeConfig.bind(this,"required")} />
          <Switch checkedChildren="blur"  unCheckedChildren="change" defaultChecked onChange={this.changeConfig.bind(this,"trigger")}/>    
          </div>
          <Radio.Group defaultValue="text" onChange={this.changeValidationType.bind(this)}>
            <Radio.Button style={buttonRadio} value="date">date</Radio.Button>
            <Radio.Button style={buttonRadio} value="number">number</Radio.Button>
            <Radio.Button style={buttonRadio} value="integer">integer</Radio.Button>
            <Radio.Button style={buttonRadio} value="float">float</Radio.Button>
            <Radio.Button style={buttonRadio} value="url">url</Radio.Button>
            <Radio.Button style={buttonRadio} value="email">email</Radio.Button>
          </Radio.Group>

          </Col>
        </Row>
         
      </div>
    )
  }

  
}