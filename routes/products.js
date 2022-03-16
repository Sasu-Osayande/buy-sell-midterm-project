const express = require("express");
const {getAllFeatures, getAllItems, getMyItems, addItem, deleteItem, soldItem} = require("../database-helpers");
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

  router.get("/myshop", (req, res) => {
    const username = req.session.username
    const queryString = `
    SELECT products.id, products.title, products.description, products.image_url, products.price, products.is_sold, users.id as userid, users.username
    FROM products
    JOIN users ON users.id = user_id
    WHERE users.username = '${username}'
    ORDER BY products DESC;
    `;
    db.query(queryString)
      .then((myProducts) => {
        console.log("My Products:", myProducts.rows);
        myProducts = myProducts.rows;
        res.render("myshop", { myProducts, username });
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  // router.post("/myshop", (req, res) => {
  //   const product = req.body;

  //   addItem(db, product)
  //   .then((myProducts) => {
  //     const username = req.session.username;
  //     const userID = req.session.id;

  //     console.log("My Products:", myProducts);
  //     res.render("myshop", { myProducts, username, user_id: userID });
  //   })
  //   .catch((err) => {
  //     res.status(500).json({ error: err.message });
  //   });
  // });

  router.post("/myshop", (req, res) => {
    const username = req.session.username
    const userID = req.session.id;

    const product = req.body;
    const title = product.title;
    const description = product.description;
    const image_url = product.image_url;
    const price = product.price;

    const queryString = `
    INSERT INTO products (title, description, image_url, price, user_id)
    VALUES($1, $2, $3, $4, $5) RETURNING *;
    `;
    db.query(queryString, [title, description, image_url, price, userID])
    .then((myProducts) => {
      myProducts = myProducts.rows;
      console.log("Products:", myProducts)
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
