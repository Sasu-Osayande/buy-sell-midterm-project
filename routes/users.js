const express = require('express');
const router  = express.Router();

module.exports = (db) => {

  router.get("/login", (req, res) => {
    const username = req.session.username;
    res.render("login", {username});
  });

  router.post("/login", (req, res) => {
    db.query(`SELECT * FROM users WHERE username = $1;`, [req.body.username])
      .then(data => {

        const result = data.rows[0].username;
        req.session.username = result;
        const userID = data.rows[0].id;
        req.session.userId = userID;
        req.session.id = userID;

        res.redirect("/shop");
      })
      .catch(err => {
        res
          .status(500).send("Username does not exist. Please try again.");
      });
  });

  router.post("/logout", (req, res) => {
    req.session = null;
    res.redirect(`/users/login`);
  });
  return router;
};



