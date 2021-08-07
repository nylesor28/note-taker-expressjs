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

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "public/notes.html"));
});

app.get("/api/notes", (req, res) => {

  res.json(notesObjArr);
});

app.post("/api/notes", function (req, res) {
  console.log(req.body);

  req.body.id = uuidv4();
  notesObjArr.push(req.body);

  saveNotes(notesObjArr);
  res.status(200).json("Save Completed Successfully")
});

app.delete("/api/notes/:id", (req, res) => {

  const inputID = req.params.id; 

  for(let i = 0; i<notesObjArr.length; i++){
    if (notesObjArr[i].id===inputID){
      notesObjArr.splice(i,1)
      break;
    }
  }
  saveNotes(notesObjArr)
  res.status(200).json("Delete Completed Successfully")

});

app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}!`);
});


