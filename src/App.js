import React, { Component } from "react";
import "./App.css";
import Article from "./Article";

class App extends Component {
  render() {
    return (
      <div className="App">
        <h2 className="site-title">Wiki Wiki Wow Wow</h2>
        <Article />
      </div>
    );
  }
}

export default App;
