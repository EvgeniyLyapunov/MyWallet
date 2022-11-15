"use strict";

function checkAuth() {
  let userNick;
  if(localStorage.getItem("userData")) {
    userNick = JSON.parse(localStorage.getItem("userData")).nickname;
  } else if(sessionStorage.getItem("userData")) {
    userNick = JSON.parse(sessionStorage.getItem("userData")).nickname;
  } else {
    return false;
  }
  return userNick;
}

export default checkAuth;