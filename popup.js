bg = chrome.extension.getBackgroundPage()
$(document).ready(function() {
  $("span.price").text(Number(bg.document.total).toFixed(2));
  $("span.wishlist_id").text(bg.document.wishlist_id);
});