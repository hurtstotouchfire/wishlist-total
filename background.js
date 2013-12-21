console.log("background running");
var total = 0.0;
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log(request["total"]);
    sendResponse({"success": "ok", "request":request});
    document.total = request["total"]
  });