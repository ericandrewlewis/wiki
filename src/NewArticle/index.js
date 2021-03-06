import React, { Component } from "react";
import { schema } from "prosemirror-schema-basic";
import { EditorState } from "prosemirror-state";
import { EditorView } from "prosemirror-view";
import { keymap } from "prosemirror-keymap";
import { toggleMark } from "prosemirror-commands";

import { exampleSetup, buildMenuItems } from "prosemirror-example-setup";
import "prosemirror-menu/style/menu.css";
import { Redirect } from "react-router";
import { openPrompt, TextField } from "./prompt";
import "./style.css";
import api from "../api";

class NewArticle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      article: {},
      content: "",
      title: "",
      created: false
    };
    this.titleRef = React.createRef();

    this.editorRef = React.createRef();
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
  }

  componentDidMount() {
    this.bootstrapEditor();
  }

  bootstrapEditor() {
    let state = EditorState.create({
      schema,
      plugins: [
        keymap({
          "Mod-k": (state, dispatch, view) => {
            openPrompt({
              title: "Create a link",
              fields: {
                href: new TextField({
                  label: "Link target",
                  required: true
                }),
                title: new TextField({ label: "Title" })
              },
              callback(attrs) {
                toggleMark(schema.marks.link, attrs)(view.state, view.dispatch);
                view.focus();
              }
            });
          }
        })
      ].concat(exampleSetup({ schema, history: true }))
    });

    this.titleRef.current.focus();
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
      .create({
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
            ref={this.titleRef}
          />
          <div className="editor" ref={this.editorRef} />
          <button type="submit">Save</button>
        </form>
      </div>
    );
  }
}

export default NewArticle;
