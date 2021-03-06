const dbConnection = require("../connection/db");
const router = require("express").Router();

// set upload path
const artistPath = "http://localhost:4000/uploads/artist/";
const musicPath = "http://localhost:4000/uploads/music/";
const coverPath = "http://localhost:4000/uploads/cover/";

// set routes and render profile page
router.get("/profile", (req, res) => {
  // Validate if isLogin is true
  if (req.session.isLogin !== true) {
    res.redirect("/");
  }

  res.render("dashboard/index", {
    title: "Dashboard",
    isLogin: req.session.isLogin,
  });
});

// set routes and render my musics page
router.get("/musics", (req, res) => {
  if (req.session.isLogin !== true) {
    res.redirect("/");
  }

  const query = `SELECT * FROM tb_music`;

  dbConnection.getConnection((err, conn) => {
    if (err) throw err;

    conn.query(query, (err, results) => {
      if (err) throw err;

      let sound = [];

      for (let result of results) {
        sound.push({
          ...result,
          loc: musicPath + result.music,
          cover: coverPath + result.cover_music,
        });
      }

      res.render("dashboard/musics", {
        title: "My Music",
        isLogin: req.session.isLogin,
        sound,
      });
    });

    conn.release();
  });
});

router.get("/delete-musics/:id", (req, res) => {
  const { id } = req.params;

  const query = `DELETE FROM tb_music WHERE id =${id}`;

  dbConnection.getConnection((err, conn) => {
    if (err) throw err;

    conn.query(query, (err, results) => {
      if (err) {
        req.session.message = {
          color: "red",
          message: err.sqlMessage,
        };
      } else {
        res.redirect("/musics");
      }
    });
    conn.release();
  });
});

// set routes and render playlist page
router.get("/playlist", (req, res) => {
  if (req.session.isLogin !== true) {
    res.redirect("/");
  }
  res.render("dashboard/playlist", {
    title: "My Playlist",
    isLogin: req.session.isLogin,
  });
});

// set routes and render friend page
router.get("/friend", (req, res) => {
  if (req.session.isLogin !== true) {
    res.redirect("/");
  }

  res.render("dashboard/friend", {
    title: "Friend's Music",
    isLogin: req.session.isLogin,
  });
});

// set routes and render summary page
router.get("/summary", (req, res) => {
  if (req.session.isLogin !== true) {
    res.redirect("/");
  }

  res.render("dashboard/summary", {
    title: "Music Summary",
    isLogin: req.session.isLogin,
  });
});

// set routes and render artist page
router.get("/artist", (req, res) => {
  if (req.session.isLogin !== true) {
    res.redirect("/");
  }

  const query = `SELECT * FROM tb_artis`;

  dbConnection.getConnection((err, conn) => {
    if (err) throw err;

    conn.query(query, (err, results) => {
      if (err) throw err;

      let artists = [];

      for (let result of results) {
        artists.push({
          ...result,
          image: artistPath + result.photo,
        });
      }

      res.render("dashboard/artist", {
        title: "Artist Biodata",
        isLogin: req.session.isLogin,
        artists,
      });
    });

    conn.release();
  });
});

router.get("/delete-artist/:id", (req, res) => {
  const { id } = req.params;

  const query = `DELETE FROM tb_artis WHERE id =${id}`;

  dbConnection.getConnection((err, conn) => {
    if (err) throw err;

    conn.query(query, (err, results) => {
      if (err) {
        req.session.message = {
          color: "red",
          message: err.sqlMessage,
        };
      } else {
        res.redirect("/artist");
      }
    });
    conn.release();
  });
});

// set routes and render genre page
router.get("/genre", (req, res) => {
  if (req.session.isLogin !== true) {
    res.redirect("/");
  }

  const query = `SELECT * FROM tb_genre`;

  dbConnection.getConnection((err, conn) => {
    if (err) throw err;

    conn.query(query, (err, results) => {
      if (err) throw err;

      let genre = [];

      for (let result of results) {
        genre.push({
          ...result,
        });
      }

      res.render("dashboard/genre", {
        title: "Genre List",
        isLogin: req.session.isLogin,
        genre,
      });
    });

    conn.release();
  });
});

router.get("/delete-genre/:id", (req, res) => {
  const { id } = req.params;

  const query = `DELETE FROM tb_genre WHERE id =${id}`;

  dbConnection.getConnection((err, conn) => {
    if (err) throw err;

    conn.query(query, (err, results) => {
      if (err) {
        req.session.message = {
          color: "red",
          message: err.sqlMessage,
        };
      } else {
        res.redirect("/genre");
      }
    });
    conn.release();
  });
});

module.exports = router;
