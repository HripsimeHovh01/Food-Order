import express from "express";
import sqlite3 from "sqlite3";
import cors from "cors";
import multer from "multer";

const app = express();
const PORT = 8888;

app.use(cors());
app.use(express.static("static"));
app.use(express.json());

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "images/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage });

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

app.post("/add-menu", upload.single("image"), (req, res) => {
  const { title, description, price } = req.body;
  const image = req.file.originalname;

  const insertQuery = "INSERT INTO menu (title, description, price, image) VALUES (?, ?, ?, ?);";
  DB.run(insertQuery, [title, description, price, image], (err) => {
    if (err) {
      console.log(req.body);
      console.log(req.file);
      res.status(500).send(err);
    }

    else {
      // res.status(200).send({ "status": "success" });
      res.status(200).send("Success");
    }
  });
});

app.get("/get-menu", (req, res) => {
  const selectQuery = "SELECT * FROM menu;";
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