import React, { Component } from "react";
import { Route } from "react-router-dom";
import MainSidebar from "./MainSidebar";
import FolderSidebar from "./folders/FolderSidebar";
import NoteSidebar from "./notes/NoteSidebar";

export default class Sidebar extends Component {
  render() {
    const { folders, notes } = this.props;
    return (
      <div>
        <h2>Folders</h2>
        <Route
          exact
          path="/"
          render={(props) => (
            <MainSidebar folders={folders} notes={notes} {...props} />
          )}
        />
        <Route
          path="/note/:noteId"
          render={(props) => (
            <NoteSidebar folders={folders} notes={notes} {...props} />
          )}
        />
        <Route
          path="/folder/:folderId"
          render={(props) => (
            <FolderSidebar folders={folders} notes={notes} {...props} />
          )}
        />
      </div>
    );
  }
}
