var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var app = express();
app.use(express.json());
const db = require("./model/helper");

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
  db(
    `INSERT INTO user (user_name, user_email, password, location, user_dog_name, user_dog_description) VALUES ("${req.body.user_name}", "${req.body.user_email}", "${req.body.password}", "${req.body.location}", "${req.body.user_dog_name}", "${req.body.user_dog_description}");`
  )
    .then(() => {
      db("SELECT * from user ORDER BY user_Id ASC;").then((results) => {
        res.send(results.data);
        // if successful, page should navigate to log in page
      });
    })
    .catch((err) => res.status(500).send(err));
});

app.get("/login", (req, res, next) => {
  db(
    `SELECT user_name from user WHERE user_name="${req.body.user_name}" AND password="${req.body.password}";`
  )
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

// app.get("/user/:name", (req, res, next) => {
//   db(`select * from user where user_name="${req.params.name}";`)
//     .then((results) => {
//       if (!results) {
//         return res.status(404).send("No user found");
//       } else {
//         res.send(results.data);
//       }
//     })
//     .catch((err) => res.status(500).send(err));
// });

app.get("/user/plus/:id", (req, res, next) => {
  db(`select * from user where user_Id="${req.params.id}";`)
    .then((results) => {
      if (!results) {
        return res.status(404).send("No user found");
      } else {
        res.send(results.data);
      }
    })
    .catch((err) => res.status(500).send(err));
});

app.get("/user/:user_name", (req, res, next) => {
  console.log("*****", req.params)
  db(`select * from user where user_name= "${req.params.user_name}";`)
    .then((results) => {
        res.send(results.data);
    })
    .catch((err) => res.status(500).send(err));
});


app.get("/all-users", (req, res, next) => {
  db(`select * from user;`)
    .then((results) => {
      if (!results) {
        return res.status(404).send("No user found");
      } else {
        res.send(results.data);
      }
    })
    .catch((err) => res.status(500).send(err));
});

app.post("/add-walk", (req, res, next) => {
  db(
    `INSERT INTO walk (walk_name, location, address, types, length, rating, difficulty, description, photo_url, user_name, latitude, longitude) VALUES ("${req.body.walk_name}", "${req.body.location}", "${req.body.address}", "${req.body.types}", "${req.body.length}", "${req.body.rating}", "${req.body.difficulty}", "${req.body.description}", "${req.body.photo_url}","${req.body.user_name}", "${req.body.latitude}", "${req.body.longitude}" )`
  )
    .then(() => {
      db(`SELECT * from walk WHERE walk_name="${req.body.walk_name}";`).then(
        (results) => {
          res.send(results.data);
        }
      );
      //user should be directed to individual walk page for the walk they've just uploaded
    })
    .catch((err) => res.status(500).send(err));
});

app.get("/all-walks", (req, res, next) => {
  db(`SELECT * from walk;`)
    .then((results) => {
      res.send(results.data);
      //data displayed in AllWalks component
    })
    .catch((err) => res.status(500).send(err));
});

app.get("/walk/:id", (req, res, next) => {
  db(`SELECT * from walk WHERE walk_id="${req.params.id}";`)
    .then((results) => {
      res.send(results.data);
      //data displayed in IndividualWalk component
    })
    .catch((err) => res.status(500).send(err));
});


app.get("/all-walk/:user_name", (req, res, next) => {
  db(`SELECT * from walk WHERE user_name="${req.params.user_name}";`)
    .then((results) => {
      res.send(results.data);
      //data displayed in IndividualWalk component
    })
    .catch((err) => res.status(500).send(err));
});

module.exports = app;
