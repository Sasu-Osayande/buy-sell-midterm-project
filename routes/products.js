const express = require("express");
const { options } = require("pg/lib/defaults");
const {getAllFeatures, getAllItems, insertFavItem, getAllFavsForUser} = require("../database-helpers");
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
    getAllItems(db, req.url)
      .then((products) => {
        const username = req.session.username
        res.render("shop", {products, username});
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  router.post("/all-items/filtered", (req, res) => {
    const options = req.body
    getAllItems(db, options)
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
    const userId = req.session.userId;

    getAllFavsForUser(db, userId)
    .then((favs) => {
      console.log(favs)
      res.render("favourites", {favs, username});
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });

  });

  router.post("/favourites/:id", (req, res) => {

    const userId = req.session.userId;
    const productId = req.params.id;

    // this route will render the favourites page with the favourited items of the specific user

    insertFavItem(db, productId, userId)
    .then(item => {
      res.send(item);
    })
    .catch(e => {
      console.error(e);
      res.send(e)
    });

  });

  router.get("/myshop", (req, res) => {
    const username = req.session.username
    res.render("myshop", {username});
  });

  return router;
};
