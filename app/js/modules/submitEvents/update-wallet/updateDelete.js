'use strict';

import swal from 'sweetalert';

import {postData} from "../../../services/dataBaseQueries";
import pressBtn from "../../buttonPressAnim";
import { openViewBalansWindow } from '../../viewBalance';
import getDataFromStorage from '../../../services/getDataFromStorage';
import {toMainScreen} from '../../modal';

let currentCard = {};
let data = [];
let virtCard = [];
const infoAboutVirtWallets = document.querySelector('.delete-modal__warning-infoAboutVirts');

function changeDelete(card) {

  // очищаем общие переменные и сообщения с возможного прошлого события
  currentCard = {};
  data = [];
  virtCard = [];
  infoAboutVirtWallets.textContent = '';

  currentCard = card;

  data = getDataFromStorage();
  virtCard = data.filter(item => {
    if(item.baseStorageId === currentCard.id) {
      return item.id;
    }
  }).map(item => item.id);

  const currentName = document.querySelector('#delete-wallet-current-name');
  currentName.textContent = `${currentCard.name}`;

  if(virtCard.length > 0) {
    let infoText = `У кошелька ${currentCard.name} есть`;
    infoText += (virtCard.length > 1) ? ` виртуальные кошельки.\n Они тоже будут удалены.` : ` виртуальный кошелёк. Он тоже будет удалён.`;
    infoAboutVirtWallets.textContent = infoText;
  }
}

async function deleteSubmit(e) {
  pressBtn(e.target);

  let walletDelete = {id: currentCard.id, userId: currentCard.userId};

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

  data = getDataFromStorage();

  if(data.length > 0) {
    currentCard = {};
    data = [];
    virtCard = [];
    openViewBalansWindow();
  } else {
    currentCard = {};
    data = [];
    virtCard = [];
    toMainScreen();
  }
}

function cancelSubmit(e) {
  pressBtn(e.target);
  currentCard = {};
  data = [];
  virtCard = [];
  openViewBalansWindow();
}

export {changeDelete, deleteSubmit, cancelSubmit};