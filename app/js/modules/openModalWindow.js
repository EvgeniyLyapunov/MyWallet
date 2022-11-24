"use strict";

const mainSection = document.querySelector("main"),
      footerSection = document.querySelector("#footer-container"),
      toHomeBtn = document.querySelector(".btn-to-home"),
      modalWindows = document.querySelectorAll(".modal");

function openModalWindow(window) {
  const modal = document.querySelector(window);

  modalWindows.forEach(item => {
    item.classList.add("hide");
    item.classList.remove("visible");
  });

  modal.classList.add("visible");
  mainSection.classList.add("hide");
  footerSection.classList.add("footer__container");
  toHomeBtn.classList.remove("hide");
}

export default openModalWindow;