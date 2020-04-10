import React, { Component } from 'react'

export default class NoteSidebar extends Component {
  renderNoteSidebar = () => {
    const {folders, notes, match} = this.props
    const note = notes.find(note => note.id === match.params.noteId)
    const folderContainingNote = folders.find(folder => folder.id === note.folderId).name
    return (
      <>
      {folderContainingNote}
      </>
    )
  }
  render() {
    return (
      <div>
        <h4>NOTE SIDEBAR</h4>
        {this.renderNoteSidebar()}
      </div>
    )
  }
}
