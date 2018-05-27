import React, { Component } from "react";
import Auth from "../Auth";

class App extends Component {
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
  }

  logout() {
    fetch("/logout", {
      method: "DELETE",
      headers: {
        Authorization: `Token ${Auth.getToken()}`,
        token: Auth.getToken()
      }
    })
      .then(res => {
        Auth.deauthenticateUser();
        this.setState({
          auth: Auth.isUserAuthenticated(),
          loginUserName: "",
          loginUserPassword: ""
        });
      })
      .then(() => {
        this.props.onUserLoggedOut();
      });
  }

  render() {
    return (
      <form>
        <button onClick={this.logout}>Logout</button>
      </form>
    );
  }
}

export default App;
