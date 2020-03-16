import React, { Component } from 'react';
import axios from 'axios';
import './Details.css';

class App extends Component {
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
    const { data } = await axios.post('http://localhost:3000/house-router-dev/v1', {
      "origin": this.state.origin,
      "destinations": this.state.destinations.split(';'),
    });
    this.setState({ optimizedList: data })
    console.log('!! result =>  ', data, '!!');
  }

  componentDidMount() {
    console.log(this.props)
    this.setState({destinations: ['15146 65th Ave S']})
    // const { data } = await axios.get()
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>House Router</h1>
          <p>What is start address?</p>
          <input
            type="text"
            onChange={this.handleChange}
            name="origin"
            defaultValue="<Enter Starting Address>"
          />
          <p>Add your list of addresses</p>
          <textarea
            rows="20"
            cols="35"
            name="destinations"
            onChange={this.handleChange}
            // defaultValue="15146 65th Ave S, Tukwila, WA 98188, USA;15146 65th Ave S, Tukwila, WA 98188, USA;15210 Macadam Rd S APT D103, Tukwila, WA 98188, USA"
            defaultValue={this.state.destinations}
          />
          <input type="submit" value="Optimize Routes!" size="50" onClick={this.handleSubmit}></input>
          <p></p>
          <textarea
            rows="10"
            cols="50"
            name="result"
            readOnly={true}
            value={this.state.optimizedList}
          />
          {/* <div>{this.state.optimizedList}</div> */}
        </header>
      </div>
    );
  }
}

export default App;
