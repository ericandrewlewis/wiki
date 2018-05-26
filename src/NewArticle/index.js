import React, { Component } from "react";
// import "./style.css";
import api from "../api";

class NewArticle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: "",
      title: ""
    };
  }

  render() {
    const { title, content } = this.state;
    return (
      <div className="NewArticle">
        <input type="text" name="title" />
      </div>
    );
  }
}

export default NewArticle;
