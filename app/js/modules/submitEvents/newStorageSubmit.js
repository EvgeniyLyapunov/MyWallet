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

  btnSubmit.addEventListener("click", (e) => {
    validate.onSuccess(async () => {
      e.preventDefault();
      pressBtn(e.target);

      const formData = new FormData(form);
      let newStorageData = Object.fromEntries(formData.entries());

      if(localStorage.getItem("userData")) {
        storage = 'localStorage';
        newStorageData.userId = JSON.parse(localStorage.getItem("userData")).id;
      } else if(sessionStorage.getItem("userData")) {
        storage = 'sessionStorage';
        newStorageData.userId = JSON.parse(sessionStorage.getItem("userData")).id;
      }

      const now = new Date();
      var options = {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
      };
      newStorageData.lastModifiedDate = now.toLocaleString("ru", options).toString();

      const json = JSON.stringify(newStorageData);

      let answer = await postData("server/newstorage.php", json);

      if(answer.status === "ok") {
        swal({
          buttons: false,
          timer: 1000,
          icon: "success",
        });
        // modal window 0k

        if(storage === 'localStorage') {
          localStorage.setItem("balanceData", `${JSON.stringify(answer.data)}`);
        }

      }
    });
  });
  


}

export default newStorageSubmit;