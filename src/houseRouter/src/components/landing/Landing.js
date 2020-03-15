import React, { Component } from 'react';
import './Landing.css';
import Upload from '../upload/Upload'

class Landing extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div className="App">
        <div className="Card">
          <Upload history={this.props.history}/>
        </div>
      </div>
    )
  }
}

export default Landing;
