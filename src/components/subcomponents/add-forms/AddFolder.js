import React, { Component } from "react";
import { NotesContext } from "../../../NotesContext";

// component handles user adding new folders 
export default class AddFolder extends Component {
  static contextType = NotesContext;
  state = {
    folder: {
      name: "",
    },
    touched: false,
    errorMessage: "",
  };

  // handles validation of folder name 
  validateNameInput(value) {
    // checks if user has inputted any chars
    // and blocks user from submitting a nameless folder
    if (value.length < 1) {
      this.setState({
        touched: false,
        errorMessage: "Folder name can't be empty.",
      });
    }
    // checks if folder name is 10 chars long 
    // to maintain usable UI
    if (value.length === 10) {
      this.setState({
        errorMessage: "10 characters is max length.",
      });
    }
  }

  // listens for user input and updates state
  // to the user inputted value
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
      // sends user input to validation method
      () => this.validateNameInput(folderName)
    );
  }

  // handles form submission
  handleAddFolderSubmit(e) {
    // ensures page doesn't reload
    e.preventDefault();
    const folder = {
      name: this.state.folder.name,
    };
    const url = "http://localhost:9090/folders";
    // configures POST request
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
        this.props.history.goBack();
        this.context.addFolder(data);
      })
      .catch((err) => console.log(err));
  }

  render() {
    return (
      <div className="add-form-container">
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
            aria-required="true"
          />
          {this.state.errorMessage && (
            <p className="error-msg">{this.state.errorMessage}</p>
          )}
          <button
            tabIndex="1"
            // disables submit button if the user hasn't inputted valid text
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
