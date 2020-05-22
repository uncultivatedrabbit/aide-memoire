import React, { Component } from "react";
import { Link } from "react-router-dom";
import { NotesContext } from "../../../NotesContext";
import AddFolderButton from '../buttons/AddFolderButton'

// component that renders the folders on the sidebar when user goes to '/' endpoint
export default class MainSidebar extends Component {
  // handles propogating folders from DB and appending them to the list 
  // and making each a link using the custom folder id
  renderFolders = () => {
    return (
      <NotesContext.Consumer>
        {(context) =>
          context.folders.map((folder) => (
            <li className="folder-card" key={folder.id}>
              <Link to={`/folder/${folder.id}`}>{folder.name}</Link>
            </li>
          ))
        }
      </NotesContext.Consumer>
    );
  };
  render() {
    return (
      <div>
        <h2>Folders</h2>
        <ul>{this.renderFolders()}</ul>
        <AddFolderButton/>
      </div>
    );
  }
}
