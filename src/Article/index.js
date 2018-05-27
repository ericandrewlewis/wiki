import React, { Component } from "react";
import { schema } from "prosemirror-schema-basic";
import { Node, DOMSerializer } from "prosemirror-model";
import { Link } from "react-router-dom";

import "./style.css";
import api from "../api";

class Article extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: "",
      title: "",
      slug: ""
    };
  }

  fetchArticleData() {
    const { slug } = this.props.match.params;
    api.article.bySlug(slug).then(response => {
      if (response.data.length === 0) {
        console.log("no data");
        return;
      }
      const article = response.data[0];
      const node = Node.fromJSON(
        schema,
        JSON.parse(article.attributes.content)
      );
      const serializer = DOMSerializer.fromSchema(schema);
      const serializedFragment = serializer.serializeFragment(node);
      const div = document.createElement("div");
      div.appendChild(serializedFragment);

      this.setState({
        content: div.innerHTML,
        title: article.attributes.title,
        slug: article.attributes.slug
      });
    });
  }

  componentDidMount() {
    this.fetchArticleData();
  }

  render() {
    const { title, content, slug } = this.state;
    return (
      <div className="Article">
        <h1 className="title">{title}</h1>
        <div dangerouslySetInnerHTML={{ __html: content }} />
        <p>
          <Link to={`/article/${slug}/edit`}>Edit</Link>
        </p>
      </div>
    );
  }
}

export default Article;
