import React, { Component } from "react";
import { NavLink } from "react-router-dom";

export default class FolderSidebar extends Component {
  renderFolderSidebar = () => {
    const { folders } = this.props;
    const folderList = folders.map((folder) => (
      <li className="folder-card" key={folder.id}>
        <NavLink to={folder.id}>{folder.name}</NavLink>
      </li>
    ));
    return (
      <>
        <ul>{folderList}</ul>
      </>
    );
  };
  render() {
    return <div>{this.renderFolderSidebar()}</div>;
  }
}
