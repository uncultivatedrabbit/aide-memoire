import React from "react";
import { Route } from "react-router-dom";
import MainNotesList from "./subcomponents/main_page/MainNotesList";
import MainNote from "./subcomponents/notes/MainNote";
import MainFolder from "./subcomponents/folders/MainFolder";
import AddFolder from "./subcomponents/add-forms/AddFolder";
import AddNote from "./subcomponents/add-forms/AddNote";

export default function Main() {
  return (
    <>
      <Route exact path="/" component={MainNotesList} />
      <Route path="/add-folder" component={AddFolder}/>
      <Route path="/add-note" component={AddNote}/>
      <Route
          path="/folder/:folderId"
          component={MainFolder}
        />
      <Route path="/note/:noteId" component={MainNote} />
    </>
  );
}
