import React from "react";
import { Route } from "react-router-dom";
import MainNotesList from "./main_page/MainNotesList";
import MainNote from "./notes/MainNote";
import MainFolder from "./folders/MainFolder";

export default function Main() {
  return (
    <>
      <Route exact path="/" component={MainNotesList} />
      <Route
          path="/folder/:folderId"
          component={MainFolder}
        />
      <Route path="/note/:noteId" component={MainNote} />
    </>
  );
}
