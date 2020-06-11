import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { NotesContext } from "../../../NotesContext";
import BackButton from "../buttons/BackButton";

// component handles rendering the sidebar UI when user clicks into specific folder
export default class FolderSidebar extends Component {
  // renders the list of folders, while changing the UI of the folder the user
  // clicked inside of to make it clear which folder is being accessed
  renderFolderSidebar = () => {
    return (
      <NotesContext.Consumer>
        {(context) => {
          const { folders } = context;
          const folderList = folders.map((folder) => (   
            <li className="folder-card" key={folder.id}>
              {/* use NavLink instead of Link to take advantage of the 'active' property */}
              <NavLink to={String(folder.id)}>{folder.folder_name}</NavLink>
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
