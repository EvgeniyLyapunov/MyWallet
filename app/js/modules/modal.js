"use strict";

import pressBtn from "./buttonPressAnim";
import {burgerClose} from "./burger";

function modal() {

  const mainSection = document.querySelector("main"),
        footerSection = document.querySelector("#footer-container"),
        toHomeBtn = document.querySelector(".btn-to-home"),
        modalWindows = document.querySelectorAll(".modal");
    
  // функция открытия модального окна
  function openModal(btn, modalW, ...close) {
    const button = document.querySelector(btn),
          modal = document.querySelector(modalW);

    button.addEventListener("click", (e) => {
      e.preventDefault();
      pressBtn(e.target);
      setTimeout(() => {
        modalWindows.forEach(window => {
          window.classList.add("hide");
          window.classList.remove("visible");
        });
        modal.classList.add("visible");
        mainSection.classList.add("hide");
        footerSection.classList.add("footer__container");
        toHomeBtn.classList.remove("hide");
      }, 300);

      if(close.length != 0) {
        burgerClose(".header__menu-close", ".header__menu");
      }
    });
  }

  // открытие модального окна просмотра баланса
  openModal("#viewBalance", ".modal-show");

  // открытие модального окна внесения изменений
  openModal("#addChanges", ".modal-changes");

  // открытие модального окна создания нового хранилища
  openModal(".modal-changes__new-storage-btn", ".new-storage");

  // открытие модального окна внесения изменений из окна создания нового хранилища
  openModal(".new-storage__modal-changes-btn", ".modal-changes");

  // открытие модального окна входа/выхода в аккаунт
  openModal("#to-log-btn", ".modal-log", true);

  // открытие модального окна регистрации аккаунта
  openModal("#to-reg-btn", ".modal-reg", true);

  //кнопка в футере - домой
  toHomeBtn.addEventListener("click", (e) => {
    e.preventDefault();
    pressBtn(e.target);
    setTimeout(() => {
      modalWindows.forEach(window => {
        window.classList.add("hide");
        window.classList.remove("visible");
      });
      mainSection.classList.remove("hide");
      footerSection.classList.remove("footer__container");
      toHomeBtn.classList.add("hide");
    }, 300);
  });
}

export default modal;