"use strict";

import burger from "./modules/burger";
import modal from "./modules/modal";
import slider from "./modules/slider";
import logRegBtn from "./modules/logRegBtn";

  burger();
  modal();
  logRegBtn(".modal-log__modal-reg-btn", ".modal-reg", ".modal-log");
  logRegBtn(".modal-reg__modal-log-btn", ".modal-log", ".modal-reg");
  slider(".select-storage__item", ".select-storage__prev-btn", ".select-storage__next-btn");
  slider(".select-storage__new-item", ".select-storage__new-prev-btn", ".select-storage__new-next-btn");

  const form = document.querySelector(".modal-changes__form");
  const input = document.querySelector(".modal-changes__input-amount");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    input.blur();
  });

