import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class MainSidebar extends Component {
  renderFolders = () => {
    return this.props.folders.map((folder) => (
      <li className="folder-card" key={folder.id}>
        <Link to={`/folder/${folder.id}`}>{folder.name}</Link>
      </li>
    ));
  };
  render() {
    return (
      <div>
        <ul>{this.renderFolders()}</ul>
        <button className="btn">Add Folder</button>
      </div>
    );
  }
}
