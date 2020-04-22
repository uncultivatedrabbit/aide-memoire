import React, { Component } from "react";
import { Link } from "react-router-dom";
import { NotesContext } from "../../../NotesContext";
import AddNoteButton from "../buttons/AddNoteButton";

export default class MainNotesList extends Component {
  renderNotesList = () => {
    return (
      <NotesContext.Consumer>
        {(context) =>
          context.notes.map((note) => (
            <li className="note-card" key={note.id}>
              <Link to={`/note/${note.id}`}>
                {note.name.charAt(0).toUpperCase() + note.name.slice(1)} <br />
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
        <AddNoteButton />
      </div>
    );
  }
}
