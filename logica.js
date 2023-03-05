import dict from "./dict.js";

//regresa URL apropiado para la palabra
export function url(word) {
  "use strict";
  var link = "https://api.dictionaryapi.dev/api/v2/entries/en/";
  link += word;
  return link;
}
//regresa genero de la palabra evaluada
export function genEval(word) {
  if (word in dict) {
    if (dict[word] == "m") {
      return 0;
    }
    if (dict[word] == "f") {
      return 1;
    }
  }
  return -1;
  //const res = await fetch('dict.json');
}
export async function gender(word) {
  "use strict";
  if (word in dict) {
    if (dict[word] == "m") {
      return dict[word];
    }
    if (dict[word] == "f") {
      return dict[word];
    }
    return "n";
  }
  const res = await fetch(url(word));
  const x = await res.json();
  if (x.title != "No Definitions Found") {
    // encuentra la palabra en el diccionario
    let defs = x[0].meanings[0].definitions;
    defs = defs.slice(0, 2);
    const strDefs = [];
    for (let i = 0; i < defs.length; i++) {
      //obtiene definiciones en formato de string
      strDefs.push(defs[i].definition);
    }
    for (let i = 0; i < defs.length; i++) {
      //procesamiento de texto, strDefs se convierte en un string con cada palabra separada por una sola coma
      let arr = strDefs[i].split(" ");
      arr = arr.slice(0, 6);
      strDefs[i] = arr.toString();
      strDefs[i] = strDefs[i].replace(/[^a-zA-Z0-9,]/g, "");
      strDefs[i] = strDefs[i].replace(",,", ",");
    }
    let mw = 0,
      fw = 0; //maleWord, femaleWord
    for (let i = 0; i < strDefs.length; i++) {
      const evalWords = strDefs[i].split(",");
      for (let j = 0; j < evalWords.length; j++) {
        let gender = genEval(evalWords[j]);
        if (gender == 0) {
          mw++;
        } else if (gender == 1) {
          fw++;
        }
      }
    }
    if (mw != fw) {
      if (mw > fw) {
        return "m";
      } else {
        return "f";
      }
    } else {
      return "n";
    }
  } else {
    return -1;
  }
}
