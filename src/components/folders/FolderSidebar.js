import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { NotesContext } from "../../NotesContext";

export default class FolderSidebar extends Component {
  renderFolderSidebar = () => {
    return (
      <NotesContext.Consumer>
        {(context) => {
          const { folders } = context;
          const folderList = folders.map((folder) => (
            <li className="folder-card" key={folder.id}>
              <NavLink to={folder.id}>{folder.name}</NavLink>
            </li>
          ));
          return (
            <>
              <ul>{folderList}</ul>
            </>
          );
        }}
      </NotesContext.Consumer>
    );
  };
  render() {
    return <div>{this.renderFolderSidebar()}</div>;
  }
}
