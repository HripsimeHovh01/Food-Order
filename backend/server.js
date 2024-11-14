import express from "express";
import sqlite3 from "sqlite3";
import cors from "cors";

const app = express();
const PORT = 8888;

app.use(cors());
app.use(express.json());
app.use(express.static("static")); 


const DB = new sqlite3.Database("./database.db");

app.post("/add-user-info", (req, res) => {
  const { name, phone } = req.body;

  const insertQuery = "INSERT INTO users (name, phone) VALUES (?, ?);";
  DB.run(insertQuery, [name, phone], (err) => {
    if (err) {
      res.status(500).send(err);
    }

    else {
      res.status(200).send({ "message": "success" });
    }
  });
});

app.get("/get-user-info", (req, res) => {
  const selectQuery = "SELECT * FROM users";

  DB.all(selectQuery, (err, rows) => {
    if (err) {
      res.status(500).send(err);
    }

    else {
      res.status(200).send(rows);
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});