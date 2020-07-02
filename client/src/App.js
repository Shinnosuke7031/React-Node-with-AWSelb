import React, { Component } from 'react';
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSubmit: false,
      data: [],
      newName: "",
      newText: ""
    }
    this.getData();
  }

  getData() {
    fetch('/data')
      .then(response => response.json())
      .then(temp => {
        this.setState({
          data: temp.commentInfo
        });
      });
  }

  handleSubmit() {
    if(this.state.isSubmit) {
      this.setState({isSubmit: false});
    } else {
      this.setState({isSubmit: true});
    }
    
    //console.log(this.state.isSubmit);
    return false;
  }

  

  render() {

    let newMessage;
    if (this.state.isSubmit) {
      newMessage = (
        <div className="newMes">
          <p>送信完了!!</p>
          <form onSubmit={()=>this.handleSubmit()}>
            <input type="submit" value="OK" />
          </form>
        </div>
      );
    } else {
      newMessage = (
        <div className="newMes">
          <form onSubmit={()=>this.handleSubmit()}>
            <p style={{fontSize: "20px", textDecoration: "underline"}}>新規コメント</p>
            <p>名前</p>
            <input value="匿名" name={this.state.newName} />
            <p>コメント内容</p>
            <div className="newT">
              <textarea name={this.state.newText} />
              <input type="submit" value="送信" />
            </div>
            
          </form>
        </div>
      );
    }

    return (
      <div className="App">
        <h1>自由に話そう</h1>
        <hr style={{backgroundColor: "black"}}></hr>
        <div className="showCom">
        
        {this.state.data.map((temp) => 
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
          
      <div>
        {newMessage}
      </div>
        
      </div>
    );
  }
}
export default App;