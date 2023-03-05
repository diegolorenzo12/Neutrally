chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.greeting === "fetchData") {
    //console.log(document.body);

    var json = window.getSelection().toString();
    //json = json.replace(/(<([^>]+)>)/gi, " ");
    sendResponse(json);
  }
});

//document.querySelectorAll(".class")
