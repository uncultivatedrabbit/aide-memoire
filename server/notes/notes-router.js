const path = require("path");
const express = require("express");
const xss = require("xss");
const NotesService = require("./notes-service");

const notesRouter = express.Router();
const jsonParser = express.json();

const serializeNote = (note) => ({
  id: note.id,
  note_name: xss(note.note_name),
  note_content: xss(note.note_content),
  date_modified: note.date_modified,
  folder_id: note.folder_id,
});

notesRouter
  .route("/")
  .get((req, res, next) => {
    const knexInstance = req.app.get("db");
    NotesService.getAllNotes(knexInstance)
      .then((notes) => {
        res.json(notes.map(serializeNote));
      })
      .catch(next);
  })
  .post(jsonParser, (req, res, next) => {
    const knexInstance = req.app.get("db");
    const { note_name, note_content, folder_id } = req.body;
    console.log(req.body)
    const newNote = { note_name, note_content, folder_id };
    // error checking
    for (const [k, v] of Object.entries(newNote)) {
      if (v == null) {
        return res
          .status(400)
          .json({ error: { message: `Missing '${k}' in request body` } });
      }
    }
    NotesService.insertNote(knexInstance, newNote)
      .then((note) =>
        res
          .status(201)
          .location(path.posix.join(req.originalUrl, `${note.id}`))
          .json(serializeNote(note))
      )
      .catch(next);
  });

notesRouter
  .route("/:note_id")
  .all((req, res, next) => {
    const knexInstance = req.app.get("db");
    const id = req.params.note_id;
    NotesService.getById(knexInstance, id)
      .then((note) => {
        if (!note) {
          return res.status(404).json({
            error: { message: `Note doesn't exist` },
          });
        }
        res.note = note;
        next();
      })
      .catch(next);
  })
  .get((res, req, next) => {
    res.json(serializeNote(res.note));
  })
  .delete((req, res, next) => {
    const knexInstance = req.app.get("db");
    const id = req.params.note_id;
    NotesService.deleteNote(knexInstance, id)
      .then((numRowsAffected) => {
        res.status(204).end();
      })
      .catch(next);
  });

module.exports = notesRouter;
