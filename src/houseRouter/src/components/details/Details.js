import React, { Component } from 'react';
import axios from 'axios';
import './Details.css';
import { API_ENDPOINT } from '../../config/constants'

class Details extends Component {
  constructor(props) {
    super(props);
    this.state = {
      origin: '',
      destinations: [],
      optimizedList: [],
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange({ target }) {
    this.setState({
      [target.name]: target.value
    });
  }

  async handleSubmit() {
    try {
      const { data } = await axios.post(API_ENDPOINT, {
        "origin": this.state.origin,
        "destinations": this.state.destinations,
      });
      this.setState({ optimizedList: data })
      this.props.history.push('/results', this.state);
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }

  async componentDidMount() {
    const { id } = JSON.parse(this.props.history.location.state.uploadResponse);
    try {
      const { data } = await axios.get(`${API_ENDPOINT}/destinations?id=${id}`);
      this.setState({ destinations: data });
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }

  render() {
    return (
      <div className="App">
        <div className="Card">
          <div className="Details">
            <div className="Content">
              <div>
                <span className="Title">What is your starting address?</span>
                <input
                  type="text"
                  onChange={this.handleChange}
                  name="origin"
                />
              </div>
              <div>
                <span className="Title">Destinations</span>
                <textarea
                  rows="10"
                  cols="40"
                  name="destinations"
                  onChange={this.handleChange}
                  defaultValue={this.state.destinations}
                />
              </div>
            </div>
            <p></p>
            <p></p>
            <div className="Action">
              <button onClick={this.handleSubmit}>Optimize Routes</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Details;
