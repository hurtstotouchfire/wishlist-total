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

// this file sets up all the logic for popup.html, the popup page

// first we bring in the wishlist_request object from the background page

wishlist_request = chrome.extension.getBackgroundPage().wishlist_request;
getWishlistID = chrome.extension.getBackgroundPage().getWishlistID;
var current_tab_id;
var wishlist_id;


$(document).ready(function() {
  // gets current tab id
  chrome.windows.getCurrent(function(w){
    chrome.tabs.getSelected(w.id, function(t){
      current_tab_id = t.id;
      //verfies that the current tab selected is the tab last queried
      if(wishlist_request.tab_id == current_tab_id) {
        $("span.price").text(Number(wishlist_request.total).toFixed(2));
        $("sub.wishlist_id").text(wishlist_request.wishlist_id);
      } else {
          wishlist_id = getWishlistID(current_tab_id);
           $("sub.error").text(wishlist_id + "Not on currently calculated wishlist; please refresh page");
      }
     
    });
  });
});