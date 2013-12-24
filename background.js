//(c) Michael Penhallegon, all rights reserved

var wishlist_request = {};


// creates listener for message handler
// sets the pageaction icon to be displayed
// sends a response with a sucess "ok"
// sets the tab id to the request obeject
// sets the wishlist_request object as the locally
// the locally scoped request object
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    chrome.pageAction.show(sender.tab.id);
    sendResponse({"success": "ok", "request":request});
    request.tab_id = sender.tab.id;
    wishlist_request = request;
    sessionStorage.setItem(sender.tab.id, request.wishlist_id);
  });