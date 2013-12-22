console.log("background running");
var total = 0.0;

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log(request.total);
    chrome.pageAction.show(sender.tab.id);
    sendResponse({"success": "ok", "request":request});
    document.total = request.total;
    document.wishlist_id = request.wishlist_id;
  });