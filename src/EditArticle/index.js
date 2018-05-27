import React, { Component } from "react";
import { schema } from "prosemirror-schema-basic";
import { EditorState } from "prosemirror-state";
import { EditorView } from "prosemirror-view";
import { baseKeymap } from "prosemirror-commands";
import { undo, redo, history } from "prosemirror-history";
import { keymap } from "prosemirror-keymap";
import { menuBar } from "prosemirror-menu";
import "prosemirror-menu/style/menu.css";
import { Node } from "prosemirror-model";

import { Redirect } from "react-router";

import { buildMenuItems } from "./buildMenuItems";
import "./style.css";
import api from "../api";

class NewArticle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      article: {},
      content: "",
      title: "",
      edited: false
    };
    this.editorRef = React.createRef();
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
  }

  componentDidMount() {
    const { slug } = this.props.match.params;

    api.article.bySlug(slug).then(response => {
      const article = response.data[0];

      const doc = JSON.parse(article.attributes.content);
      this.setState({
        article: article,
        title: article.attributes.title
      });
      this.bootstrapEditor(doc);
    });
  }

  bootstrapEditor(doc) {
    let state = EditorState.create({
      doc: Node.fromJSON(schema, doc),
      schema,
      plugins: [
        history(),
        keymap({ "Mod-z": undo, "Mod-y": redo }),
        keymap(baseKeymap),
        menuBar({
          floating: true,
          content: buildMenuItems(schema).fullMenu
        })
      ]
    });
    this.setState({
      content: state.toJSON()
    });
    let view = new EditorView(this.editorRef.current, {
      state,
      dispatchTransaction: transaction => {
        let newState = view.state.apply(transaction);
        view.updateState(newState);
        this.setState({
          content: newState.toJSON()
        });
      }
    });
  }
  onFormSubmit(evt) {
    evt.preventDefault();
    api.article
      .update({
        id: this.state.article.id,
        title: this.state.title,
        content: this.state.content.doc
      })
      .then(response => {
        const article = response.data;
        this.setState({
          created: true,
          article: article
        });
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
    if (this.state.created) {
      return <Redirect to={`/article/${this.state.article.attributes.slug}`} />;
    }
    return (
      <div className="NewArticle">
        <form onSubmit={this.onFormSubmit} onChange={this.onInputChange}>
          <input
            type="text"
            name="title"
            className="title"
            value={this.state.title}
          />
          <div className="editor" ref={this.editorRef} />
          <button type="submit">Save</button>
        </form>
      </div>
    );
  }
}

export default NewArticle;
