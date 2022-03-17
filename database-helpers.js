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


const getAllItems = (db, options) => {
  const queryParams = [];
  let queryString = `SELECT products.*, users.username
  FROM products
  JOIN users ON users.id = user_id
  `
  if (options.min_price && options.max_price) {
    queryParams.push(Number(options.min_price), Number(options.max_price))
    queryString += ` WHERE products.price > $${queryParams.length - 1} AND products.price < $${queryParams.length}`;
  }
  if (!options.min_price && options.max_price) {
    queryParams.push(Number(options.max_price))
    queryString += ` WHERE products.price < $${queryParams.length}`;
  }
  if (options.min_price && !options.max_price) {
    queryParams.push(Number(options.min_price))
    queryString += ` WHERE products.price > $${queryParams.length}`;
  }
  queryString += ` ORDER BY products DESC;`
  return db.query(queryString, queryParams)
  .then(res => {
    return res.rows
  });
}

// const getAllItems = (db) => {

//   return db
//       .query(
//         `
//       SELECT products.id, products.title, products.description, products.image_url, products.price, products.is_sold, users.id as userid, users.username
//       FROM products
//       JOIN users ON users.id = user_id
//       ORDER BY products DESC;
//       `)
//       .then((result) => {
//         console.log("Result:", result.rows)
//         return result.rows;
//       })
//       .catch((err) => {
//         console.log(err.message);
//       });

// };
exports.getAllItems = getAllItems;

const insertFavItem = (db, productID, userID) => {
  return db
  .query(
    `
  INSERT INTO favourites (product_id, user_id)
  VALUES($1, $2) RETURNING *;
  `,
    [productID, userID]
  )
  .then((result) => {
    return result.rows[0];
  })
  .catch((err) => {
    console.log(err.message);
  });
}
exports.insertFavItem = insertFavItem;

const deleteFavItem = (db, productID, userID) => {
  return db
  .query(
    `
  DELETE FROM favourites WHERE product_id = $1 AND user_id = $2
  RETURNING *;
  `,
    [productID, userID]
  )
  .then((result) => {
    return result.rows[0];
  })
  .catch((err) => {
    console.log(err.message);
  });
}
exports.deleteFavItem = deleteFavItem;

const getAllFavsForUser = (db, userID) => {
  return db
    .query(
      `SELECT favourites.*, products.*, users.username
      FROM favourites
      JOIN products ON products.id = favourites.product_id
      JOIN users ON users.id = products.user_id
      WHERE favourites.user_id = $1
      `
    ,
      [userID]
    )
    .then((result) => {
      return result.rows;
    })
    .catch((err) => {
      console.log(err.message);
    });
}
exports.getAllFavsForUser = getAllFavsForUser;


const getMyItems = (db, username) => {

  return db
      .query(
        `
      SELECT *, products.id AS id, users.username
      FROM products
      JOIN users ON users.id = user_id
      WHERE users.username = $1
      ORDER BY products DESC;
      `, [username])
      .then((result) => {
        console.log("Result:", result.rows)
        return result.rows;
      })
      .catch((err) => {
        console.log(err.message);
      });

};
exports.getMyItems = getMyItems;


const addItem = (db, product, userID) => {

  console.log("Products:", product);
  return db.query(
    `
    INSERT INTO products (title, description, image_url, price, user_id)
    VALUES($1, $2, $3, $4, $5) RETURNING *;
    `,
    [
      product.title,
      product.description,
      product.image_url,
      product.price,
      userID
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


