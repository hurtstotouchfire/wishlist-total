console.log("background running");
var total = 0.0;
if (!wishlist_request) {
  var wishlist_request = {};
}
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    chrome.pageAction.show(sender.tab.id);
    sendResponse({"success": "ok", "request":request});
    request.tab_id = sender.tab.id;
    wishlist_request = request;
    sessionStorage.setItem(sender.tab.id, request.wishlist_id);
  });