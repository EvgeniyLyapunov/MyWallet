"use strict";

import JustValidate from 'just-validate';
import {postData} from "../../services/dataBaseQueries";
import {toMainScreen} from "./../modal";

function newStorageSubmit() {
  const form = document.querySelector(".new-storage__form"),
        inputs = form.querySelectorAll("input"),
        btnSubmit = form.querySelector(".new-storage__save-btn");

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
  .addRequiredGroup('#money-type-group');
 
  inputs.forEach(item => {
    item.addEventListener("blur", () => {
      validate.refresh();
    });
  });

  btnSubmit.addEventListener("click", (e) => {
    validate.onSuccess(async () => {
      e.preventDefault();

      const formData = new FormData(form);
      let newStorageData = Object.fromEntries(formData.entries());

      if(localStorage.getItem("userData")) {
        newStorageData.userId = JSON.parse(localStorage.getItem("userData")).id;
      } else if(sessionStorage.getItem("userData")) {
        newStorageData.userId = JSON.parse(localStorage.getItem("userData")).id;
      }

      const now = new Date();
      var options = {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
      };
      newStorageData.lastModifiedDate = now.toLocaleString("ru", options);

      console.log(newStorageData);



      const json = JSON.stringify(Object.fromEntries(formData.entries()));

      // console.log(Object.fromEntries(formData.entries()));

      // let answer = await postData("server/newstorage.php", json);
    });
  });
  


}

export default newStorageSubmit;