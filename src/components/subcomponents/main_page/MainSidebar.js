import React, { Component } from "react";
import { Link } from "react-router-dom";
import { NotesContext } from "../../../NotesContext";
import AddFolderButton from '../buttons/AddFolderButton'


export default class MainSidebar extends Component {
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
