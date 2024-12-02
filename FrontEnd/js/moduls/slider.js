
export default function slider() {
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
  }
  