require("dotenv").config();
const mysql = require("mysql");

const DB_HOST = process.env.DB_HOST;
const DB_USER = process.env.DB_USER;
const DB_PASS = process.env.DB_PASS;
const DB_NAME = process.env.DB_NAME;

const con = mysql.createConnection({
  host: DB_HOST || "127.0.0.1",
  user: DB_USER || "root",
  password: DB_PASS,
  database: DB_NAME || "Trails",
  multipleStatements: true,
});

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");

  let sql =
    "DROP TABLE if exists paths; CREATE TABLE paths(id INT NOT NULL AUTO_INCREMENT, firstname VARCHAR(40) not null, lastname VARCHAR(40) not null, Age VARCHAR(40), Country VARCHAR(40), City VARCHAR(40), Place VARCHAR(40), Climate VARCHAR(40), Difficulty VARCHAR(40), Qualification VARCHAR(40), Image VARCHAR(40), Description VARCHAR(40), PRIMARY KEY (id));";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table creation `paths` was successful!");

    console.log("Closing...");
  });

  con.end();
});
