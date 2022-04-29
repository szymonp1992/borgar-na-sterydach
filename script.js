const input = document.querySelector(".input");
const output = document.querySelector(".output");
const preview = document.querySelector(".preview-text");

function retrieveFromLocalStorage() {
  input.value = localStorage.getItem("description");
  output.value = localStorage.getItem("HTMLdescription");
  preview.innerHTML = localStorage.getItem("preview");
}

function addHTML(stringArray) {
  let afterH2 = false;
  let formatted = "";
  // Conditions under which paragraphs are being formatted
  stringArray.map((el) => {
    // Normal paragraphs
    if (!el.toLowerCase().includes("najważniejsze cechy") && !afterH2) {
      if (el === "" || el === " ") {
        formatted += "";
      } else {
        formatted += `<p>${el}</p>
`;
      }
    }
    // H2 paragraph with key attributes
    if (el.toLowerCase().includes("najważniejsze cechy") && !afterH2) {
      formatted += `<h2><span style="font-size: 18px;"><strong>${el}</strong></span></h2>
<ul>
`;
      afterH2 = true;
    }
    // Key attributes as unordered list elements
    if (!el.toLowerCase().includes("najważniejsze cechy") && afterH2) {
      formatted += `<li>${el}</li>
`;
    }
  });
  // Save textarea value to localstorage

  // Return finally formatted text with closed unordered list
  formatted += `</ul>`;
  return formatted;
}

input.addEventListener("input", (e) => {
  const str = e.target.value;
  localStorage.setItem("description", str);
  const stringArray = str.split("\n");
  const pasteReadyHTML = addHTML(stringArray);
  localStorage.setItem("HTMLdescription", pasteReadyHTML);
  localStorage.setItem("preview", pasteReadyHTML);
  output.value = pasteReadyHTML;
  preview.innerHTML = pasteReadyHTML;
});

retrieveFromLocalStorage();
