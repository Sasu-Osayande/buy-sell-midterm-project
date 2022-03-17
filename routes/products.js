const express = require("express");
const { options } = require("pg/lib/defaults");
const {getAllFeatures, getAllItems, insertFavItem, getAllFavsForUser, deleteFavItem} = require("../database-helpers");
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
    const username = req.session.username;
    const userID = req.session.userId;
    const promiseOne = getAllItems(db, req.url)
    const promiseTwo = getAllFavsForUser(db, userID)

    Promise.all([promiseOne, promiseTwo]).then((values) => {
      const productsArray = values[0]
      const favourites = values[1]
      const products = productsArray.map(product => {
       const favouriteProduct = favourites.find(elem => elem.id === product.id)
        if (favouriteProduct) {
          product.favourite = true;
        }
        return product;
      })
      res.render("shop", {products, username});
    });
  });

  router.post("/all-items/filtered", (req, res) => {
    const username = req.session.username;
    const userID = req.session.userId;
    const options = req.body;
    const promiseOne = getAllItems(db, options)
    const promiseTwo = getAllFavsForUser(db, userID)

    Promise.all([promiseOne, promiseTwo]).then((values) => {
      const productsArray = values[0]
      const favourites = values[1]
      const products = productsArray.map(product => {
       const favouriteProduct = favourites.find(elem => elem.id === product.id)
        if (favouriteProduct) {
          product.favourite = true;
        }
        return product;
      })
      res.render("shop", {products, username});
    });
  });

  // const options = req.body
  // const username = req.session.username
  // getAllItems(db, options)
  //   .then((products) => {
  //     res.render("shop", {products, username});
  //   })
  //   .catch((err) => {
  //     res.status(500).json({ error: err.message });
  //   });

  router.get("/favourites", (req, res) => {
    const username = req.session.username
    const userId = req.session.userId;
    getAllFavsForUser(db, userId)
    .then((favs) => {
      res.render("favourites", {favs, username});
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
  });

  router.post("/favourites/:id", (req, res) => {
    const userId = req.session.userId;
    const productId = req.params.id;
    insertFavItem(db, productId, userId)
    .then(item => {
      res.send(item);
    })
    .catch(e => {
      console.error(e);
      res.send(e)
    });

  });

  router.post("/favourites/delete/:id", (req, res) => {
    const userId = req.session.userId;
    const productId = req.params.id;
    deleteFavItem(db, productId, userId)
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

    router.get("/messages/:to", (req, res) => {
      const to = req.params.to;
      const username = req.session.username;
      res.render("messages", {username, to});
    });

    // router.post("/messages", (req, res) => {
    //   // const username = req.session.username;
    //   res.redirect("/shop/messages");
    // });

  return router;
};
