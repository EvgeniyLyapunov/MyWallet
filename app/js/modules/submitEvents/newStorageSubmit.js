"use strict";

import JustValidate from 'just-validate';
import swal from 'sweetalert';

import {postData} from "../../services/dataBaseQueries";
import pressBtn from "../../modules/buttonPressAnim";
import {toMainScreen} from "./../modal";


function newStorageSubmit() {
  const form = document.querySelector(".new-storage__form"),
        inputs = form.querySelectorAll("input"),
        btnSubmit = form.querySelector(".new-storage__save-btn");
  let storage;

  // валидация формы

  const validate = new JustValidate("#newStorageForm", {
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
  .addField("#newStorageName", [
    {
      rule: 'required',
      errorMessage: 'Обязательное поле'
    },
    {
      rule: 'maxLength',
      value: 15,
      errorMessage: 'Длина названия - максимум 15 букв'
    }
  ])
  .addRequiredGroup('#money-type-group', 'Обязательное поле');
 
  inputs.forEach(item => {
    item.addEventListener("blur", () => {
      validate.refresh();
    });
  });

  // обработка click "Сохранить"

  btnSubmit.addEventListener("click", (e) => {
    validate.onSuccess(async () => {
      e.preventDefault();
      pressBtn(e.target);

      const formData = new FormData(form);

      // обЪект нового хранилища для дополнения данных из формы 
      let newStorageData = Object.fromEntries(formData.entries());

      // добавляю id пользователя
      if(localStorage.getItem("userData")) {
        storage = 'localStorage';
        newStorageData.userId = JSON.parse(localStorage.getItem("userData")).id;
      } else if(sessionStorage.getItem("userData")) {
        storage = 'sessionStorage';
        newStorageData.userId = JSON.parse(sessionStorage.getItem("userData")).id;
      }

      // добавляю время последнего изменения (здесь - создания)
      const now = new Date();
      var options = {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
      };
      newStorageData.lastModifiedDate = now.toLocaleString("ru", options).toString();

      // Json для отправки на сервер в базу данных
      const json = JSON.stringify(newStorageData);

      // отправка на сервер и получение в ответ список всех хранилищ включая созданное
      let answer = await postData("server/newstorage.php", json);

      if(answer.status === "ok") {
        // модальное окошко что всё сохранилось успешно
        swal({
          title: `${answer.status}`,
          buttons: false,
          timer: 1500,
          icon: "success",
        });

        form.reset();

        if(storage === 'localStorage') {
          localStorage.setItem("balanceData", `${JSON.stringify(answer.data)}`);
        } else {
          sessionStorage.setItem("balanceData", `${JSON.stringify(answer.data)}`);
        }

      }else {
        // модальное окошко что всё неуспешно
        swal({
          title: `${answer.status}`,
          buttons: false,
          timer: 1500,
          icon: "error",
        });
      }
    });
  });
}

export default newStorageSubmit;