import React, { Component } from 'react';
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      flower: []
    }
    this.getData();
  }
  getData() {
    fetch('/data')
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
        <h1>自由に話そう</h1>
        <hr style={{backgroundColor: "black"}}></hr>
        <div className="showCom">
        
        {this.state.flower.map((temp) => 
          <div>
            <div className="showName">
              <p>{temp.name}</p>
            </div>
            <div className="showText">
              <p>{temp.text}</p>
            </div>
            <hr></hr>
          </div>
        )}
        <hr className="bottomLine"></hr>
        </div>
        
      </div>
    );
  }
}
export default App;