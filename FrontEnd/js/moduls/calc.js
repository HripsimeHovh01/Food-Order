export default function calc() {
    const calcResult = document.querySelector(".calculating__result span");
  
    let gender, height, weight, age, ratio;
  
    if (localStorage.getItem("gender")) {
      gender = localStorage.getItem("gender");
    } else {
      gender = "female";
      localStorage.setItem("gender", "female");
    }
  
    if (localStorage.getItem("ratio")) {
      ratio = parseFloat(localStorage.getItem("ratio"));
    } else {
      ratio = 1.375;
      localStorage.setItem("ratio", 1.375);
    }
  
    function initLocalConfig(selector, activeClass) {
      const elements = document.querySelectorAll(selector);
  
      elements.forEach(elem => {
        elem.classList.remove(activeClass);
  
        if (elem.id === localStorage.getItem("gender")) {
          elem.classList.add(activeClass);
        }
  
        if (elem.dataset.ratio === localStorage.getItem("ratio")) {
          elem.classList.add(activeClass);
        }
      });
    }
  
    initLocalConfig("#gender div", "calculating__choose-item_active");
    initLocalConfig(".calculating__choose_big div", "calculating__choose-item_active");
  
    function calcTotal() {
      if (!gender || !height || !weight || !age || !ratio) {
        calcResult.textContent = "_______";
        return;
      }
  
      if (gender === "female") {
        calcResult.textContent = ((655.1 + (9.563 * weight) + (1.85 * height) - (4.676 * age)) * ratio).toFixed(2);
      }
  
      else {
        calcResult.textContent = ((66.5 + (13.75 * weight) + (5.003 * height) - (6.775 * age)) * ratio).toFixed(2);
      }
    }
  
    calcTotal();
  
    function getStaticInfo(selector, activeClass) {
      const elements = document.querySelectorAll(selector);
      elements.forEach(elem => {
        elem.addEventListener("click", function (e) {
          if (e.target.getAttribute("data-ratio")) {
            ratio = parseFloat(e.target.dataset.ratio);
            localStorage.setItem("ratio", parseFloat(e.target.dataset.ratio));
          }
  
          else {
            gender = e.target.id;
            localStorage.setItem("gender", gender);
          }
  
          elements.forEach(elem => elem.classList.remove(activeClass));
          e.target.classList.add(activeClass);
          calcTotal();
        });
      });
    }
  
    getStaticInfo("#gender div", "calculating__choose-item_active");
    getStaticInfo(".calculating__choose_big div", "calculating__choose-item_active");
  
    function getDynamicInfo(selector) {
      const input = document.querySelector(selector);
  
      input.addEventListener("input", function () {
        if (input.value.match(/\D/g)) {
          input.style.border = "1px solid red";
        }
  
        else {
          input.style.border = "";
          switch (input.id) {
            case "height": parseFloat(height = input.value); break;
            case "weight": parseFloat(weight = input.value); break;
            case "age": parseFloat(age = input.value); break;
          }
          calcTotal();
        }
      });
    }
  
    getDynamicInfo("#height");
    getDynamicInfo("#weight");
    getDynamicInfo("#age");
  }