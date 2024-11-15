"use strict"

document.addEventListener("DOMContentLoaded", () => {
  // tabs start
  const tabHeaders = document.querySelectorAll(".tabheader__item");
  const tabHeadersParent = document.querySelector(".tabheader__items");
  const tabContents = document.querySelectorAll(".tabcontent");

  function hideTabContent() {
    tabContents.forEach(item => {
      item.classList.add("hide");
      item.classList.remove("show", "fade");
    });

    tabHeaders.forEach(item => {
      item.classList.remove("tabheader__item_active");
    });
  }

  function showTabContent(i = 0) {
    tabContents[i].classList.add("show", "fade");
    tabContents[i].classList.remove("hide");
    tabHeaders[i].classList.add("tabheader__item_active");
  }

  hideTabContent();
  showTabContent();

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
  // tabs end

  // timer start
  const deadline = "2024-12-31 23:59";

  const setZero = n => n >= 0 && n < 10 ? `0${n}` : n; 

  function getTimeRemaining(endtime) {
    let days, hours, minutes, seconds;
    const total = Date.parse(endtime) - Date.parse(new Date());

    if (total <= 0) {
      days = 0;
      hours = 0;
      minutes = 0;
      seconds = 0;
    }
    
    else {
      days = Math.floor(total / (1000 * 60 * 60 * 24));
      hours =  Math.floor((total / (1000 * 60 * 60) % 24));
      minutes = Math.floor((total / 1000 / 60) % 60);
      seconds = Math.floor((total / 1000) % 60);
    }

    return { total, days, hours, minutes, seconds};
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
      const { total, days, hours, minutes, seconds } = getTimeRemaining(endtime);
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
  // timer end

  // modal start
  const modalOpenTriggers = document.querySelectorAll("[data-modal-trigger]");
  const modal = document.querySelector(".modal");

  function showModal() {
    modal.classList.remove("hide");
    modal.classList.add("show");
    document.body.style.overflowY = "hidden";
    clearTimeout(modalTimerID);
  }

  function closeModal() {
    modal.classList.remove("show");
    modal.classList.add("hide");
    document.body.style.overflowY = "auto";
  }

  modalOpenTriggers.forEach(btn => btn.addEventListener("click", showModal));
  modal.addEventListener("click", (e) => {
    if (e.target && e.target === modal || e.target.getAttribute("data-modal-close") == "") {
      closeModal();
    }
  });

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.matches(".show")) {
      closeModal();
    }
  });

  const modalTimerID = setTimeout(showModal, 60000);

  function showModalByScroll() {
    if (window.scrollY + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
      showModal();
      window.removeEventListener("scroll", showModalByScroll);
    }
  }

  window.addEventListener("scroll", showModalByScroll);
  // modal end

  // menu start
  class MenuCard {
    constructor(imgSrc, title, descr, price) {
      this.imgSrc = imgSrc;
      this.title = title;
      this.descr = descr;
      this.price = price;
      this.transfer = 41.22;
      this.changeToUAH();
    }

    changeToUAH() {
      // this.price = this.price * this.transfer;
      this.price *= this.transfer;
    }

    render () {
      const elem = document.querySelector(".menu__field .container");
      const { imgSrc, title, descr, price } = this;
      elem.innerHTML += `
        <div class="menu__item">
          <img src="${imgSrc}" alt="${title}">
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

  getData("http://localhost:8888/get-menu")
    .then(data => {
      data.map(({ image, title, description, price }) => {
        return new MenuCard(`img/tabs/${image}`, title, description, price).render()
      })
    })
  // menu end

  // forms start
  const forms = document.querySelectorAll("form");

  const messages = {
    loading: "<span class=\"loader\"></span>",
    success: "Success...",
    failure: "Failure..."
  };

  forms.forEach(form => addUserInfo(form));

  function addUserInfo(form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      const statusMessage = document.createElement("p");
      statusMessage.classList.add("status_message");
      statusMessage.innerHTML = messages.loading;
      form.append(statusMessage);

      postData("http://localhost:8888/add-user-info/", new FormData(form))
        .then(data => {
          console.log(data);
          statusMessage.textContent = messages.success;
          statusMessage.remove();
          showResponseModal(messages.success);
        })
        .catch(e => {
          showResponseModal(messages.failure);
          console.log(e);
        })
        .finally(() => form.reset());
    });
  }

  function showResponseModal(message) {
    const prevModalDialog = document.querySelector(".modal__dialog");
    prevModalDialog.classList.add("hide");
    showModal();

    const showResponseModalElem = document.createElement("div");
    showResponseModalElem.classList.add("modal__dialog");
    showResponseModalElem.innerHTML = `
      <div class="modal__content">
        <div data-modal-close="" class="modal__close">×</div>
        <div class="modal__title">${message}</div>
      </div>
    `;

    document.querySelector(".modal").append(showResponseModalElem);

    setTimeout(() => {
      showResponseModalElem.remove();
      prevModalDialog.classList.remove("hide");
      prevModalDialog.classList.add("show");
      closeModal();
    }, 1500);
  }
  // forms end

  // slider start
  const slider = document.querySelector(".offer__slider");
  const slides = document.querySelectorAll(".offer__slide");
  const prev = document.querySelector(".offer__slider-prev");
  const next = document.querySelector(".offer__slider-next");
  const total = document.querySelector("#total");
  const current = document.querySelector("#current");
  const sliderInner = document.querySelector(".offer__slider-inner");
  const sliderWrapper = document.querySelector(".offer__slider-wrapper");
  
  // carousel version
  const width = window.getComputedStyle(sliderWrapper).width;
  let slideIndex = 1;
  let offset = 0;

  if (slides.length < 10) {
    total.textContent = `0${slides.length}`;
    current.textContent = `0${slideIndex}`;
  }
  
  else {
    total.textContent = slides.length;
    current.textContent = slideIndex;
  }

  sliderInner.style.width = 100 * slides.length + "%";
  sliderInner.style.display = "flex";
  sliderInner.style.transition = "0.5s all";

  sliderWrapper.style.overflow = "hidden";
  slides.forEach(slide => slide.style.width = width);

  slider.style.position = "relative";

  const dots = document.createElement("ul");
  const dotsArrar = [];
  dots.classList.add("carousel-dots");
  slider.append(dots);

  for (let i = 0; i < slides.length; i++) {
    const dot = document.createElement("li");
    dot.setAttribute("data-slide-to", i + 1);
    dot.classList.add("dot");

    if (i === 0) {
      dot.style.opacity = 1;
    }
    dots.append(dot);
    dotsArrar.push(dot);
  }

  next.addEventListener("click", () => {
    if (offset == parseFloat(width) * (slides.length - 1)) {
      offset = 0;
    } else {
      offset += parseFloat(width);
    }
    
    sliderInner.style.transform = `translateX(-${offset}px)`;

    if (slideIndex == slides.length) {
      slideIndex = 1;
    } else {
      slideIndex++;
    }

    if (slides.length < 10) {
      current.textContent = `0${slideIndex}`;
    } else {
      current.textContent = slideIndex;
    }

    dotsArrar.forEach(dot => dot.style.opacity = "0.5");
    dotsArrar[slideIndex - 1].style.opacity = "1";
  });

  prev.addEventListener("click", () => {
    if (offset == 0) {
      offset = parseFloat(width) * (slides.length - 1);
    } else {
      offset -= parseFloat(width);
    }
    
    sliderInner.style.transform = `translateX(-${offset}px)`;

    if (slideIndex == 1) {
      slideIndex = slides.length;
    } else {
      slideIndex--;
    }

    if (slides.length < 10) {
      current.textContent = `0${slideIndex}`;
    } else {
      current.textContent = slideIndex;
    }

    dotsArrar.forEach(dot => dot.style.opacity = "0.5");
    dotsArrar[slideIndex - 1].style.opacity = "1";
  });

  dotsArrar.forEach(dot => {
    dot.addEventListener("click", (e) => {
      const slideTo = parseInt(e.target.dataset.slideTo);

      slideIndex = slideTo;
      offset = parseFloat(width) * (slideTo - 1);
      sliderInner.style.transform = `translateX(-${offset}px)`;

      if (slides.length < 10) {
        current.textContent = `0${slideIndex}`;
      } else {
        current.textContent = slideIndex;
      }

      dotsArrar.forEach(dot => dot.style.opacity = "0.5");
      dotsArrar[slideIndex - 1].style.opacity = "1";
    });
  });

  // simple version
  // let slideIndex = 1;

  // showSlides(slideIndex);
  
  // if (slides.length < 10) {
  //   total.textContent = `0${slides.length}`;
  // } else {
  //   total.textContent = slides.length;
  // }

  // function showSlides(i) {
  //   if (i > slides.length) {
  //     slideIndex = 1;
  //   }

  //   if (i < 1) {
  //     slideIndex = slides.length;
  //   }

  //   slides.forEach(slide => slide.style.display = "none");
  //   slides[slideIndex - 1].style.display = "block";

  //   if (slides.length < 10) {
  //     current.textContent = `0${slideIndex}`;
  //   } else {
  //     current.textContent = slideIndex;
  //   }
  // }

  // function changeSlideIndex(i) {
  //   showSlides(slideIndex += i);
  // }

  // prev.addEventListener("click", () => changeSlideIndex(-1));
  // next.addEventListener("click", () => changeSlideIndex(1));
 
  // slider end

  // global function start
  async function postData(url, data) {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(Object.fromEntries(data))
    });

    return await res.json();
  }

  async function getData(url) {
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(`Error: ${res.statusText}`);
    }

    return res.json();
  }
  // global function end
});