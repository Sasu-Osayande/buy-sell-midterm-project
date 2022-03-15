// helper functions


// HTML structure of fav item
let $item = $(`
  <div class = "inside-itemsshop-page">
    <% for (let product in products) { %>

      <div>
      <img class="item-container-shop" src="<%= products[product].image_url %>">
      </div>

      <div class = "item-info">
        <div>
          <b>TITLE:</b> <%= products[product].title %>
        </div>
        <div>
          <b>PRICE:</b> $<%= products[product].price %>
        </div>
        <div>
          <b>SELLER:</b> <%= products[product].username %>
        </div>
        <form action="/shop/favourites" method="GET" class= "click-heart-favs">
          <span id="clickable-heart" style="cursor:pointer"><i class="fa-solid fa-heart heart-icon" ></i>
          </span>
        </form>
        <button type="submit" style="width:150px;">Message Seller</button>
      </div>
    <% } %>
  </div>
`)

// function to insert post into favourites table
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


// function to pull data from favourites table

$(document).ready(function() {



});
