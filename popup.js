document.getElementById("myButton").addEventListener("click", fetchData);

function fetchData() {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(
      tabs[0].id,
      { greeting: "fetchData" },
      (response) => {
        let a = response;
        console.log(a);
        a = a.replace(/(\r\n|\n|\r)/gm, "");
        var arr = a.split(" ");
        arr = arr.filter(function (entry) {
          return entry.trim() != "";
        });
        //alert(a);
        console.log(arr);

        let ele = document.getElementById("content");
        ele.innerHTML = a;

        highlight("");
      }
    );
  });
}

function highlight(text) {
  var inputText = document.getElementById("content");
  var innerHTML = inputText.innerHTML;
  var index = innerHTML.indexOf(text);
  if (index >= 0) {
    innerHTML =
      innerHTML.substring(0, index) +
      "<span class='highlight'>" +
      innerHTML.substring(index, index + text.length) +
      "</span>" +
      innerHTML.substring(index + text.length);
    inputText.innerHTML = innerHTML;
  }
}
