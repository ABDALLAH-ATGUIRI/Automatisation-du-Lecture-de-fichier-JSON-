import * as database from "../Models/db_model.js";
import models from "../Models/json_model.js.js";
import express from "express";
import upload from "express-fileupload";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const port = 3000;
const app = express();

app.use(upload());

app.get("/", (req, res) => {
  res.sendFile(__dirname + "../../Front-end/view/documentation.html");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

// Post file json
app.post("/", (req, res) => {
  try {
    if (!req.files) {
      res.send("File was not found");
      return;
    }
    const file = req.files.file;
    const uniqueName = new Date().getTime().toString();
    file.mv("./uploads/" + uniqueName + ".json", (err) => {
      if (err) {
        res.send(err);
      } else {
        //Save to database
        database.UploadJson(file.name, uniqueName, "1728317635623");
        res.send("File Uploaded");
      }
    });
  } catch (error) {
    console.log(error);
    res.send("Error uploading file");
  }
});

// GET file json
app.get("/jsonfile/:uid", (request, response) => {
  response.sendFile(models.loadJson(request.params.uid));
  //  response.send();
});

// SingUp