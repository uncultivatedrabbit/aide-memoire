import React, { Component } from "react";
import { NotesContext } from "../../NotesContext";

export default class MainNote extends Component {
  static contextType = NotesContext;

  handleClickDelete = (e) => {
    e.preventDefault();
    const { noteId } = this.props.match.params;
    const deletedNoteUrl = `http://localhost:9090/notes/${noteId}`;
    const header = {
      method: "DELETE",
      headers: { "content-type": "application/json" },
    };
    fetch(deletedNoteUrl, header)
      .then(async (res) => {
        if (res.ok) {
          window.location = "http://localhost:3000/"
          return res.json();
        } else {
          const e = await res.json();
          return await Promise.reject(e);
        }
      })
      .then(() => {
        this.context.deleteNote(noteId);
      })
      .catch((err) => console.log(err));
  };

  renderNote = () => {
    return (
      <NotesContext.Consumer>
        {(context) => {
          const { notes } = context;
          const { noteId } = this.props.match.params;
          const note = notes.find((note) => note.id === noteId) || {};
          return (
            <>
              <h2>{note.name}</h2>
              {new Date(note.modified).getMonth() + 1}/
              {new Date(note.modified).getDate()}/
              {new Date(note.modified).getFullYear()}
              <br />
              <p className="note-detail">{note.content}</p>
              <button
                onClick={this.handleClickDelete}
                className={`btn ${note.name}-btn`}>
                Delete Note
              </button>
            </>
          );
        }}
      </NotesContext.Consumer>
    );
  };
  render() {
    return <div className="note-content">{this.renderNote()}</div>;
  }
}
