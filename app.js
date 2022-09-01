var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var app = express();
app.use(express.json());
const db = require("./model/helper");
require("dotenv").config();
const jwt = require("jsonwebtoken");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);

app.post("/sign-up", function (req, res, next) {
  db(`INSERT INTO ? etc`)
    .then(() => {
      db("SELECT * from admins ORDER BY id ASC;").then((results) => {
        res.send(results.data);
        // if successful, page should navigate to log in page
      });
    })
    .catch((err) => res.status(500).send(err));
});

app.get("/login", (req, res, next) => {
  db(`SELECT name and password WHERE name and password = etc";`)
    .then((results) => {
      if (!results) {
        return res.status(404).send("Login information incorrect, try again");
      } else {
        res.send(results.data);
        //data successfully sent from the database to the front end will cause a redirect to user profile page
      }
    })
    .catch((err) => res.status(500).send(err));
});

app.get("/user/:id", (req, res, next) => {
  db(`SELECT user WHERE id = etc";`)
    .then((results) => {
      res.send(results.data);
      //data displayed in UserProfile component
    })
    .catch((err) => res.status(500).send(err));
});

const getToken = (username) => {
  return new Promise(function (resolve, reject) {
    // typically an api call to your backend which returns a JWT

    let token = jwt.sign(username, process.env.ACCESS_TOKEN_SECRET);
    if (token) {
      resolve(token);
      return token;
    } else {
      reject("Failed to retrieve token");
      console.log("Failed to retrieve token");
    }
  });
};

app.get("/token/:id", (req, res, next) => {
  db(`SELECT user WHERE id = etc";`)
    .then((results) => {
      getToken(results.data.user_name);
      console.log("success");
      //data displayed in UserProfile component
    })
    .then((token) => {
      res.send(token);
    })
    .catch((err) => res.status(500).send(err));
});

app.post("/add-walk", (req, res, next) => {
  db(`INSERT INTO ? etc`)
    .then((results) => {
      res.send(results.data);
      //user should be directed to individual walk page for the walk they've just uploaded
    })
    .catch((err) => res.status(500).send(err));
});

app.get("/walk/:id", (req, res, next) => {
  db(`SELECT walk WHERE id = etc";`)
    .then((results) => {
      res.send(results.data);
      //data displayed in IndividualWalk component
    })
    .catch((err) => res.status(500).send(err));
});

app.get("/all-walks", (req, res, next) => {
  db(`SELECT * from ?database?`)
    .then((results) => {
      res.send(results.data);
      //data displayed in AllWalks component
    })
    .catch((err) => res.status(500).send(err));
});

module.exports = app;
