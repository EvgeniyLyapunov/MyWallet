"use strict";

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
  const nickElem = document.createElement("div");
  nickElem.textContent = `${nickname}`;
  nickElem.classList.add("nickname-style");
  document.querySelector(".header__logo").insertAdjacentElement("afterend", nickElem);
}

export {userNickOnMainScreen};