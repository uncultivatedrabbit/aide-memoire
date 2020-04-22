import React, { Component } from "react";
import { NotesContext } from "../../../NotesContext";

export default class AddNote extends Component {
  state = {
    note: {
      name: "",
      content: "",
      nameTouched: false,
      contentTouched: false,
    },
    nameErrorMessage: "",
    contentErrorMessage: "",
  };
  static contextType = NotesContext;

  handleNameValidation(input) {
    if (input.length < 1) {
      this.setState({
        note: {
          ...this.state.note,
          nameTouched: false,
        },
        nameErrorMessage: "Name must not be empty.",
      });
    }
  }

  handleContentValidation(input) {
    if (input.length < 1) {
      this.setState({
        note: {
          ...this.state.note,
          contentTouched: false,
        },
        contentErrorMessage: "Content must not be empty.",
      });
    }
  }

  handleNameChange(e) {
    const newNoteName = e.target.value;
    this.setState(
      {
        note: {
          ...this.state.note,
          nameTouched: true,
          name: newNoteName,
        },
        nameErrorMessage: "",
      },
      () => this.handleNameValidation(newNoteName)
    );
  }

  handleContentChange(e) {
    const newNoteContent = e.target.value;
    this.setState(
      {
        note: {
          ...this.state.note,
          contentTouched: true,
          content: newNoteContent,
        },
        contentErrorMessage: "",
      },
      () => this.handleContentValidation(newNoteContent)
    );
  }

  handleAddNoteSubmit(e) {
    e.preventDefault();
    const dateStamp = new Date();
    const newNoteFolder = e.target.selectedFolder.value;
    const selectedFolderId = this.context.folders.filter(
      (folder) => folder.name === newNoteFolder
    )[0].id;

    const note = {
      name: this.state.note.name,
      content: this.state.note.content,
      folderId: selectedFolderId,
      modified: dateStamp,
    };

    const url = "http://localhost:9090/notes";
    const headers = {
      method: "POST",
      body: JSON.stringify(note),
      headers: {
        "content-type": "application/json",
      },
    };
    fetch(url, headers)
      .then(async (res) => {
        if (!res.ok) {
          const e = await res.json();
          return await Promise.reject(e);
        }
        return res.json();
      })
      .then((data) => {
        this.context.addNote(data);
      })
      .catch((err) => console.log(err));
  }

  renderOptions = () => {
    return (
      <NotesContext.Consumer>
        {(context) =>
          context.folders.map((folder) => {
            return (
              <option
                value={folder.name}
                className="folder-option"
                key={folder.id}>
                {folder.name}
              </option>
            );
          })
        }
      </NotesContext.Consumer>
    );
  };
  render() {
    return (
      <div>
        <h2>Create Note:</h2>
        <form
          id="note-form"
          className="add-form"
          onSubmit={(e) => this.handleAddNoteSubmit(e)}>
          <label htmlFor="add-note-name">Name</label>
          <input
            onChange={(e) => this.handleNameChange(e)}
            id="add-note-name"
            name="noteName"
            type="text"
          />
          {this.state.nameErrorMessage && (
            <p className="error-msg">{this.state.nameErrorMessage}</p>
          )}
          <label htmlFor="add-note-content">Content</label>
          <textarea
            onChange={(e) => this.handleContentChange(e)}
            className="form-textarea"
            name="noteContent"
            id="add-note-content"
          />
          {this.state.contentErrorMessage && (
            <p className="error-msg">{this.state.contentErrorMessage}</p>
          )}
          <label className="select-folder-label" htmlFor="select-folder">
            Folder
          </label>
          <select name="selectedFolder" id="select-folder">
            {this.renderOptions()}
          </select>
          <button
            disabled={
              !this.state.note.contentTouched || !this.state.note.nameTouched
            }
            className="btn form-btn add-note-btn"
            type="submit">
            <i className="fas fa-plus"></i>
            Note
          </button>
        </form>
      </div>
    );
  }
}
