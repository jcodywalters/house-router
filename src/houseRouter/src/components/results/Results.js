import React, { Component } from 'react'

import './Results.css'

class Results extends Component {
  constructor(props) {
    super(props)
    this.state = {
      optimizedList: props.history.location.state.optimizedList,
      staticMapQuery: '',
      googleMapsQuery: '',
      googleApiKey: '<GOOGLE_API_KEY>',
      googleStaticMapUrlBase: 'https://maps.googleapis.com/maps/api/staticmap',
      googleMapsUrlBase: 'https://www.google.com/maps/dir'
    };
    this.renderOptimizedList = this.renderOptimizedList.bind(this);
  }

  componentDidMount() {
    this.formatGoogleQueries(this.state.optimizedList);
  }

  onClickAction() {
    window.open(`${this.state.googleMapsUrlBase}/${this.state.googleMapsQuery}`, "_blank");
  }

  renderOptimizedList() {
    return this.state.optimizedList.map(item => {
      return (
        <tr className="Filename" key={item}>
          <th>{item}</th>
        </tr>
      )
    })
  }

  renderMapImage() {
    // needs to be api call on server side
    return `${this.state.googleStaticMapUrlBase}?size=600x300&maptype=roadmap&markers=${this.state.staticMapQuery}&key=${this.state.googleApiKey}`
  }

  formatGoogleQueries(destinations) {
    let staticMapQuery = '';
    let googleMapsQuery = '';
    for (const destination of destinations) {
      if (!(destination)) { continue; }
      staticMapQuery = staticMapQuery.concat(destination.replace(/\s/g, '+').replace('#', 'APT+') + '|')
      googleMapsQuery = googleMapsQuery.concat(destination.replace(/\s/g, '+').replace('#', 'APT+') + '/')
    }
    this.setState({ staticMapQuery, googleMapsQuery });
  }


  render() {
    return (
      <div className="App">
        <div className="Card">
          <div className="Results">
            <span className="Title">Optimized Results</span>
            <div className="Content">
              <div>
                <table>
                  <tbody>
                    {this.renderOptimizedList()}
                  </tbody>
                </table>
              </div>
              <div>
                <img
                  src={this.renderMapImage()}
                  alt="new"
                />
                <button onClick={() => this.onClickAction()}>
                  View on Google Maps
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Results;
