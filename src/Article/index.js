import React, { Component } from "react";
import "./style.css";

const text = `<p>Brian Eno created Oblique Strategies, a set of cards with quixotic suggestions for getting through artist's block.</p>`;

class Article extends Component {
  render() {
    return (
      <div className="Article">
        <h1 className="title">Brian Eno</h1>
        <div dangerouslySetInnerHTML={{ __html: text }} />
      </div>
    );
  }
}

export default Article;
