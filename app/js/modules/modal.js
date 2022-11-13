"use strict";

import pressBtn from "./buttonPressAnim";
import {burgerClose} from "./burger";


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

function toMainScreen() {
  modalWindows.forEach(window => {
    window.classList.add("hide");
    window.classList.remove("visible");
  });
  mainSection.classList.remove("hide");
  footerSection.classList.remove("footer__container");
  toHomeBtn.classList.add("hide");
}



export {openModal, toMainScreen};