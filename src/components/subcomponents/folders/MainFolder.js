import React, { Component } from "react";
import { Link } from "react-router-dom";
import { NotesContext } from "../../../NotesContext";

// component renders the main UI of the list of notes inside the folder the user has clicked on
export default class MainFolder extends Component {

  // handles rendering the specific list of notes inside each folder
  // and appends them to a link that allows the user to click into each
  // specific note
  renderFolderContents = () => {
    return (
      <NotesContext.Consumer>
        {(context) => {
          const { folders, notes } = context;
          const { folderId } = this.props.match.params;
          const folder = folders.find((folder) => folder.id === folderId) || {};
          const notesInsideFolder = notes.filter(
            (note) => note.folderId === folder.id
          );
          return notesInsideFolder.map((note) => (
            <li className="note-card" key={note.id}>
              <Link to={`/note/${note.id}`}>
                {note.name
                  ? note.name.charAt(0).toUpperCase() + note.name.slice(1)
                  : ""}{" "}
                <br />
                {new Date(note.modified).getMonth() + 1}/
                {new Date(note.modified).getDate()}/
                {new Date(note.modified).getFullYear()}
              </Link>
            </li>
          ));
        }}
      </NotesContext.Consumer>
    );
  };
  render() {
    return (
      <div>
        <h2>Notes</h2>
        <ul className="notes-list">{this.renderFolderContents()}</ul>
      </div>
    );
  }
}
