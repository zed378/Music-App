// use http method
const http = require("http");

// use module
const express = require("express");
const hbs = require("hbs");

// use path to access another folder
const path = require("path");

// setting routes
const authRoutes = require("./routes/auth");
const dashRoutes = require("./routes/dashboard");
const addRoutes = require("./routes/addpage");
const editRoutes = require("./routes/editpage");

// create connection
const dbConnection = require("./connection/db");

// hold express to variable
const app = express();

// init express-session to manage session
const session = require("express-session");

// use request handler to parsing html form
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// set public path to store static web files
app.use(express.static("express"));
app.use("/public", express.static(path.join(__dirname, "public")));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// setting view engine
app.set("view engine", "hbs");

// registering view partial
hbs.registerPartials(path.join(__dirname, "views/partials"));
const musicPath = "http://localhost:4000/uploads/music/";
const coverPath = "http://localhost:4000/uploads/cover/";

// use express-session to set user session
app.use(
  session({
    // set max session to 3 hours
    cookie: {
      maxAge: 3 * 60 * 60 * 1000,
      secure: false,
      httpOnly: true,
    },
    // save session to server memory
    store: new session.MemoryStore(),
    saveUninitialized: false,
    resave: false,
    secret: "secretValue",
  })
);

// accessing session data from memory store
app.use((req, res, next) => {
  res.locals.message = req.session.message;
  res.locals.user = req.session.user;

  delete req.session.message;
  next();
});

// set and mount routes
app.use("/", authRoutes);
app.use("/", dashRoutes);
app.use("/", addRoutes);
app.use("/", editRoutes);

// create index view
app.get("/", function (req, res) {
  const query = `SELECT * FROM tb_music`;

  dbConnection.getConnection((err, conn) => {
    if (err) throw err;

    conn.query(query, (err, results) => {
      if (err) throw err;

      let mus = [];

      for (let result of results) {
        mus.push({
          ...result,
          sound: musicPath + result.music,
          cover: coverPath + result.cover_music,
        });
      }

      res.render("index", {
        title: "Music App",
        isLogin: req.session.isLogin,
        mus,
      });
    });

    conn.release();
  });
});

// setting port and server
const port = 4000;
const server = http.createServer(app);
server.listen(port);

console.debug(`Server running on port: ${port}`);
