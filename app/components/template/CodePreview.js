import React, { Component } from 'react'
import Highlight from 'react-highlight'
import eventbus from '../../eventbus/EventBus'
import EventType from '../../eventbus/EventTyp'

export default class CodePreview extends Component {
  render () {
    return (
      <Highlight languages={['java']} className='java'>
        {this.props.code}
      </Highlight>
    )
  }
}
