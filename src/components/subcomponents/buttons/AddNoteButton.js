import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class AddNoteButton extends Component {
  render() {
    return (
      <>
        <Link className="link-btn btn" to="/add-note">Add Note</Link>
      </>
    );
  }
}
