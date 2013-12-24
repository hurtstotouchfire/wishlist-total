// (c) Michael Penhallegon, all rights reserved

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

// get the id of the page from the link of the profile picture change url

id = $("div.a-popover-preload div.profile a.a-declarative").attr("href").split("/")[7].split("&")[2].split("=")[1]

// checks some classes to see if the page is compact, grid or regular

compact_page = $("table.g-compact-items").length;
grid_page = $("div.g-grid-page-wrapper").length;
selector_query = ["span.a-color-price"];

// sets some exemption for the diferent view in wishlists

if (compact_page === 1){
  selector_query.unshift("td.g-price");
}
else if (grid_page === 1){
  selector_query.unshift("div.price-section");
}
else {
  selector_query[selector_query.indexOf("span.a-color-price")] += (".a-text-bold");
}

// takes the selector_query and flattens it with a join, pulling from the dom
// the price span elements.

itemPrices = $.map($(selector_query.join(" ")), function (v) {return parseFloat(v.innerText.split("$")[1]);});
total = itemPrices.reduce(function(pv, cv) {return sum(pv, cv)});

// send message to with wishlist total

chrome.runtime.sendMessage({"total":total, "wishlist_id":id}, function(response){
    console.log(response.success);
});
