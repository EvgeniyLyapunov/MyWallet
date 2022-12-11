'use strict';

import swal from 'sweetalert';

import {postData} from "../../../services/dataBaseQueries";
import pressBtn from "../../buttonPressAnim";
import { openViewBalansWindow } from '../../viewBalance';

const form = document.querySelector('#edit-wallet-money-form');
let currentCard = {};

function changeMoney(card) {
  currentCard = card;
  const currentMoney = document.querySelector('#edit-wallet-current-money');
  currentMoney.textContent = `${currentCard.moneyType}`;
}

async function changeMoneySubmit(e) {
  pressBtn(e.target);

  e.preventDefault();

  const formData = new FormData(form);
  // обЪект  для дополнения к данным из формы 
  let moneyUpdate = Object.fromEntries(formData.entries());

  if(moneyUpdate.money == undefined) {
    currentCard = {};
    openViewBalansWindow();
    return;
  }

  moneyUpdate.id = currentCard.id;
  moneyUpdate.userId = currentCard.userId;
  const json = JSON.stringify(moneyUpdate);

  let answer = await postData('server/updateMoney.php', json);

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
}

export {changeMoney, changeMoneySubmit}