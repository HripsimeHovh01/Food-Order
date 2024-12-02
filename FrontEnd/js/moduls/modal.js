export function showModal(modalSelector, modalTimerID) {
    const modalWrapper = document.querySelector(modalSelector);
  
    modalWrapper.classList.remove("hide");
    modalWrapper.classList.add("show");
    document.body.style.overflowY = "hidden";
    if (modalTimerID) {
      clearTimeout(modalTimerID);
    }
  }
  
  export function closeModal(modalSelector) {
    const modalWrapper = document.querySelector(modalSelector);
  
    modalWrapper.classList.remove("show");
    modalWrapper.classList.add("hide");
    document.body.style.overflowY = "auto";
  }
  
  export default function modal(triggerSelector, modalSelector, modalTimerID) {
    const modalOpenTriggers = document.querySelectorAll(triggerSelector);
    const modalWrapper = document.querySelector(modalSelector);
  
    modalOpenTriggers.forEach(btn => btn.addEventListener("click", () => showModal(modalSelector, modalTimerID)));
    modalWrapper.addEventListener("click", (e) => {
      if (e.target && e.target === modalWrapper || e.target.getAttribute("data-modal-close") == "") {
        closeModal(modalSelector);
      }
    });
  
    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && modalWrapper.matches(".show")) {
        closeModal(modalSelector);
      }
    });
  
    function showModalByScroll() {
      if (window.scrollY + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
        showModal(modalSelector, modalTimerID);
        window.removeEventListener("scroll", showModalByScroll);
      }
    }
  
    window.addEventListener("scroll", showModalByScroll);
  }