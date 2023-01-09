"use strict";
import openModalWindow from './openModalWindow';
import {log} from './logging';

function userNickOnMainScreen() {
  if(localStorage.getItem("userData")) {
    const nick = JSON.parse(localStorage.getItem("userData")).nickname;
    createNickElement(nick);
  } else if(sessionStorage.getItem("userData")) {
    const nick = JSON.parse(sessionStorage.getItem("userData")).nickname;
    createNickElement(nick);
  }
}

function createNickElement(nickname) {
  const div = document.querySelector(".nickname-style");
  if(div) {
    div.remove();
  }
  const nickElem = document.createElement("div");
  nickElem.textContent = `${nickname}`;
  nickElem.classList.add("nickname-style");
  nickElem.addEventListener('click', () => {
    log();
    openModalWindow('.logging-modal');
  });
  document.querySelector(".header__logo").insertAdjacentElement("afterend", nickElem);
}

export {userNickOnMainScreen};