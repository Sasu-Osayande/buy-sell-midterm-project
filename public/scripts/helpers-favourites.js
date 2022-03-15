// function to get data on this item's user_id and product_id

const getAllFeatures = (db) => {
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

// function to get data on specific item and insert item into favourites table



// function to pull data from favourites table
