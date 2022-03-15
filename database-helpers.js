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
.then(res => {030
  return res.rows
});

};

exports.getAllItems = getAllItems;




