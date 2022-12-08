'use strict';

import JustValidate from 'just-validate';
import swal from 'sweetalert';

import {postData} from "../../../services/dataBaseQueries";
import pressBtn from "../../buttonPressAnim";
import { openViewBalansWindow } from '../../viewBalance';

const form = document.querySelector('#edit-wallet-balance-form');
let currentCard = {};
let validate;

function changeBalance(card) {
  currentCard = card;
  const currentName = document.querySelector('#edit-wallet-current-name');
  currentName.textContent = `${currentCard.name}`;

  if(validate != undefined) {
    validate.destroy();
  }
  // валидация формы
  validate = new JustValidate("#edit-wallet-balance-form", {
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

  validate.addField("#edit-wallet-input-balance", [
    {
      rule: 'required',
      errorMessage: 'Обязательное поле'
    },
  ]);
}

function changeBalanceSubmit(e) {
  pressBtn(e.target);

  validate.onSuccess(async () =>{
    e.preventDefault();

    const formData = new FormData(form);
    // обЪект  для дополнения к данным из формы 
    let balanceUpdate = Object.fromEntries(formData.entries());
    balanceUpdate.id = currentCard.id;
    balanceUpdate.userId = currentCard.userId;
    const json = JSON.stringify(balanceUpdate);

    let answer = await postData('server/updateBalance.php', json);

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

export {changeBalance, changeBalanceSubmit};