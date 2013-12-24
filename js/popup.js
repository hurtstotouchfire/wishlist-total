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