const http = require("http");
var fs = require("fs");
const express = require("express");
const app = express();
const port = 8200;

const bodyParser = require("body-parser");
const sqlite3 = require("sqlite3").verbose();

/* module.exports = {
  sayHello: function(){
    return 'hello';
  }
} */

/* let db = new sqlite3.Database('./baza.db',(err)=>{

    if(err){
        console.log(err.message)
    }
    console.log('connected to db')

    db.close((err)=>
    {
        if(err){
            console.log(err.message)
        }
    })
}) */

/* http.createServer(function (req, res) {
    if (req.method === "GET") {

            res.writeHead(200, { "Content-Type": "text/html" });
             fs.createReadStream("./index.html", "UTF-8").pipe(res);

  }})
  .listen(4500); */

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(bodyParser.json());

let db = new sqlite3.Database("./baza.db", (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log("Spojen na db");
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.post("/grad", async (req, res) => {
  var result;

  await db.run(
    `INSERT INTO grad (naziv, broj_stanovnika) VALUES (?, ?)`,
    [req.body.naziv, req.body.broj_stanovnika],
    (err, row) => {
      if (err) {
        console.log(err);
        res.status(400);
      } else {
        result = `Ubacen red`;
      }
      res.json(result);
    }
  );
});

app.put("/gradovi/:id", async (req, res) => {
  var result;

  await db.each(
    `UPDATE grad SET broj_stanovnika = ? WHERE id = ?`,
    [req.body.broj_stanovnika, req.params.id],
    (err, row) => {
      if (err) {
        console.log(err);
        res.status(400);
      } else {
        console.log(row);
        result = `Azuriran red ${req.params.id}`;
      }
    }
  );
  res.json(result);
});

app.get("/gradovi", async (req, res) => {
  await db.all(`SELECT * FROM grad`, (err, rows) => {
    if (err) {
      console.log(err);
      res.status(400);
    } else {
      result = rows;
    }

    res.json(result);
  });
});

app.get("/gradovi/:id", async (req, res) => {
  await db.all(
    `SELECT * FROM grad WHERE id = ?`,
    [req.params.id],
    (err, row) => {
      if (err) {
        console.log(err);
        res.status(400);
      } else {
        result = row;
      }
      res.json(result);
    }
  );
});

app.delete("/gradovi/:id", async (req, res) => {
  await db.run(`DELETE FROM grad WHERE id = ?`, [req.params.id], (err, row) => {
    if (err) {
      console.log(err);
      res.status(400);
    } else {
      result = `Red je ${req.params.id} obrisan`;
    }
    res.json(result);
  });
});

app.listen(port, () => {
  console.log(`Aplikacija se aBD slusa na http://localhost:${port}`);
});
