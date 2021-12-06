const dbConnection = require("../connection/db");
const router = require("express").Router();
const profilePath = "http://localhost:4000/uploads/profile/";

// import bcrypt for password encrypt
const bcrypt = require("bcrypt");

// set routes and render login page
router.get("/login", (req, res) => {
  res.render("auth/login", {
    title: "Login Page",
    isLogin: req.session.isLogin,
  });
});

// login handler
router.post("/login", (req, res) => {
  // destructuring object
  const { email, password } = req.body;

  // hold query
  const query = `SELECT id, email, password, name, picture, summary FROM tb_user WHERE email=?`;

  // verif if input is blank
  if (email == "" || password == "") {
    req.session.message = {
      color: "red",
      message: "Input must be filled",
    };

    res.redirect("/login");
    return;
  }

  dbConnection.getConnection((err, conn) => {
    if (err) throw err;

    conn.query(query, [email], (err, results) => {
      if (err) throw err;

      // init bcrypt to decrypt password
      const isMatch = bcrypt.compareSync(password, results[0].password);

      // matching password
      if (isMatch) {
        req.session.message = {
          color: "green",
          message: "Login success",
        };

        req.session.isLogin = true;
        req.session.user = {
          id: results[0].id,
          email: results[0].email,
          name: results[0].name,
          picture: results[0].picture,
          summary: results[0].summary,
          image: profilePath + results[0].picture,
        };

        res.redirect("/profile");
        return;
      } else {
        req.session.message = {
          color: "red",
          message: "email or password is incorrect",
        };

        res.redirect("/login");
        return;
      }
    });

    conn.release();
  });
});

// set routes and render register page
router.get("/register", (req, res) => {
  res.render("auth/register", {
    title: "Register Page",
    isLogin: req.session.isLogin,
  });
});

// register handler
router.post("/register", (req, res) => {
  // destructuring object
  const { name, email, password } = req.body;

  // hold query
  const query = `INSERT INTO tb_user (name, email, password) VALUES (?,?,?)`;

  // verif if input is blank
  if (name == "" || email == "" || password == "") {
    req.session.message = {
      color: "red",
      message: "Input must be filled",
    };

    res.redirect("/register");
    return;
  }

  // init bcrypt to encrypt password 10 times spinning
  const encPass = bcrypt.hashSync(password, 10);

  dbConnection.getConnection((err, conn) => {
    if (err) throw err;

    // execute query
    conn.query(query, [name, email, encPass], (err, results) => {
      if (err) throw err;

      req.session.message = {
        color: "green",
        message: "Register Success",
      };

      return res.redirect("/register");
    });

    // release connection
    conn.release();
  });
});

// logout handler
router.get("/logout", function (req, res) {
  req.session.destroy();
  res.redirect("/");
});

module.exports = router;
