const path = require("path");
const express = require("express");
const xss = require("xss");
const FoldersService = require("./folders-service");

const folderRouter = express.Router();
const jsonParser = express.json();

const serializeFolder = (folder) => ({
  id: folder.id,
  folder_name: xss(folder.folder_name),
  date_created: folder.date_created,
});

/* api/folder route Router */
folderRouter
  .route("/")
  .get((req, res, next) => {
    const knexInstance = req.app.get("db");
    FoldersService.getAllFolders(knexInstance)
      .then((folders) => {
        res.json(folders.map(serializeFolder));
      })
      .catch(next);
  })
  .post(jsonParser, (req, res, next) => {
    const knexInstance = req.app.get("db");
    const { folder_name } = req.body;
    const newFolder = { folder_name };
    // error checking
    for (const [k, v] of Object.entries(newFolder)) {
      if (v == null) {
        return res
          .status(400)
          .json({ error: { message: `Missing '${k}' in request body` } });
      }
    }
    FoldersService.insertFolder(knexInstance, newFolder)
      .then((folder) =>
        res
          .status(201)
          .location(path.posix.join(req.originalUrl, `/${folder.id}`))
          .json(serializeFolder(folder))
      )
      .catch(next);
  });

/* api/folder/:id route Router */
folderRouter.route("/:folder_id")
.all((req, res, next) => {
  const knexInstance = req.app.get("db");
  const folderId = req.params.folder_id;
  FoldersService.getById(knexInstance, folderId)
    .then((folder) => {
      if (!folder) {
        return res.status(404).json({
          error: { message: `Folder doesn't exist` },
        });
      }
      res.folder = folder;
      next();
    })
    .catch(next);
}).get((req,res,next) => {
  res.json(serializeFolder(res.folder))
});

module.exports = folderRouter;
