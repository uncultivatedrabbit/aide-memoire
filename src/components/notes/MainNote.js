import React, { Component } from "react";

export default class MainNote extends Component {
  renderNote = () => {
    const { notes, match } = this.props;
    const note = notes.find((note) => note.id === match.params.noteId);
    return (
      <>
        {note.name} <br />
        {note.modified} <br />
        {note.content}
      </>
    );
  };
  render() {
    return (
      <div>
        <h4>MainNote</h4>
        {this.renderNote()}
      </div>
    );
  }
}
