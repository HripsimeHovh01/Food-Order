"use strict";

document.addEventListener("DOMContentLoaded", () => {
  //tabs start
  const tabHeaders = document.querySelectorAll(".tabheader__item");
  const tabHeadersParent = document.querySelector(".tabheader__items");
  const tabContents = document.querySelectorAll(".tabcontent");

  hideTabContent();
  showTabContent();

  function hideTabContent() {
    tabContents.forEach((item) => {
      item.classList.add("hide");
      item.classList.remove("show", "fade");
    });
    tabHeaders.forEach((item) => {
      item.classList.remove("tabheader__item_active");
    });
  }

  function showTabContent(i = 0) {
    tabContents[i].classList.add("show", "fade");
    tabContents[i].classList.remove("hide");

    tabHeaders[i].classList.add("tabheader__item_active");
  }
  tabHeadersParent.addEventListener("click", (e) => {
    if (e.target && e.target.matches(".tabheader__item")) {
      tabHeaders.forEach((item, index) => {
        if (e.target == item) {
          hideTabContent();
          showTabContent(index);
        }
      });
    }
  });
  //tabs end
  
  //timer start
  const deadline = "2024-12-31 23:59";

  const setZero = (n) => (n >= 0 && n < 10 ? `0${n}` : n);

  function getTimeRemaining(endtime) {
    let days, hours, minutes, seconds;
    const total = Date.parse(endtime) - Date.parse(new Date());

    if (total <= 0) {
      days = 0;
      hours = 0;
      minutes = 0;
      seconds = 0;
    } else {
      days = Math.floor(total / (1000 * 60 * 60 * 24));
      hours = Math.floor((total / (1000 * 60 * 60)) % 24);
      minutes = Math.floor((total / 1000 / 60) % 60);
      seconds = Math.floor((total / 1000) % 60);
    }

    return { total, days, hours, minutes, seconds };
  }
  function setTimer(selector, endtime) {
    const timer = document.querySelector(selector);
    const daysElem = timer.querySelector("#days");
    const hoursElem = timer.querySelector("#hours");
    const minutesElem = timer.querySelector("#minutes");
    const secondsElem = timer.querySelector("#seconds");

    const timerID = setInterval(updateTimer, 1000);

    updateTimer();

    function updateTimer() {
      const { total, days, hours, minutes, seconds } =
        getTimeRemaining(endtime);
      daysElem.innerHTML = setZero(days);
      hoursElem.innerHTML = setZero(hours);
      minutesElem.innerHTML = setZero(minutes);
      secondsElem.innerHTML = setZero(seconds);

      if (total <= 0) {
        clearInterval(timerID);
      }
    }
  }
  setTimer(".timer", deadline);
  //tabs end

  //modal start
  const modalOpenTriggers = document.querySelectorAll("[data-modal-trigger]");
  const modalCloseTrigger = document.querySelector("[data-modal-close]");
  const modal = document.querySelector(".modal");

function showModal(){
  modal.classList.add("show");
  modal.classList.remove("hide");
  document.body.style.overflowY = "hidden";
  clearTimeout(modalTimerId);
};

  function closeModal(){
    modal.classList.remove("show");
    modal.classList.add("hide");
    document.body.style.overflowY = "auto";
  };

  modalOpenTriggers.forEach((btn) => {
    btn.addEventListener("click", showModal);
  });

  modalCloseTrigger.addEventListener("click", closeModal);

  modal.addEventListener("click", (e) => {
    if (e.target && e.target === modal) {
      closeModal();
    };
  });

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.matches (".show")) {
      closeModal()
    };
  });
  const modalTimerId = setTimeout(showModal, 5000); 
  function showModalByScroll (){
    if(window.scrollY + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
      showModal();
      window.removeEventListener("scroll", showModalByScroll)
  } }

  window.addEventListener("scroll", showModalByScroll);

  //modal end
});

// Menu start
class MenuItem {
  constructor(imgSrc, imgAlt, title, descr, price) {
    this.imgSrc = imgSrc;
    this.imgAlt = imgAlt;
    this.title = title;
    this.descr = descr;
    this.price = price;
    this.transfer = 41.22; // Exchange rate to UAH
    this.changeToUAH();
  }

  changeToUAH() {
    this.price *= this.transfer;
  }

  render() {
    const elem = document.querySelector(".menu__field .container");
    const { imgSrc, imgAlt, title, descr, price } = this;
    elem.innerHTML += `
      <div class="menu__item">
        <img src="${imgSrc}" alt="${imgAlt}">
        <h3 class="menu__item-subtitle">${title}</h3>
        <div class="menu__item-descr">${descr}</div>
        <div class="menu__item-divider"></div>
        <div class="menu__item-price">
          <div class="menu__item-cost">Цена:</div>
          <div class="menu__item-total"><span>${price.toFixed(2)}</span> грн/день</div>
        </div>
      </div>
    `;
  }
}

// Create instances of MenuItem
new MenuItem(
  "img/tabs/vegy.jpg",
  "vegy",
  "Меню \"Фитнес\"",
  `Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. 
   Это абсолютно новый продукт с оптимальной ценой и высоким качеством!`,
  5
).render();

new MenuItem(
  "img/tabs/elite.jpg",
  "elite",
  "Меню \"Премиум\"",
  `В меню “Премиум” мы используем не только красивый дизайн упаковки, 
   но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!`,
  11
).render();

new MenuItem(
  "img/tabs/post.jpg",
  "post",
  "Меню \"Постное\"",
  `Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля,
   овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.`,
  9
).render();

// Menu end

// Forms

const forms = document.querySelectorAll("form");

    const messages = {
        loading: "Loading...",
        success: "Accepted",
        failure: "Failed"
    }; 

    forms.forEach(form => postData(form))
    
    function postData(form) {
        form.addEventListener("submit", function(e) {
            e.preventDefault();

            const statusMessage = document.createElement("p")
            statusMessage.classList.add("status_message");
            statusMessage.textContent = messages.loading;
            form.append(statusMessage)
            const request = new XMLHttpRequest();
            request.open("POST", "server.php");
            
            // request.setRequestHeader('Content-type', 'multipart/form-data')
            request.setRequestHeader("Content-type", "application/json; charset=UTF-8")
            const data = JSON.stringify(Object.fromEntries(new FormData(form)))
            request.send(data)
            request.addEventListener("load", function () {
                if (request.status === 200) {
                    statusMessage.textContent = messages.success;
                    form.reset();
                    setTimeout(() => {
                        statusMessage.remove()
                    }, 2000);
                } else {
                    statusMessage.textContent = messages.failure
                }
            })
        });
    };