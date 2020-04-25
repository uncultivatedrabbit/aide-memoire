import React from "react";
import { Route, Switch } from "react-router-dom";
import MainNotesList from "./subcomponents/main_page/MainNotesList";
import MainNote from "./subcomponents/notes/MainNote";
import MainFolder from "./subcomponents/folders/MainFolder";
import ErrorMessage from "../components/subcomponents/errors/ErrorMessage";
import FourOhFour from "./subcomponents/errors/FourOhFour";

export default function Main() {
  return (
    <>
      <ErrorMessage>
        <Switch>
          <Route exact path="/" component={MainNotesList} />
          <Route path="/add-folder" />
          <Route path="/add-note" />
          <Route path="/folder/:folderId" component={MainFolder} />
          <Route path="/note/:noteId" component={MainNote} />
          <Route component={FourOhFour} />
        </Switch>
      </ErrorMessage>
    </>
  );
}
