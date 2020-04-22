import React, { Component } from "react";
import { NotesContext } from "../../../NotesContext";

export default class AddFolder extends Component {
  static contextType = NotesContext;
  state = {
    folder: {
      name: "",
    },
    touched: false,
    errorMessage: "",
  };

  validateNameInput(value) {
    if (value.length < 1) {
      this.setState({
        touched: false,
        errorMessage: "Folder name can't be empty.",
      });
    }
    if(value.length === 10){
      this.setState({
        errorMessage: "10 characters is max length."
      })
    }
  }

  handleInputChange(e) {
    const folderName = e.target.value;
    this.setState(
      {
        folder: {
          name: folderName,
        },
        touched: true,
        errorMessage: "",
      },
      () => this.validateNameInput(folderName)
    );
  }

  handleAddFolderSubmit(e) {
    e.preventDefault();
    const folder = {
      name: this.state.folder.name,
    };
    const url = "http://localhost:9090/folders";
    const headers = {
      method: "POST",
      body: JSON.stringify(folder),
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
        this.context.addFolder(data);
      })
      .catch((err) => console.log(err));
  }

  render() {
    return (
      <div>
        <h2>Create Folder</h2>
        <form
          id="folder-form"
          className="add-form"
          onSubmit={(e) => this.handleAddFolderSubmit(e)}>
          <label htmlFor="folder-form-input">Name: </label>
          <input
            onChange={(e) => this.handleInputChange(e)}
            id="folder-form-input"
            name="folderName"
            type="text"
            maxLength="10"
          />
          {this.state.errorMessage && (
            <p className="error-msg">{this.state.errorMessage}</p>
          )}
          <button
            disabled={!this.state.touched}
            className="btn form-btn"
            type="submit">
            <i className="fas fa-plus"></i>
            Folder
          </button>
        </form>
      </div>
    );
  }
}
