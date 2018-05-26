import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Article from "./Article";
import "./App.css";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <h2 className="site-title">Wiki Wiki Wow Wow</h2>
          <Route path="/article/:title" component={Article} />
        </div>
      </Router>
    );
  }
}

export default App;
