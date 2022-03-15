$(document).ready(function() {

  const heartIcon = (".heart-icon")

  $(heartIcon).on("click",function() {

      //changes colour of heart to red
      $(this).css('color','#ba1f3b')

      console.log($(this).css('color'))

      //id of product
      let productID = $(this).parents('.item-info').find('#product-id')[0].innerHTML

      // send ajax post request with product id
      $.ajax({
        method: "POST",
        url: `/shop/favourites/${productID}`,
      })


  })



});
