const express = require("express");
// DOUBLE CHECK THIS LATER
const { options } = require("pg/lib/defaults");
const {getAllFeatures, getAllItems, getMyItems, addItem, deleteItem, soldItem, insertFavItem, getAllFavsForUser, deleteFavItem} = require("../database-helpers");

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
    console.log("Username", username)
    console.log("Cookie", req.session)
    // const queryString = `
    // SELECT products.id, products.title, products.description, products.image_url, products.price, products.is_sold, users.id as userid, users.username
    // FROM products
    // JOIN users ON users.id = user_id
    // WHERE users.username = '${username}'
    // ORDER BY products DESC;
    // `;
    // db.query(queryString)
      getMyItems(db, username)
      .then((myProducts) => {
        // console.log("My Products:", myProducts.rows);
        // myProducts = myProducts.rows;
        res.render("myshop", { myProducts, username });
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  router.post("/myshop", (req, res) => {
    const username = req.session.username
    const userID = req.session.id;

    const product = req.body;

    addItem(db, product, userID)
    .then((myProducts) => {
      myProducts = myProducts.rows;
      // console.log("Products:", myProducts)
      res.redirect("/shop/myshop");
      res.render("myshop", {myProducts, username});
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
  });

  router.post("/myshop/:id/delete", (req, res) => {
    const id = req.params.id;

    deleteItem(db, id)
      .then((data) => {
        res.redirect("/shop/myshop");
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  router.post("/myshop/:id/sold", (req, res) => {
    const id = req.params.id;

    soldItem(db, id)
      .then((data) => {
        res.redirect("/shop/myshop");
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  })

  return router;
};
