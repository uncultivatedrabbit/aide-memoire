import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class AddFolderButton extends Component {
  render() {
    return (
      <div>
        <Link to={`add-folder`} className="btn link-btn add-folder-btn">Add Folder</Link>
      </div>
    );
  }
}
