import React, { Component } from 'react';
import "./App.css";

let dataLastID=0;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSubmit: false,
      data: [],
      originData: [],
      newName: "匿名",
      newText: " ",
    }
    this.initialGetData();
    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangeText = this.handleChangeText.bind(this);
  }

  initialGetData() {
    fetch('/data')
      .then(response => response.json())
      .then(temp => {
        this.setState({
          data: temp,
          originData: temp
        });
        dataLastID=this.state.data.length;
      });
  }

  getData() {
    fetch('/data')
      .then(response => response.json())
      .then(temp => {
        this.setState({
          data: temp
        });
        dataLastID=this.state.data.length;
      });
  }

  handleChangeName(event) {
    this.setState({newName: event.target.value});
  }

  handleChangeText(event) {
    this.setState({newText: event.target.value});
  }

  handleSubmit() {
    if(this.state.isSubmit) {
      this.setState({isSubmit: false});
    } else {
      this.addComment();
      this.setState({isSubmit: true});
    }
    //console.log(this.state.isSubmit);
    return false;
  }

  addComment() {
    const newData = [...this.state.data, {id: dataLastID + 1, name: this.state.newName, text: this.state.newText}];
    console.log(newData);
    this.setState({data: newData});
  }

  componentDidUpdate() {
    console.log(this.state.newName);
    console.log(this.state.newText);
    //this.getData();
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
            <input type="text" onChange={this.handleChangeName}/>
            <p>コメント内容</p>
            <div className="newT">
              <textarea onChange={this.handleChangeText} />
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
        <ul className="showCom">
        
        {this.state.data.map((temp) => 
          <li key={temp.id} style={{listStyle: "none"}}>
            <div className="showName">
              <p>{temp.name}</p>
            </div>
            <div className="showText">
              <p>{temp.text}</p>
            </div>
            <hr></hr>
          </li>
        )}
        <hr className="bottomLine"></hr>
        </ul>
          
      <div>
        {newMessage}
      </div>
        
      </div>
    );
  }
}
export default App;