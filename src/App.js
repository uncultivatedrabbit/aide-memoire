import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./App.css";
import store from "./store";
import Main from "./components/Main";
import Sidebar from "./components/Sidebar";

class App extends Component {
  state = {
    folders: store.folders,
    notes: store.notes,
  };
  render() {
    return (
      <>
        <header id="header">
          <Link to="/">
            <h1 id="title">Noteful</h1>
          </Link>
        </header>
        <div id="container">
          <section id="sidebar-container">
            <Sidebar folders={this.state.folders} notes={this.state.notes} />
          </section>
          <main id="main-container">
            <Main folders={this.state.folders} notes={this.state.notes} />
          </main>
        </div>
      </>
    );
  }
}

export default App;
