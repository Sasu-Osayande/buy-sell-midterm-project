const express = require("express");
// const getAllFeatures = require("../database-helpers");
const router = express.Router();

// const getAllFeatures = require("../database-helpers");

module.exports = (db) => {
  router.get("/", (req, res) => {
    db.getAllFeatures()
    // console.log("********FUNCTION*****:", features)
      .then((images) => {
        console.log("Images:", images);
        res.send({images});
        res.render("homepage");
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  return router;
};
