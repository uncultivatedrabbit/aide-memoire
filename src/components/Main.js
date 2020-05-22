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
      {/* verifies there is no error before rendering correct path via props.children*/}
      <ErrorMessage>
        {/* switch statement that handles different endpoints the user can go to */}
        <Switch>
          <Route exact path="/" component={MainNotesList} />
          <Route path="/add-folder" />
          <Route path="/add-note" />
          <Route path="/folder/:folderId" component={MainFolder} />
          <Route path="/note/:noteId" component={MainNote} />
          {/* error page if user tries to go to a nonexistant page */}
          <Route component={FourOhFour} />
        </Switch>
      </ErrorMessage>
    </>
  );
}
