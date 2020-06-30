import React, { Component } from 'react';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      flower: []
    }
    this.getFlower();
  }
  getFlower() {
    fetch('/flower')
      .then(response => response.json())
      .then(data => {
        this.setState({
          flower: data.commentInfo
        });
      });
  }

  render() {
    return (
      <div className="App">
        {this.state.flower.map((temp) => 
          <div>
            <p>{temp.name}</p>
            <p>{temp.text}</p>
          </div>
        )}
      </div>
    );
  }
}
export default App;