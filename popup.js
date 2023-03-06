import { gender } from "./logica.js";

document.getElementById("myButton").addEventListener("click", fetchData);

function fetchData() {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(
      tabs[0].id,
      { greeting: "fetchData" },
      async (response) => {
        let a = response;
        //let b = a;
        //b = b.replace(/(\r\n|\n|\r)/gm, "<br> ");
        a = a.replace(/(\r\n|\n|\r)/gm, "<br> ");
        let ele = document.getElementById("content");
        ele.innerHTML = ' ' + a;
        if (a.length>85) {
          var elemento = document.getElementsByClassName("infoBox");
          for(var i = 0; i < elemento.length; i++)
          elemento[i].className += " changedInfoBox";
          var elemento = document.getElementsByClassName("structure");
          for(var i = 0; i < elemento.length; i++)
          elemento[i].className += " changedInfoBox";
          var elemento = document.getElementsByClassName("text");
          for(var i = 0; i < elemento.length; i++)
          elemento[i].className += " changedText";
        }
        a = a.replace(/[^a-zA-Z0-9 ]/g, " ");
        console.log(a);
        var arr = a.split(" ");
        arr = arr.filter(function (entry) {
          return entry.trim() != "";
        });
        arr.sort();
          const rem = [];
          rem.push(arr[0]);
          for(let i = 1; i < arr.length; i++){
            if(arr[i] != arr[i+1]){
              rem.push(arr[i]);
            }
          }
          arr = rem;
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
      }
    );
  });
}
function highlight(text) {
  var inputText = document.getElementById("content");
  var innerHTML = inputText.innerHTML;
  //text = " " +  text;
  var newText = "<span class='highlight'>" + text + "</span>";
  let re = new RegExp(`\\b${text}\\b`, 'gi');
  innerHTML = innerHTML.replaceAll(re, newText);
  inputText.innerHTML = innerHTML;
  console.log(innerHTML);
}