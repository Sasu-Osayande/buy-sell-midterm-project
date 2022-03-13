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
    SELECT *, users.username
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
