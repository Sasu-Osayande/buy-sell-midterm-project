const express = require("express");
const {getAllFeatures, getAllItems} = require("../database-helpers");
const router = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    getAllFeatures(db)
      .then((images) => {
        const username = req.session.username
        res.render("homepage", {images, username});
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  router.get("/all-items", (req, res) => {
    getAllItems(db)
      .then((products) => {
        const username = req.session.username
        res.render("shop", {products, username});
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  router.get("/favourites", (req, res) => {
    const username = req.session.username
    res.render("favourites", {username});
  });

  return router;
};
