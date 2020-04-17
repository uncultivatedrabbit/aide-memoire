import React from "react";

export const NotesContext = React.createContext({
  folders: [],
  notes: [],
  deleteNote: () => {},
  router: {}
});
