const express = require("express");
const multer = require("multer");
const {join} = require("path");
const {writeFile, readFile} = require("fs-extra");

const router = express.Router();

const uploadFolder = join(__dirname, "../../public/images/");

const upload = multer({})


router.post("/:id/upload" , upload.single("image"), async (req, res, next) => {
  // http://localhost:3000/files/upload
  // Multer middleware is taking care of multipart/form-data content-type and is giving me back a req.file object in which I'm gonna find the file and other infos like size or original name
  const filename = req.params.id + ".jpg"

  await writeFile(join(uploadFolder, filename), req.file.buffer); // I'm taking the buffer (the received file) and I'm writing it on my disk with writeFile(path, buffer)
  res.send("Ok");

});
module.exports = router;