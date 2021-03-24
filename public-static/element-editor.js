//get all buttons editor elements.
const inputElement = document.getElementById("selectElement");
console.log(inputElement);
const fontSizeInput = document.getElementById("changeFontSize");
console.log(fontSizeInput);
const inputRGB = document.getElementById("userColor");
console.log(inputRGB);
const editButton = document.getElementById("confirm-styles-button");

//console.log(editButton);

// get all headers
function getHeaders() {
  var hdrList = [];
  for (var i = 1; i < 8; i++) {
    var headers = document.getElementsByTagName("h" + i);
    hdrList.push.apply(hdrList, headers);
  }
  return hdrList;
}

const all = document.getElementsByTagName("*");

const allHeaders = getHeaders();

const allParagraphs = document.getElementsByTagName("p");

const allArticles = document.getElementsByTagName("article");

const allFooters = document.getElementsByTagName("footer");

function editPage(elements, textfont, colour) {
  if (elements == "all") {
    for (let index = 0; index < all.length; index++) {
      all[index].setAttribute("style", "background-color:blue;");
      all[index].setAttribute("style", "font-size:" + textfont + "px"); //font-size:
    }
  } else if (elements == "headers") {
    for (let index = 0; index < allHeaders.length; index++) {
      allHeaders[index].style.color = colour;
      allHeaders[index].setAttribute("style", "font-size:" + textfont + "px"); //font-size:
    }
  } else if (elements == "intro") {
    if (document.getElementsByClassName("intro")[0]) {
      document.getElementsByClassName("intro")[0].style.color = inputRGB.value;
    }
    document
      .getElementsByClassName("Article")[0]
      .setAttribute("style", "font-size:" + textfont);
  } else if (elements == "article_1") {
    for (let index = 0; index < all.length; index++) {
      all[index].setAttribute("style", "color:" + colour);
      all[index].setAttribute("style", "font-size:" + textfont + "px"); //font-size:
    }
  } else {
    for (let index = 0; index < allFooters.length; index++) {
      allFooters[index].setAttribute("style", "color:" + colour);
      allFooters[index].setAttribute("style", "font-size:" + textfont + "px"); //font-size:
    }
  }
}

editButton.addEventListener("click", () => {
  editPage(inputElement.value, fontSizeInput.value, inputRGB.value);
  console.log(inputElement.value);
  console.log(fontSizeInput.value);
  console.log(inputRGB.value);
});
