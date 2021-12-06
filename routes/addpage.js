const router = require("express").Router();
const uploadFiles = require("../middlewares/uploadFiles");
const dbConnection = require("../connection/db");

// set routes and render add music page
router.get("/add-musics", (req, res) => {
  res.render("addpage/music", {
    title: "Add Music",
    isLogin: req.session.isLogin,
  });

  if (req.session.isLogin !== true) {
    res.redirect("/");
  }
});

router.post("/add-musics", uploadFiles.musicData("music"), (req, res) => {
  const { title } = req.body;

  // catch image filename
  const music = req.file.filename;

  // hold query
  const query = `INSERT INTO tb_music (title, music) VALUES ("${title}", "${music}")`;

  // verif if input is blank
  if (title == "" || music == "") {
    req.session.message = {
      color: "red",
      message: "Input must be filled",
    };

    res.redirect("/add-musics");
    return;
  }

  dbConnection.getConnection((err, conn) => {
    if (err) throw err;

    conn.query(query, (err, results) => {
      if (err) {
        res.redirect("/add-musics");
      } else {
        req.session.message = {
          color: "green",
          message: "Music And Cover succesfully add",
        };

        return res.redirect("/add-musics");
      }
    });
    conn.release();
  });
});

// set routes and render add artist page
router.get("/add-artist", (req, res) => {
  res.render("addpage/artist", {
    title: "Add Artist",
    isLogin: req.session.isLogin,
  });

  if (req.session.isLogin !== true) {
    res.redirect("/");
  }
});

router.post("/add-artist", uploadFiles.artistImg("image"), (req, res) => {
  const { name, date, about } = req.body;

  // catch image filename
  const image = req.file.filename;

  // hold query
  const query = `INSERT INTO tb_artis (name, start_career, photo, about) VALUES ("${name}", "${date}", "${image}", "${about}")`;

  // verif if input is blank
  if (name == "" || date == "" || about == "") {
    req.session.message = {
      color: "red",
      message: "Input must be filled",
    };

    res.redirect("/add-artist");
    return;
  }

  dbConnection.getConnection((err, conn) => {
    if (err) throw err;

    conn.query(query, (err, results) => {
      if (err) {
        res.redirect("/add-artist");
      } else {
        req.session.message = {
          color: "green",
          message: "Artist data succesfully add",
        };

        return res.redirect("/add-artist");
      }
    });
    conn.release();
  });
});

// set routes and render add genre page
router.get("/add-genre", (req, res) => {
  res.render("addpage/genre", {
    title: "Add Genre",
    isLogin: req.session.isLogin,
  });

  if (req.session.isLogin !== true) {
    res.redirect("/");
  }
});

router.post("/add-genre", (req, res) => {
  const { name } = req.body;

  // hold query
  const query = `INSERT INTO tb_genre (name) VALUES ("${name}")`;

  // verif if input is blank
  if (name == "") {
    req.session.message = {
      color: "red",
      message: "Input must be filled",
    };

    res.redirect("/add-genre");
    return;
  }

  dbConnection.getConnection((err, conn) => {
    if (err) throw err;

    conn.query(query, (err, results) => {
      if (err) {
        res.redirect("/add-genre");
      } else {
        req.session.message = {
          color: "green",
          message: "Genre data succesfully add",
        };

        return res.redirect("/add-genre");
      }
    });
    conn.release();
  });
});

module.exports = router;
