//(c) Michael Penhallegon, all rights reserved

console.log("wishlist total loaded");

var total = 0.0;
var itemPrices = Array();
var id = "";

// function used in reduce to add all the values up for total
// if price is not NaN it adds to total if not then return last total

function sum (previousValue, currentValue) {
  if (isNaN(currentValue)) {
    return previousValue;
  } else {
    return previousValue+currentValue;
  }
}

compact_page = $("table.g-compact-items").length;
grid_page = $("div.g-grid-page-wrapper").length;
selector_query = ["span.a-color-price"];

// sets some exemption for the diferent view in wishlists

if (compact_page === 1){
  selector_query.unshift("td.g-price");
  marray = {};
  
  // attempts to get the id of the page
  document.URL.split("&").slice(1).map(function(v){t = v.split("=");o = {}; j = t[0]; k = t[1]; marray[j] = k; return o});
  id = marray.id;
}
else if (grid_page === 1){
  selector_query.unshift("div.price-section");
}
else {
  selector_query[selector_query.indexOf("span.a-color-price")] += (".a-text-bold");
  
  //attempts to get the wishlist id
  id = document.URL.split("/")[6];
}

itemPrices = $.map($(selector_query.join(" ")), function (v) {return parseFloat(v.innerText.split("$")[1]);});
total = itemPrices.reduce(function(pv, cv) {return sum(pv, cv)});

// send message to with wishlist total

chrome.runtime.sendMessage({"total":total}, function(response){
    console.log(response.success);
});
