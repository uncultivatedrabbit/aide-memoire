import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { NotesContext } from "../../../NotesContext";
import BackButton from "../buttons/BackButton";

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
              <ul className="folder-list">{folderList}</ul>
            </>
          );
        }}
      </NotesContext.Consumer>
    );
  };
  render() {
    return (
      <>
        <div className="sidebar-header-container">
          <BackButton />
          <h2>Folders</h2>
        </div>
        {this.renderFolderSidebar()}
      </>
    );
  }
}
