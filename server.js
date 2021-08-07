const express = require("express");
const path = require("path");
const fs = require("fs");

const { v4: uuidv4 } = require("uuid");
const notesObjArr = require("./db/db.json");

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));


saveNotes =(arr)=>{

  fs.writeFileSync(path.join(__dirname, "db/db.json"), JSON.stringify(arr));
}


app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
});
+
app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "public/notes.html"));
});

app.get("/api/notes", (req, res) => {
 let newArr = fs.readFileSync(path.join(__dirname, "db/db.json"));
console.log(notesObjArr)
  res.json(notesObjArr);
 // res.json(JSON.parse(notesObjArr));
});

app.post("/api/notes", function (req, res) {
  console.log(req.body);

  req.body.id = uuidv4();
  notesObjArr.push(req.body);

  saveNotes(notesObjArr);

  console.log(notesObjArr);
  res.json(req.body);
});

app.delete("/api/notes/:id", (req, res) => {
  console.log(req.params);
  const inputID = req.params.id; 

  const filteredArr = notesObjArr.filter(notes=> notes.id !== inputID);
  console.log(filteredArr);
  saveNotes(filteredArr)
  res.status(200).send("Successful")

});

app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}!`);
});


