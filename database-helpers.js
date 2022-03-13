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
