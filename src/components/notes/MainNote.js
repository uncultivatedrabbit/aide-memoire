import React, { Component } from "react";

export default class MainNote extends Component {
  renderNote = () => {
    const { notes, match } = this.props;
    const note = notes.find((note) => note.id === match.params.noteId);
    return (
      <>
        <h2>{note.name}</h2>
        {new Date(note.modified).getMonth() + 1}/
        {new Date(note.modified).getDate()}/
        {new Date(note.modified).getFullYear()}
        <br />
        <p className="note-detail">{note.content}</p>
      </>
    );
  };
  render() {
    return <div className="note-content">{this.renderNote()}</div>;
  }
}
