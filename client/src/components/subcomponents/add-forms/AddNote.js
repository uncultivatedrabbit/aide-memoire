import React, { Component } from "react";
import { NotesContext } from "../../../NotesContext";
import { API_ENDPOINT } from "../../../config";
import BackButton from "../buttons/BackButton";

// component handles user adding a note to notes list in DB
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

  // handles verification of note name
  // and ensures user doesn't try to submit
  // an empty note name
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

  // handles verification of note content
  // and ensures user doesn't try to submit
  // empty note content
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

  // listens for user name input and updates state
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
      // passes user name input into validation method
      () => this.handleNameValidation(newNoteName)
    );
  }

  // listens for user content input and updates state
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
      // passes user input into content validation method
      () => this.handleContentValidation(newNoteContent)
    );
  }

  // handles form submission
  handleAddNoteSubmit(e) {
    // prevents page from reloading
    e.preventDefault();
    const dateStamp = new Date();
    const newNoteFolder = e.target.selectedFolder.value;
    const selectedFolderId = this.context.folders.filter(
      (folder) => folder.folder_name === newNoteFolder
    )[0].id;
    // creates note object with data from state
    const note = {
      note_name: this.state.note.name,
      note_content: this.state.note.content,
      folder_id: selectedFolderId,
      note_modified: dateStamp,
    };

    const url = `${API_ENDPOINT}/api/notes`;
    // configures POST request
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
        this.props.history.goBack();
        this.context.addNote(data);
      })
      .catch((err) => console.log(err));
  }
  // renders the folder options
  // so the user can save note inside existing folder
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
                {folder.folder_name
                  ? folder.folder_name.charAt(0).toUpperCase() +
                    folder.folder_name.slice(1)
                  : ""}
              </option>
            );
          })
        }
      </NotesContext.Consumer>
    );
  };
  render() {
    return (
      <div className="add-form-container">
        <div className="add-form-header">
          <BackButton />
          <h2>Create Note:</h2>
        </div>
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
            aria-required="true"
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
            aria-required="true"
          />
          {this.state.contentErrorMessage && (
            <p className="error-msg">{this.state.contentErrorMessage}</p>
          )}
          <label className="select-folder-label" htmlFor="select-folder">
            Folder
          </label>
          <select name="selectedFolder" id="select-folder" aria-required="true">
            {this.renderOptions()}
          </select>
          <button
            tabIndex="1"
            // disables the submit button if the user hasn't inputted anything in the name or content
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
