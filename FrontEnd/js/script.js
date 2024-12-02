"use strict"

import tabs from "./modules/tabs.js";
import modal from "./modules/modal.js";
import timer from "./modules/timer.js";
import menu from "./modules/menu.js";
import calc from "./modules/calc.js";
import forms from "./modules/forms.js";
import slider from "./modules/slider.js";

import { showModal } from "./modules/modal.js";

document.addEventListener("DOMContentLoaded", () => {
  const modalTimerID = setTimeout(() => showModal(".modal", modalTimerID), 60000);

  tabs();
  modal("[data-modal-trigger]", ".modal", modalTimerID);
  timer();
  menu();
  calc();
  forms(modalTimerID);
  slider();
});