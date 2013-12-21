bg = chrome.extension.getBackgroundPage()
$(document).ready(function() {
  $("span.price").text(bg.document.total);
});