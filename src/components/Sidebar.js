import React from "react";
import { Route } from "react-router-dom";
import MainSidebar from "./main_page/MainSidebar";
import FolderSidebar from "./folders/FolderSidebar";
import NoteSidebar from "./notes/NoteSidebar";

export default function Sidebar() {
  return (
    <div>
      <h2>Folders</h2>
      <Route exact path="/" component={MainSidebar} />
      <Route path="/note/:noteId" component={NoteSidebar} />
      <Route path="/folder/:folderId" component={FolderSidebar} />
    </div>
  );
}
