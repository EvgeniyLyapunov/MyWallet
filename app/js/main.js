"use strict";

import burger from "./modules/burger";
import modal from "./modules/modal";
import slider from "./modules/slider";
import logRegBtn from "./modules/logRegBtn";
import formSubmitOff from "./modules/submitEvents/formSubmitOff";
import registration from "./modules/registration";


  burger();
  modal();
  logRegBtn(".modal-log__modal-reg-btn", ".modal-reg", ".modal-log");
  logRegBtn(".modal-reg__modal-log-btn", ".modal-log", ".modal-reg");
  slider(".select-storage__item", ".select-storage__prev-btn", ".select-storage__next-btn");
  slider(".select-storage__new-item", ".select-storage__new-prev-btn", ".select-storage__new-next-btn");

  // отключение события submit при нажатие кнопки ввод с клавиатуры телефона и скрытие оной
  formSubmitOff(".modal-changes__form", ".modal-changes__input-amount");
  formSubmitOff(".new-storage__form", ".new-storage__input-name");
  formSubmitOff(".modal-log__form", "#log-name", "#log-pass");
  formSubmitOff("#reg-form", "#reg-name", "#reg-pass", "#reg-confirm-pass");

  registration();

  
