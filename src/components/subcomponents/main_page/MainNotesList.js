import React, { Component } from "react";
import { Link } from "react-router-dom";
import { NotesContext } from "../../../NotesContext";
import AddNoteButton from "../buttons/AddNoteButton";


// component for the MAIN notes list found when user goes to '/' endpoint
export default class MainNotesList extends Component {

  // function to propogate the list of notes from the DB and append them
  // to the list, making each a link with the individual ID of the note
  renderNotesList = () => {
    return (
      // Context consumer allows context data from app.js to be passed as props without
      // prop drilling
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
