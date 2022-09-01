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
  database: DB_NAME || "final_project",
  multipleStatements: true,
});

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");

  let sql =
    "DROP TABLE if exists user; CREATE TABLE user(user_Id INT NOT NULL, user_name VARCHAR(255) not null, user_email VARCHAR(255) not null, password VARCHAR(255) not null, location VARCHAR(255) not null, user_dog_name VARCHAR(255) not null, user_dog_description VARCHAR(255) not null, PRIMARY KEY (user_Id));DROP TABLE if exists walk; CREATE TABLE walk (walk_name VARCHAR(255) NOT NULL,location VARCHAR(255) NOT NULL,address VARCHAR(255) NOT NULL,types VARCHAR(255) NOT NULL,length VARCHAR(255) NOT NULL,rating INT NOT NULL,difficulty INT NOT NULL,description VARCHAR(255) NOT NULL);";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table creation `paths` was successful!");

    console.log("Closing...");
  });

  con.end();
});
