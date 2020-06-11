import React, { Component } from "react";
import { NotesContext } from "../../../NotesContext";
import { API_ENDPOINT } from "../../../config";

// renders NOTE component inside the MAIN component when user clicks into a specific note
export default class MainNote extends Component {
  static contextType = NotesContext;

  // handles when user deletes the specific note
  handleClickDelete = (e) => {
    e.preventDefault();
    const { noteId } = this.props.match.params;
    const deletedNoteUrl = `${API_ENDPOINT}/api/notes/${noteId}`;
    const header = {
      method: "DELETE",
      headers: { "content-type": "application/json" },
    };
    fetch(deletedNoteUrl, header)
      .then(async (res) => {
        if (res.ok) {
          return res.text();
        } else {
          const e = await res.json();
          return await Promise.reject(e);
        }
      })
      .then(() => {
        this.props.history.goBack();
        this.context.deleteNote(noteId);
      })
      .catch((err) => console.log(err));
  };

  // handles rendering the UI of the specific note
  renderNote = () => {
    return (
      <NotesContext.Consumer>
        {(context) => {
          const { notes } = context;
          const { noteId } = this.props.match.params;
          const note = notes.find((note) => note.id === +(noteId)) || {};
          return (
            <>
              <h2>
                {note.note_name
                  ? note.note_name.charAt(0).toUpperCase() + note.note_name.slice(1)
                  : ""}
              </h2>
              {new Date(note.date_modified).getMonth() + 1}/
              {new Date(note.date_modified).getDate()}/
              {new Date(note.date_modified).getFullYear()}
              <br />
              <p className="note-detail">{note.note_content}</p>
              <button
                onClick={this.handleClickDelete}
                className={`btn note-btn`}>
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
