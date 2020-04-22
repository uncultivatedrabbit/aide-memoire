import React from "react";
import { Route } from "react-router-dom";
import MainSidebar from "./subcomponents/main_page/MainSidebar";
import FolderSidebar from "./subcomponents/folders/FolderSidebar";
import NoteSidebar from "./subcomponents/notes/NoteSidebar";

export default function Sidebar() {
  return (
    <>
      <Route exact path="/" component={MainSidebar} />
      <Route path="/note/:noteId" component={NoteSidebar} />
      <Route path="/folder/:folderId" component={FolderSidebar} />
    </>
  );
}
