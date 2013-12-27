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
var wishlists = {};
wishlists.indexedDB = {};
wishlists.indexedDB.db = null;

var query_result = {};
wishlists.indexedDB.open = function() {
  var version = 6;
  var request = indexedDB.open ("wishlists",version);
  
  request.onsuccess = function(e) {
    wishlists.indexedDB.db = e.target.result;
  };
  
  request.onupgradeneeded = function(e){
    console.info("upgraded schema");
    var db = e.target.result;
    
    e.target.transaction.onerror = wishlists.indexedDB.onerror;
    if(db.objectStoreNames.contains("wishlists")) {
      db.deleteObjectStore("wishlists");
    }
    
    var store = db.createObjectStore("wishlists", {keyPath:"wishlist_id"});
  };
  
  request.onerror = wishlists.indexedDB.onerror;
  
};

wishlists.indexedDB.addWishlist = function(data) {
  var db = wishlists.indexedDB.db;
  var trans = db.transaction(["wishlists"], "readwrite");
  var store = trans.objectStore("wishlists");
  
  // sets schema update version if edited
  var request = store.put({
    "wishlist_id": data.wishlist_id,
    "total": data.total,
    "name": data.name,
    "item_num": data.item_num
  });
  
  request.onsuccess = function(e) {
  };
  request.onerror = function(e){
    console.log(e.value);
  };
};


wishlists.indexedDB.fetchWishlist = function(query){
  var db = wishlists.indexedDB.db;
  var trans = db.transaction(["wishlists"], "readonly");
  var store = trans.objectStore("wishlists");
  var request = store.get(query);
  
  request.onsuccess = function(event) {
    returnWishlist(request.result);
  };
  request.onerror = wishlists.indexedDB.onerror;
};
wishlists.indexedDB.deleteWishlist = function(id) {
  var db = wishlists.indexedDB.db;
  var trans = db.transaction(["wishlists"], "readwrite");
  var store = trans.objectStore("wishlists");
  
  var request = store.delete(id);
  
  request.onsuccess = function(e) {
  };
  request.onerror = function(e) {
    console.log(e);
  };
};

function init_DB() {
  wishlists.indexedDB.open();
  wishlist_list = [];
}

window.addEventListener("DOMContentLoaded", init_DB, false);

function returnWishlist(row) {
  query_result = row;
}
getWishlistData = function(tab_id) {
  wishlist_id = sessionStorage.getItem(tab_id);
  wishlists.indexedDB.fetchWishlist(wishlist_id);
  return query_result;
};


// creates listener for message handler
// sets the pageaction icon to be displayed
// sends a response with a success "ok"
// sets the tab id to the request obeject
// sets the wishlist_request object as the locally
// the locally scoped request object
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    chrome.pageAction.show(sender.tab.id);
    if (request.total) {
      sendResponse({"success": "ok", "request":request});
      request.tab_id = sender.tab.id;
      wishlists.indexedDB.addWishlist(request);
      sessionStorage.setItem(sender.tab.id, request.wishlist_id);
    } else {
      sendResponse({"success":"error","error":"invalid message"});
    }
  });