const router = require("express").Router();
const dbConnection = require("../connection/db");
const uploadFiles = require("../middlewares/uploadFiles");

// set upload path
const artistPath = "http://localhost:4000/uploads/artist/";
const profilePath = "http://localhost:4000/uploads/profile/";

// set routes and render edit profile page
router.get("/edit-profile", (req, res) => {
  res.render("editpage/profile", {
    title: "Edit Profile",
    isLogin: req.session.isLogin,
  });

  if (req.session.isLogin !== true) {
    res.redirect("index");
  }
});

router.post("/edit-profile", uploadFiles.profileImg("image"), (req, res) => {
  const { id, name, email, summary, oldImage } = req.body;
  let image = oldImage.replace(profilePath, "");

  // catch only image filename
  if (req.file) {
    image = req.file.filename;
  }

  const query = `UPDATE tb_user SET name="${name}", email="${email}", picture="${image}", summary="${summary}" WHERE id="${id}"`;

  dbConnection.getConnection((err, conn) => {
    if (err) {
      req.session.message = {
        color: "red",
        message: "Connection Error",
      };

      res.redirect(`/edit-profile`);
    }

    conn.query(query, (err, results) => {
      if (err) {
        req.session.message = {
          color: "red",
          message: "Update Data Failed",
        };

        res.redirect(`/edit-profile`);
      } else {
        req.session.message = {
          color: "green",
          message: "Data Successfully Update",
        };

        res.redirect(`/profile`);
      }
    });
    conn.release();
  });
});

// set routes and render edit artist page
router.get("/edit-artist/:id", (req, res) => {
  const { id } = req.params;

  const query = `SELECT * FROM tb_artis WHERE id = ${id}`;

  dbConnection.getConnection((err, conn) => {
    if (err) throw err;

    conn.query(query, (err, results) => {
      const artist = {
        ...results[0],
        image: artistPath + results[0].photo,
      };

      res.render("editpage/artist", {
        title: "Edit Artist Data",
        isLogin: req.session.isLogin,
        artist,
      });
    });

    conn.release();
  });

  if (req.session.isLogin !== true) {
    res.redirect("/");
  }
});

router.post("/edit-artist", uploadFiles.artistImg("image"), (req, res) => {
  const { id, name, date, about, oldImage } = req.body;
  let image = oldImage.replace(artistPath, "");

  // catch only image filename
  if (req.file) {
    image = req.file.filename;
  }

  const query = `UPDATE tb_artis SET name="${name}", start_career="${date}", photo="${image}", about="${about}" WHERE id="${id}"`;

  dbConnection.getConnection((err, conn) => {
    if (err) {
      req.session.message = {
        color: "red",
        message: "Connection Error",
      };

      res.redirect(`/edit-artist/${id}`);
    }

    conn.query(query, (err, results) => {
      if (err) {
        req.session.message = {
          color: "red",
          message: "Update Data Failed",
        };

        res.redirect(`/edit-artist/${id}`);
      } else {
        req.session.message = {
          color: "green",
          message: "Data Successfully Update",
        };

        res.redirect(`/edit-artist/${id}`);
      }
    });

    conn.release();
  });
});

// set routes and render edit genre page
router.get("/edit-genre/:id", (req, res) => {
  const { id } = req.params;

  const query = `SELECT * FROM tb_genre WHERE id = ${id}`;

  dbConnection.getConnection((err, conn) => {
    if (err) throw err;

    conn.query(query, (err, results) => {
      const genre = {
        ...results[0],
      };

      res.render("editpage/genre", {
        title: "Edit Genre",
        isLogin: req.session.isLogin,
        genre,
      });
    });

    conn.release();
  });

  if (req.session.isLogin !== true) {
    res.redirect("/");
  }
});

router.post("/edit-genre", (req, res) => {
  const { id, name } = req.body;

  const query = `UPDATE tb_genre SET name="${name}" WHERE id="${id}"`;

  dbConnection.getConnection((err, conn) => {
    if (err) throw err;

    conn.query(query, (err, results) => {
      if (err) {
        req.session.message = {
          color: "red",
          message: "Update Data Failed",
        };

        res.redirect(`/edit-genre/${id}`);
      } else {
        req.session.message = {
          color: "green",
          message: "Data Successfully Update",
        };

        res.redirect(`/edit-genre/${id}`);
      }
    });

    conn.release();
  });
});

module.exports = router;
