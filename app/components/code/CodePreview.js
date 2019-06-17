import React, { Component } from 'react'
import Highlight from 'react-highlight'
import CodeSaveWidget from './CodeSaveWidget'
export default class CodePreview extends Component {
  render () {
    return (
      <div>
        <CodeSaveWidget
          code={this.props.code}
          path={this.props.path}
          name={this.props.name}
        />
        <Highlight languages={['java']} className='java'>
          {this.props.code}
        </Highlight>
      </div>
    )
  }
}
