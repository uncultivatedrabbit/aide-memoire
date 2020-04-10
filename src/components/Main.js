import React, { Component } from "react";
import { Route } from "react-router-dom";
import MainNotesList from "./notes/MainNotesList";
import MainNote from "./notes/MainNote";
import MainFolder from "./folders/MainFolder";

export default class Main extends Component {
  render() {
    const { folders, notes } = this.props;
    return (
      <>
        <Route
          exact
          path="/"
          render={(props) => (
            <MainNotesList folders={folders} notes={notes} {...props} />
          )}
        />
        <Route
          path="/folder/:folderId"
          render={(props) => (
            <MainFolder {...props} notes={notes} folders={folders} />
          )}
        />
        <Route
          path="/note/:noteId"
          render={(props) => (
            <MainNote {...props} notes={notes} folders={folders} />
          )}
        />
      </>
    );
  }
}
