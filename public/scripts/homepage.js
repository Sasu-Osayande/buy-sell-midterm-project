// Client facing scripts here

// click feature on image on home page
$(document).ready(function() {
  const homepageImage = (".features-container");
  $(homepageImage).on("click",function() {
    window.location.replace("http://localhost:8080/shop/all-items");
  });
});
