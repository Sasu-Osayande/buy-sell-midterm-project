const users = require("./routes/users");

const getAllFeatures = (db, limit = 8) => {
  return db
    .query(
      `
    SELECT image_url
    FROM products
    LIMIT $1;
    `,
      [limit]
    )
    .then((result) => {
      return result.rows;
    })
    .catch((err) => {
      console.log(err.message);
    });
};

exports.getAllFeatures = getAllFeatures;

const getAllItems = (db) => {

  return db
      .query(
        `
      SELECT products.id, products.title, products.description, products.image_url, products.price, products.is_sold, users.id as userid, users.username
      FROM products
      JOIN users ON users.id = user_id
      ORDER BY products DESC;
      `)
      .then((result) => {
        console.log("Result:", result.rows)
        return result.rows;
      })
      .catch((err) => {
        console.log(err.message);
      });

};

exports.getAllItems = getAllItems;

// const getAllItems = (db, options) => {

// const queryParams = [];

// let queryString = `SELECT *, users.username
// FROM products
// JOIN users ON users.id = user_id
// ORDER BY products DESC;
// `
// if (options.min_price && options.max_price) {
//   console.log("Min price", options.min_price)
//   queryParams.push(Number(options.min_price, options.max_price))
//   queryString += `AND products.price > $${queryParams.length - 1} AND products.price < $${queryParams.length}`;
// }

// return db.query(queryString, queryParams)
// .then(res => {
//   res.rows
// });

// };


const getMyItems = (db) => {

  return db
      .query(
        `
      SELECT *, users.username
      FROM products
      JOIN users ON users.id = user_id
      WHERE users.username = 'Alice'
      ORDER BY products DESC;
      `)
      .then((result) => {
        // console.log("Result:", result.rows)
        return result.rows;
      })
      .catch((err) => {
        console.log(err.message);
      });

};
exports.getMyItems = getMyItems;


const addItem = (db, product) => {

  console.log("Products:", product);
  return db.query(
    `
    INSERT INTO products (title, description, image_url, price)
    VALUES($1, $2, $3, $4) RETURNING *;
    `,
    [
      product.title,
      product.description,
      product.image_url,
      product.price
    ]
  )
  .then((result) => {
    console.log("Result:", result.rows)
    return result.rows;
  })
  .catch((err) => {
    console.log(err.message);
  });

};
exports.addItem = addItem;

const deleteItem = (db, id) => {
  return db
  .query(
    `
    DELETE
    FROM products
    WHERE id = $1;
    `,
    [id]
  )
  .then((result) => {
    return result.rows;
  })
  .catch((err) => {
    console.log(err.message);
  });
}
exports.deleteItem = deleteItem;

const soldItem = (db, id) => {
  return db
  .query(
    `
    UPDATE products
    SET is_sold = TRUE
    WHERE id = $1;
    `,
    [id]
  )
  .then((result) => {
    return result.rows;
  })
  .catch((err) => {
    console.log(err.message);
  });
}
exports.soldItem = soldItem;

