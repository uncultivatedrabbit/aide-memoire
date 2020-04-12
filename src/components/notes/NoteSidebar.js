import React, { Component } from 'react'

export default class NoteSidebar extends Component {
  renderNoteSidebar = () => {
    const {folders, notes, match} = this.props
    const note = notes.find(note => note.id === match.params.noteId)
    const folderContainingNote = folders.find(folder => folder.id === note.folderId).name
    return (
      <React.Fragment>
      <h3>{folderContainingNote}</h3>
      </React.Fragment>
    )
  }
  render() {
    return (
      <div className="folder-name-vert">
        {this.renderNoteSidebar()}
      </div>
    )
  }
}
