import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./App.css";
import Main from "./components/Main";
import Sidebar from "./components/Sidebar";
import { NotesContext } from "./NotesContext";

class App extends Component {
  state = {
    folders: [],
    notes: [],
  };

  componentDidMount() {
    const folderUrl = "http://localhost:9090/folders";
    const notesUrl = "http://localhost:9090/notes";
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
        this.setState({ folders, notes });
      })
      .catch((err) => console.log(err));
  }

  handleDeleteNote = (noteId) => {
    this.setState({
      ...this.state,
      notes: this.state.notes.filter((note) => note.id !== noteId),
    });
  };

  handleAddFolder = (folder) => {
    this.setState({
      ...this.state,
      folders: [...this.state.folders, folder],
    });
  };

  handleAddNote = (note) => {
    this.setState({
      ...this.state,
      notes: [...this.state.notes, note],
    });
  };

  render() {
    const { folders, notes } = this.state;
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
              <h1 id="title">Noteful</h1>
            </Link>
          </header>
          <div id="container">
            <section id="sidebar-container">
              <Sidebar />
            </section>
            <main id="main-container">
              <Main />
            </main>
          </div>
        </>
      </NotesContext.Provider>
    );
  }
}

export default App;
