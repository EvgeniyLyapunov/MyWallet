'use strict';

import swal from 'sweetalert';

import {postData} from "../../../services/dataBaseQueries";
import pressBtn from "../../buttonPressAnim";
import { openViewBalansWindow } from '../../viewBalance';
import getDataFromStorage from '../../../services/getDataFromStorage';

let currentCard = {};

function changeDelete(card) {
  currentCard = card;
  const currentName = document.querySelector('#delete-wallet-current-name');
  currentName.textContent = `${currentCard.name}`;
}

async function deleteSubmit(e) {
  pressBtn(e.target);

  let walletDelete = {id: currentCard.id, userId: currentCard.userId};

  const data = getDataFromStorage();
  const virtCard = data.filter(item => {
    if(item.baseStorageId === walletDelete.id) {
      return item.id;
    }
  }).map(item => item.id);

  walletDelete.virts = virtCard;

  const json = JSON.stringify(walletDelete);

  let answer = await postData('server/delete.php', json);

  if(answer.status === "ok") {
    // модальное окошко что всё сохранилось успешно
    swal({
      title: `${answer.status}`,
      buttons: false,
      timer: 1500,
      icon: "success",
    });

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
  }
  openViewBalansWindow();
}

function cancelSubmit(e) {
  pressBtn(e.target);
  currentCard = {};
  openViewBalansWindow();
}

export {changeDelete, deleteSubmit, cancelSubmit};