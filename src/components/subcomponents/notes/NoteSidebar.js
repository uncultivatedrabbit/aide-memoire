import React, { Component } from "react";
import { NotesContext } from "../../../NotesContext";
import BackButton from "../buttons/BackButton";


// renders sidebar of specific note when user clicks into it
export default class NoteSidebar extends Component {
  // renders the sidebar UI, which contains the name of the folder the specific note is inside of in the DB
  renderNoteSidebar = () => {
    return (
      <NotesContext.Consumer>
        {(context) => {
          const { folders, notes } = context;
          const { noteId } = this.props.match.params;
          const note = notes.find((note) => note.id === noteId) || {};
          const folderContainingNote = folders.find(
            (folder) => folder.id === note.folderId
          );
          return (
            <React.Fragment>
              <h3>{folderContainingNote ? folderContainingNote.name : ""}</h3>
            </React.Fragment>
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
          <h2>Folder</h2>
        </div>
        <div className="folder-name-vert">{this.renderNoteSidebar()}</div>
      </>
    );
  }
}
