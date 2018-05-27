import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import Register from "./Register";
import LogoutButton from "./LogoutButton";
import Login from "./Login";

import NewArticle from "./NewArticle";
import Article from "./Article";
import Auth from "./Auth";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      auth: Auth.isUserAuthenticated()
    };

    this.onUserLoggedIn = this.onUserLoggedIn.bind(this);
    this.onUserLoggedOut = this.onUserLoggedOut.bind(this);
  }

  onUserLoggedOut() {
    this.setState({
      auth: false
    });
  }

  onUserLoggedIn() {
    this.setState({
      auth: Auth.isUserAuthenticated()
    });
  }

  render() {
    if (!this.state.auth) {
      return (
        <div className="App">
          <h2 className="site-title">Wiki Wiki Wow Wow</h2>
          <Register onUserLoggedIn={this.onUserLoggedIn} />
          <Login onUserLoggedIn={this.onUserLoggedIn} />
        </div>
      );
    }
    return (
      <Router>
        <div className="App">
          <h2 className="site-title">Wiki Wiki Wow Wow</h2>
          <nav>
            <Link to="article/new">New</Link>
            <Link to="article">All Pages</Link>
            <LogoutButton onUserLoggedOut={this.onUserLoggedOut} />
          </nav>
          <Route path="/article/new" component={NewArticle} />
          <Route
            path="/article/:slug"
            render={props => {
              if (props.match.params.slug === "new") {
                return null;
              }
              return <Article match={props.match} />;
            }}
          />
        </div>
      </Router>
    );
  }
}

export default App;
