import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class MainFolder extends Component {
  renderFolderContents = () => {
    const { folders, notes, match } = this.props;
    const folder = folders.find(
      (folder) => folder.id === match.params.folderId
    );
    const notesInsideFolder = notes.filter(
      (note) => note.folderId === folder.id
    );
    return notesInsideFolder.map((note) => (
      <li className="note-card" key={note.id}>
        <Link to={`/note/${note.id}`}>
          {note.name} <br />
          {new Date(note.modified).getMonth() + 1}/
          {new Date(note.modified).getDate()}/
          {new Date(note.modified).getFullYear()}
        </Link>
      </li>
    ));
  };
  render() {
    return (
      <div>
        <h3>NOTES:</h3>
        <ul className="notes-list">{this.renderFolderContents()}</ul>
      </div>
    );
  }
}
