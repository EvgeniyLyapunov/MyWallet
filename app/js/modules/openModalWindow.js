"use strict";

const mainSection = document.querySelector("main"),
      footerSection = document.querySelector("#footer-container"),
      toHomeBtn = document.querySelector(".btn-to-home"),
      modalWindows = document.querySelectorAll(".modal");

// функция закрывает все открытые модальные окна и открывает одно нужное
function openModalWindow(window) {
  const modal = document.querySelector(window);

  modalWindows.forEach(item => {
    item.classList.add("hide");
    item.classList.remove("visible", "animate__animated", "animate__fadeIn");
  });

  modal.classList.add("visible", "animate__animated", "animate__fadeIn");
  mainSection.classList.add("hide");
  mainSection.classList.remove("animate__animated", "animate__fadeIn");
  footerSection.classList.add("footer__container");
  toHomeBtn.classList.remove("hide");
}

export default openModalWindow;