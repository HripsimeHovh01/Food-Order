"use strict"

document.addEventListener("DOMContentLoaded", () =>{
    const tabHeaders = document.querySelectorAll(".tabheader__item");
    const tabHeadersParent = document.querySelector(".tabheader__items");
    const tabContents = document.querySelectorAll(".tabcontent");

    hideTabContent();
    showTabContent ();

function hideTabContent() {
tabContents.forEach(item => {
    item.classList.add("hide");
    item.classList.remove("show", "fade");
})
tabHeaders.forEach (item => {
    item.classList.remove("tabheader__item_active");
});
}

function showTabContent (i = 0) {
tabContents[i].classList.add("show", "fade");
tabContents[i].classList.remove("hide");

tabHeaders[i].classList.add("tabheader__item_active");
}



tabHeadersParent.addEventListener("click", (e) =>{
if (e.target && e.target.matches(".tabheader__item")){
tabHeaders.forEach((item, index) => {
    if (e.target == item) {
        hideTabContent();
        showTabContent(index);
    }
});
}
});

})