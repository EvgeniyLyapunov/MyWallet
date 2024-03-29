"use strict";

import pressBtn from "./buttonPressAnim";
import {burgerClose} from "./burger";
import { newStorageViewToStart } from "./submitEvents/newStorageSubmit";


const mainSection = document.querySelector("main"),
      footerSection = document.querySelector("#footer-container"),
      toHomeBtn = document.querySelector(".btn-to-home"),
      forms = document.querySelectorAll("form"),
      modalWindows = document.querySelectorAll(".modal");

function openAuthModals(btn, modalW) {
  const button = document.querySelector(btn),
        modal = document.querySelector(modalW);

  button.addEventListener("click", (e) => {
    e.preventDefault();
    pressBtn(e.target);

    // кнопка Выход в бургер меню
    if(e.target.id == "to-log-btn" && e.target.textContent == "Выход") {
      localStorage.clear();
      sessionStorage.clear();
      const div = document.querySelector(".nickname-style");
      if(div) {
        div.remove();
      }
      forms.forEach(item => item.reset());
      burgerClose();
      toMainScreen();
      return;
    }

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

    forms.forEach(item => item.reset());
    burgerClose();
  });
}

function backHomeByHomeButton() {
  //кнопка в футере - домой
  toHomeBtn.addEventListener("click", (e) => {
    e.preventDefault();
    pressBtn(e.target);

    setTimeout(() => {
      modalWindows.forEach(window => {
        window.classList.add("hide");
        window.classList.remove("visible", "animate__animated", "animate__fadeIn");
      });
      forms.forEach(item => item.reset());
      newStorageViewToStart();
      mainSection.classList.remove("hide");
      mainSection.classList.add("animate__animated", "animate__fadeIn");
      footerSection.classList.remove("footer__container");
      toHomeBtn.classList.add("hide");
    }, 300);
  });
}

function toMainScreen() {
  modalWindows.forEach(window => {
    window.classList.add("hide");
    window.classList.remove("visible", "animate__animated", "animate__fadeIn");
  });
  forms.forEach(item => item.reset());
  mainSection.classList.remove("hide");
  mainSection.classList.add("animate__animated", "animate__fadeIn");
  footerSection.classList.remove("footer__container");
  toHomeBtn.classList.add("hide");
}

export {openAuthModals, toMainScreen, backHomeByHomeButton};