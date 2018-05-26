import React, { Component } from "react";
import "./style.css";
import api from "../api";

const text = `<p>Brian Eno created Oblique Strategies, a set of cards with quixotic suggestions for getting through artist's block.</p>`;

class Article extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: "",
      title: ""
    };
  }

  componentDidMount() {
    const { slug } = this.props.match.params;
    api.article.bySlug(slug).then(response => {
      if (response.data.length === 0) {
        console.log("no data");
        return;
      }
      const article = response.data[0];
      this.setState({
        content: article.attributes["content"],
        title: article.attributes["title"]
      });
    });
  }

  render() {
    const { title, content } = this.state;
    return (
      <div className="Article">
        <h1 className="title">{title}</h1>
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </div>
    );
  }
}

export default Article;
