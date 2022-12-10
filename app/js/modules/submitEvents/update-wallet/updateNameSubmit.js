'use strict';

import JustValidate from 'just-validate';
import swal from 'sweetalert';

import {postData} from "../../../services/dataBaseQueries";
import pressBtn from "../../buttonPressAnim";
import { openViewBalansWindow } from '../../viewBalance';

const form = document.querySelector('#edit-wallet-name-form');
let currentCard = {};
let validate;

function changeName(card) {
  currentCard = card;
  const currentName = document.querySelector('#edit-wallet-current-name');
  currentName.textContent = `${currentCard.name}`;

  if(validate != undefined) {
    validate.destroy();
  }
  // валидация формы
  validate = new JustValidate("#edit-wallet-name-form", {
    errorFieldCssClass: 'is-invalid-new-st',
    errorFieldStyle: {
      border: '1px solid #FF5C00'
    },
    errorLabelCssClass: 'is-label-invalid-new-st',
    errorLabelStyle: {
      marginTop: '-24px',
      color: '#FF5C00'
    },
    focusInvalidField: true,
    lockForm: true
  });

  validate.addField("#edit-wallet-input-name", [
    {
      rule: 'required',
      errorMessage: 'Обязательное поле'
    },
    {
      rule: 'maxLength',
      value: 15,
      errorMessage: 'Длина названия - максимум 15 букв'
    }
  ]);
}

function changeNameSubmit(e) {
  pressBtn(e.target);

  validate.onSuccess(async () =>{
    e.preventDefault();

    const formData = new FormData(form);
    // обЪект  для дополнения к данным из формы 
    let nameUpdate = Object.fromEntries(formData.entries());
    nameUpdate.id = currentCard.id;
    nameUpdate.userId = currentCard.userId;
    const json = JSON.stringify(nameUpdate);

    let answer = await postData('server/updateName.php', json);

    if(answer.status === "ok") {
      // модальное окошко что всё сохранилось успешно
      swal({
        title: `${answer.status}`,
        buttons: false,
        timer: 1500,
        icon: "success",
      });

      form.reset();
      currentCard = {};

      if(localStorage.getItem("balanceData")) {
        localStorage.setItem("balanceData", `${JSON.stringify(answer.data)}`);
      } else  {
        sessionStorage.setItem("balanceData", `${JSON.stringify(answer.data)}`);
      }

    } else {
    // модальное окошко что всё неуспешно
      swal({
        title: `${answer.status}`,
        buttons: false,
        timer: 1500,
        icon: "error",
      });
      form.reset();
    }
    openViewBalansWindow();
  });
}

export {changeName, changeNameSubmit};