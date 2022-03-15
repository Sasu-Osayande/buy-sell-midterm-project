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


$(document).ready(function() {

  const heartIcon = (".heart-icon")

  $(heartIcon).on("click",function() {

    $(this).css('color','#ba1f3b')

    $.ajax({
      // method: "POST",
      // url: '/shop/favourites',
      // .then()
    })

  })



});
