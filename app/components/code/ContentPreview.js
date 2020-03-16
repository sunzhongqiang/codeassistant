import React, { Component } from 'react'
import Highlight from 'react-highlight'
export default class ContentPreview extends Component {
  render () {
    return (
      <div style={this.props.style}>
        <Highlight languages={['java','html','javascript','css']} className='java'>
          {this.props.code}
        </Highlight>
      </div>
    )
  }
}
