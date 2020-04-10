import React, { Component } from "react";
import {Link} from 'react-router-dom'

export default class MainNotesList extends Component {
  renderNotesList = () => {
    const { notes } = this.props;
    return notes.map(note => (
      <li className="note-card" key={note.id}>
        <Link to={`/note/${note.id}`}>
        {note.name}
        </Link>
      </li>
    ))
  };
  render() {
    return (
      <div>
        <h2>Notes</h2>
        <ul className="notes-list">
          {this.renderNotesList()}
        </ul>
        <button>Add Note</button>
      </div>
    );
  }
}
