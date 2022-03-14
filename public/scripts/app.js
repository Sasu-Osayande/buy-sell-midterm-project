// Client facing scripts here

// click feature on heart in shop-all page
$(document).ready(function() {

  const button = (".click-heart-favs")
  const homepageImage = (".features-container")

  $(homepageImage).on("click",function() {

    window.location.replace("http://localhost:8080/shop/all-items");
    // $.ajax({
    //   url:"/shop/favourites",
    //   type: "get",
    //   success: function(result){
    //       console.log("testing ",result);
    //   },
    //   error: function(err){
    //       console.log("error", err)
    //   }

  })

  $(button).on("click",function() {

    window.location.replace("http://localhost:8080/shop/favourites");
    // $.ajax({
    //   url:"/shop/favourites",
    //   type: "get",
    //   success: function(result){
    //       console.log("testing ",result);
    //   },
    //   error: function(err){
    //       console.log("error", err)
    //   }

  })

});
