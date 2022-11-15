"use strickt";

import {postData} from "../../services/dataBaseQueries";
import {toMainScreen} from "./../modal";
import {userNickOnMainScreen} from "./../userNickOnMainScreen";

function logSubmit(formSelector, btnSelector, urlPath) {
  const form = document.querySelector(formSelector),
        submit = document.querySelector(btnSelector);

  submit.addEventListener("click", async (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const json = JSON.stringify(Object.fromEntries(formData.entries()));
    let rememberMe;

    if(JSON.parse(json).rememberMeCheck) {
      rememberMe = true;
    } else {
      rememberMe = false;
    }

    console.log(Object.fromEntries(formData.entries()));
    console.log(rememberMe);

    let answer = await postData(urlPath, json);

    if(answer.status === "ok") {
      if(rememberMe) {
        localStorage.setItem("userData", `${JSON.stringify(answer)}`);
        form.reset();
        userNickOnMainScreen();
        toMainScreen();
      } else {
        sessionStorage.setItem("userData", `${JSON.stringify(answer)}`);
        form.reset();
        userNickOnMainScreen();
        toMainScreen();
      }
    } else {
      // TODO написать окошко с сообщением о неудачной попытке регистрации на сервере
      alert(answer.status);
      form.reset();
      toMainScreen();
    }
  });
}

export default logSubmit;