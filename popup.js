
bg = chrome.extension.getBackgroundPage();
var current_tab_id;


$(document).ready(function() {
  chrome.windows.getCurrent(function(w){
  chrome.tabs.getSelected(w.id, function(t){
    current_tab_id = t.id;
    if(bg.wishlist_request.tab_id == current_tab_id) {
      $("span.price").text(Number(bg.wishlist_request.total).toFixed(2));
      $("sub.wishlist_id").text(bg.wishlist_request.wishlist_id);
    } else {
        $("sub.error").text("Not on currently calculated wishlist; please refresh page");
    }
    });
  });
});