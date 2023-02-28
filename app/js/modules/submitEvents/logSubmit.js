"use strickt";

import tippy from 'tippy.js';

import {postData, getData} from "../../services/dataBaseQueries";
import {createCards} from "../viewBalance";
import {toMainScreen} from "./../modal";
import {userNickOnMainScreen} from "./../userNickOnMainScreen";

function logSubmit(formSelector, btnSelector, urlPath) {
  const form = document.querySelector(formSelector),
        submit = document.querySelector(btnSelector);

  tippy('#modalLogCheckboxInfo', {
    content: 'Если вы выбираете "Запомнить меня", ваша авторизация сохраняется даже при закрытии страницы и браузера, до тех пор пока вы не выйдете из аккаунта. Если вы снимите галочку, то ваш вход будет сохраняться до закрытия страницы.'
  });

  submit.addEventListener("click", async (e) => {
    e.preventDefault();
    submit.desabled = true;
    submit.classList.add('modal-log__btn-disable');

    const formData = new FormData(form);
    const json = JSON.stringify(Object.fromEntries(formData.entries()));
    let rememberMe;

    if(JSON.parse(json).rememberMeCheck) {
      rememberMe = true;
    } else {
      rememberMe = false;
    }

    let answer = await postData(urlPath, json);

    if(answer.status === "ok") {
      let data = await getData(`./server/getDataById.php?id=${answer.id}`);
      if(rememberMe) {
        localStorage.setItem("userData", `${JSON.stringify(answer)}`);
        data.data.length > 0 ? localStorage.setItem("balanceData", `${JSON.stringify(data.data)}`) : false;

        form.reset();
        submit.desabled = false;
        submit.classList.remove('modal-log__btn-disable');
        
        userNickOnMainScreen();
        toMainScreen();
        createCards();
      } else {
        sessionStorage.setItem("userData", `${JSON.stringify(answer)}`);
        data.data.length > 0 ? sessionStorage.setItem("balanceData", `${JSON.stringify(data.data)}`): false;

        form.reset();
        submit.desabled = false;
        submit.classList.remove('modal-log__btn-disable');

        userNickOnMainScreen();
        toMainScreen();
        createCards();
      }
    } else {
      swal({
        text: `${answer.status}`,
        icon: 'error',
      }).then((value) => {
        form.reset();
        submit.desabled = false;
        submit.classList.remove('modal-log__btn-disable');
        toMainScreen();
      });
    }
  });
}

export default logSubmit;