import React, { Component } from "react";

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
    <li key={note.id}>
      {note.name} <br/>
      {note.modified}
    </li>
    ));
  };
  render() {
    return (
      <div>
        <h3>NOTES:</h3>
        <ul>{this.renderFolderContents()}</ul>
      </div>
    );
  }
}
