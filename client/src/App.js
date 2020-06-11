import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./App.css";
import Main from "./components/Main";
import Sidebar from "./components/Sidebar";
import { NotesContext } from "./NotesContext";
import { API_ENDPOINT } from "./config";

class App extends Component {
  state = {
    folders: [],
    notes: [],
    errorMessage: "",
  };

  componentDidMount() {
    // locations of inital data
    const folderUrl = `${API_ENDPOINT}/api/folders`;
    const notesUrl = `${API_ENDPOINT}/api/notes`;

    // fetch the folders and notes from the DB and verify the process was successful
    Promise.all([fetch(folderUrl), fetch(notesUrl)])
      .then(async ([folderRes, notesRes]) => {
        if (!folderRes.ok) {
          const e = await folderRes.json();
          return await Promise.reject(e);
        }
        if (!notesRes.ok) {
          const e_1 = await notesRes.json();
          return await Promise.reject(e_1);
        }
        return Promise.all([folderRes.json(), notesRes.json()]);
      })
      .then(([folders, notes]) => {
        // update state with the folders and notes
        // from the database
        this.setState({ folders, notes });
      })
      .catch((err) =>
        this.setState({
          errorMessage: "Sorry. Something went wrong with the connection.",
        })
      );
  }

  // handle when the user deletes a specific note
  handleDeleteNote = (noteId) => {
    this.setState({
      ...this.state,
      notes: this.state.notes.filter((note) => note.id !== +noteId),
    });
  };

  // handle when the user adds a new folder
  handleAddFolder = (folder) => {
    this.setState({
      ...this.state,
      folders: [...this.state.folders, folder],
    });
  };

  // handle when the user adds a new note
  handleAddNote = (note) => {
    this.setState({
      ...this.state,
      notes: [...this.state.notes, note],
    });
  };

  render() {
    const { folders, notes } = this.state;
    // Prepare context value to be passed into the context provider
    const value = {
      folders,
      notes,
      deleteNote: this.handleDeleteNote,
      addFolder: this.handleAddFolder,
      addNote: this.handleAddNote,
    };
    return (
      <NotesContext.Provider value={value}>
        <>
          <header id="header">
            <Link to="/">
              <h1 id="title">Aide-Memoire</h1>
            </Link>
            <p className="subheader">
              Track and organize your notes, saving them in different folders to
              help structure your ideas, projects, and interests.
            </p>
          </header>
          {this.state.errorMessage ? (
            <>
              <h1 className="error-msg front-page-error">
                {this.state.errorMessage}
              </h1>
            </>
          ) : (
            <>
              <div id="container">
                <section id="sidebar-container">
                  <Sidebar />
                </section>
                <main id="main-container">
                  <Main />
                </main>
              </div>
            </>
          )}
        </>
      </NotesContext.Provider>
    );
  }
}

export default App;
