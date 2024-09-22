const express = require(`express`);

const fileRouter = express.Router();
const url = "https://whats-app-clone-orpin.vercel.app";
const upload = require("../middleware/file");

const grid = require("gridfs-stream");
const mongoose = require("mongoose");

let gridFsBucket, gfs;
   
const conn = mongoose.connection;
conn.once("open", () => {
  gridFsBucket = new mongoose.mongo.GridFSBucket(conn.db, {
    bucketName: "fs",
  });
  gfs = grid(conn.db, mongoose.mongo);   
  gfs.collection("fs");
}); 

fileRouter.post("/", upload.single("file"), async (req, res) => {
  if (!req.file) {
    res.send(`file not found`);
  }
  console.log(req.file);
  const image = `${url}/file/${req.file.filename}`;
  res.send(image);
});

fileRouter.get("/:filename", async (req, res) => {
  try {
    const file = await gfs.files.findOne({ filename: req.params.filename });
    const readStream = gridFsBucket.openDownloadStream(file._id);
    readStream.pipe(res);
  } catch (error) {
    res.send(error.message);
  }
});   

module.exports = {
  fileRouter,
};
