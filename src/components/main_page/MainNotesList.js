import React, { Component } from "react";
import { Link } from "react-router-dom";
import { NotesContext } from "../../NotesContext";

export default class MainNotesList extends Component {
  renderNotesList = () => {
    return (
      <NotesContext.Consumer>
        {(context) =>
          context.notes.map((note) => (
            <li className="note-card" key={note.id}>
              <Link to={`/note/${note.id}`}>
                {note.name} <br />
                {new Date(note.modified).getMonth() + 1}/
                {new Date(note.modified).getDate()}/
                {new Date(note.modified).getFullYear()}
              </Link>
            </li>
          ))
        }
      </NotesContext.Consumer>
    );
  };
  render() {
    return (
      <div>
        <h2>Notes</h2>
        <ul className="notes-list">{this.renderNotesList()}</ul>
        <button className="btn">Add Note</button>
      </div>
    );
  }
}
