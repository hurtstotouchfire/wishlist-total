// Copyright 2013 Michael Penhallegon

// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at

//     http://www.apache.org/licenses/LICENSE-2.0

// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

var wishlist_request = {};

getWishlistID = function(tab_id) {
  return sessionStorage.getItem(tab_id);
};


// creates listener for message handler
// sets the pageaction icon to be displayed
// sends a response with a sucess "ok"
// sets the tab id to the request obeject
// sets the wishlist_request object as the locally
// the locally scoped request object
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    chrome.pageAction.show(sender.tab.id);
    if (request.total) {
      sendResponse({"success": "ok", "request":request});
      request.tab_id = sender.tab.id;
      wishlist_request = request;
      sessionStorage.setItem(sender.tab.id, request.wishlist_id);
    } else {
      sendResponse({"sucess":"error","error":"invalid message"});
    }
  });