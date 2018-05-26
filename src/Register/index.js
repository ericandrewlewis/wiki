import React, { Component } from "react";
import Auth from "../Auth";
import "./style.css";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      email: "",
      name: ""
    };

    this.onInputChange = this.onInputChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  onFormSubmit(evt) {
    evt.preventDefault();
    fetch("/users", {
      method: "POST",
      body: JSON.stringify({
        user: {
          username: this.state.username,
          password: this.state.password,
          email: this.state.email,
          name: this.state.name
        }
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
      <div className="Register">
        <h2 className="title">Register</h2>
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
          <input type="text" name="email" placeholder="email" />
          <label>Name</label>
          <input type="text" name="name" placeholder="name" />
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

export default Register;
