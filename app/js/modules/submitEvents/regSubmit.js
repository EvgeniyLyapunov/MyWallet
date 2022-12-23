"use strickt";

import tippy from 'tippy.js';
import JustValidate from 'just-validate';
import swal from 'sweetalert';

import {postData} from "../../services/dataBaseQueries";
import {toMainScreen} from "./../modal";
import {userNickOnMainScreen} from "./../userNickOnMainScreen";

// функция обрабатывает нажатие на кнопку "зарегистрироваться"
function regSubmit(formSelector, btnSelector, urlPath) {
  const form = document.querySelector(formSelector),
        submit = document.querySelector(btnSelector),
        inputs = form.querySelectorAll("input");

  tippy('#modalRegCheckboxInfo', {
    content: 'Усли вы выбираете "Запомнить меня", ваша авторизация сохраняется даже при закрытии страницы и браузера, до тех пор пока вы не выйдете из аккаунта. Если вы снимите галочку, то ваш вход будет сохраняться до закрытия страницы.'
  });
      
  const validate = new JustValidate(formSelector, {
    errorFieldCssClass: 'is-invalid',
    errorFieldStyle: {
      border: '1px solid #FF5C00'
    },
    errorLabelCssClass: 'is-label-invalid',
    errorLabelStyle: {
      color: '#FF5C00'
    },
    focusInvalidField: true,
    lockForm: true
  });

  validate
  .addField("#reg-name", [
    {
      rule: 'customRegexp',
      value: /^[a-zа-яё]+$/i,
      errorMessage: 'Ник должен состоять только из букв',
    },
    {
      rule: 'required',
      errorMessage: 'Обязательное поле',
    },
    {
      rule: 'minLength',
      value: 2,
      errorMessage: 'Слишком короткий ник'
    },
    {
      rule: 'maxLength',
      value: 15,
      errorMessage: 'Максимум 15 букв - длина ника'
    }
  ])
  .addField("#reg-pass", [
    {
      rule: 'required',
      errorMessage: 'Обязательное поле',
    },
    {
      rule: 'minLength',
      value: 5,
      errorMessage: 'Слишком короткий пароль'
    }
  ])
  .addField("#reg-confirm-pass", [
    {
      rule: 'required',
      errorMessage: 'Обязательное поле',
    },
    {
      validator: (value, fields) => {
        if (fields['#reg-pass'] && fields['#reg-pass'].elem) {
          const repeatPasswordValue = fields['#reg-pass'].elem.value;
  
          return value === repeatPasswordValue;
        }
  
        return true;
      },
      errorMessage: 'Пароль должен быть тем же',
    },
  ]);

  // здесь событие потери фокуса с инпутов сбрасывает сообщения об ошибке ввода
  inputs.forEach(item => {
    item.addEventListener("blur", () => {
      validate.refresh();
    });
    item.addEventListener("focus", () => {
      validate.refresh();
    });
  });

    
  submit.addEventListener("click", (e) =>  {
    // если валидация успешна
    validate.onSuccess(async () => {

      e.preventDefault();

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
        swal({
          text: `${answer.status}`,
          icon: 'error',
        }).then((value) => {
          form.reset();
          toMainScreen();
        });
      }
    });
  });
}

export default regSubmit;