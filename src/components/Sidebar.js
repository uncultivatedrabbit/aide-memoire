import React from "react";
import { Route, Switch } from "react-router-dom";
import MainSidebar from "./subcomponents/main_page/MainSidebar";
import FolderSidebar from "./subcomponents/folders/FolderSidebar";
import NoteSidebar from "./subcomponents/notes/NoteSidebar";
import AddFolder from "./subcomponents/add-forms/AddFolder";
import AddNote from "./subcomponents/add-forms/AddNote";

export default function Sidebar() {
  return (
    <>
      <Switch>
        <Route exact path="/" component={MainSidebar} />
        <Route path="/add-folder" component={AddFolder} />
        <Route path="/add-note" component={AddNote} />
        <Route path="/note/:noteId" component={NoteSidebar} />
        <Route path="/folder/:folderId" component={FolderSidebar} />
      </Switch>
    </>
  );
}
