import React, { Component } from "react";
import Auth from "../Auth";
import "./style.css";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };

    this.onInputChange = this.onInputChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  onFormSubmit(evt) {
    evt.preventDefault();
    fetch("/login", {
      method: "POST",
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password
      }),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(response => {
        if (response.token) {
          Auth.setToken(response.token);
        }
      })
      .then(() => {
        this.props.onUserLoggedIn();
      });
  }

  onInputChange(evt) {
    const value = evt.target.value;
    const fieldName = evt.target.getAttribute("name");
    this.setState({
      [fieldName]: value
    });
  }

  render() {
    return (
      <div className="Login">
        <h2 className="title">Login</h2>
        <form
          className="form"
          onChange={this.onInputChange}
          onSubmit={this.onFormSubmit}
        >
          <label>Username</label>
          <input type="text" name="username" placeholder="username" />
          <label>Password</label>
          <input type="text" name="password" placeholder="password" />
          <label>Email</label>
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

export default Login;
