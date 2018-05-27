import React, { Component } from "react";
import { Link } from "react-router-dom";
import { schema } from "prosemirror-schema-basic";
import { Node, DOMSerializer } from "prosemirror-model";

import "./style.css";
import api from "../api";

class AllArticles extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: []
    };
  }

  fetchAllArticlesData() {
    const { slug } = this.props.match.params;
    api.article.all().then(response => {
      this.setState({
        articles: response.data
      });
    });
  }

  componentDidMount() {
    this.fetchAllArticlesData();
  }

  render() {
    const { articles } = this.state;
    return (
      <div className="AllArticles">
        <h1 className="title">All Articles</h1>
        {articles.map(article => (
          <p>
            <Link to={`article/${article.attributes.slug}`}>
              {article.attributes.title}
            </Link>
          </p>
        ))}
      </div>
    );
  }
}

export default AllArticles;
