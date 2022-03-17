$(document).ready(function() {
  const heartIcon = (".heart-icon")

  $(heartIcon).on("click",function() {
    //id of product
    let productID = $(this).parents('.item-info').find('#product-id')[0].innerHTML
    
    //if on click the css color is red
    if ($(this).attr('data-fav') === "false") {
      $(this).css('color','#ba1f3b')
      $(this).attr('data-fav', "true")

      $.ajax({
        method: "POST",
        url: `/shop/favourites/${productID}`
      })

    } else {

    // if on click the css color is black
      $(this).css('color', '#000000')
      $(this).attr('data-fav', "false")

      $.ajax({
        method: "POST",
        url: `/shop/favourites/delete/${productID}`
      })
    }
  })
});
