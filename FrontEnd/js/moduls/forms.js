import { closeModal, showModal } from "./modal";
import { postData } from "../services/api";

export default function forms(modalTimerID) {
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
    showModal(".modal", modalTimerID);

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
      closeModal(".modal");
    }, 1500);
  }
}