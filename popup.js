import { gender } from "./logica.js";

document.getElementById("myButton").addEventListener("click", fetchData);

function fetchData() {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(
      tabs[0].id,
      { greeting: "fetchData" },
      async (response) => {
        let a = response;
        console.log(a);
        a = a.replace(/(\r\n|\n|\r)/gm, " ");
        let ele = document.getElementById("content");
        ele.innerHTML = a;
        a = a.replace(/[^a-zA-Z0-9 ]/g, " ");
        var arr = a.split(" ");
        arr = arr.filter(function (entry) {
          return entry.trim() != "";
        });
        console.log(arr);
        for(let i = 0; i < arr.length; i++){
          if(arr[i].length > 1){
            let res = await gender(arr[i]);
            if(res == "f"){
              highlight(arr[i]);
            }
            if(res == "m"){
              highlight(arr[i]);
            }
          }
        }
        
        highlight("save");
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
