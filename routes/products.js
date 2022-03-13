const express = require("express");
const {getAllFeatures} = require("../database-helpers");
const router = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    getAllFeatures(db)
      .then((images) => {
        res.render("homepage", {images});
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  return router;
};
