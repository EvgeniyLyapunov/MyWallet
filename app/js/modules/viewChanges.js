"use strict";

import swal from 'sweetalert';

import openModalWindow from "./openModalWindow";
import getDataFromStorage from "../services/getDataFromStorage";
import {openViewBalansWindow} from './viewBalance';
import {postData} from '../services/dataBaseQueries';

function viewChanges(idCard) {
  const cards = getDataFromStorage();
  // текущая карта
  let card = cards.filter(item => item.id == idCard)[0];
  // базовая карта, если назначена
  let baseCard;
  if(card.baseStorageId != 0) {
    baseCard = cards.filter(item => item.id === card.baseStorageId)[0];
  }
  // выводим на экран имя карты, баланс когорой будем менять
  const cardNameElement = document.querySelector('.modal-changes__subtitle-current');
  cardNameElement.textContent = card.name;
  // переходим в окно изменеия баланса
  openModalWindow(".modal-changes");

  const form = document.querySelector('.modal-changes__form');
  const btns = form.querySelectorAll('button');
        
  btns.forEach(item => {
    item.addEventListener('click', onChangeBalanceCard);
  })
  // функция собирает объект с данными и отправляет на сервер
  async function onChangeBalanceCard(e) {
    e.preventDefault();
  
    let bigData = {id: card.id};

    const formData = new FormData(form);
    let data = Object.fromEntries(formData.entries());

    const now = new Date();
    var options = {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    };
    bigData.lastModifiedDate = now.toLocaleString("ru", options).toString();

    if(e.target.id === "plus") {
      bigData.balance = +(card.balance) + +(data.balance);
      if(baseCard != undefined) {
        bigData.baseCardBalance = +(baseCard.balance) + +(data.balance);
        bigData.idBaseCard = baseCard.id;
        bigData.baseCardLastModifiedDate = now.toLocaleString("ru", options).toString();
      } 
    } else {
      bigData.balance = +(card.balance) - +(data.balance);
      if(baseCard != undefined) {
        bigData.baseCardBalance = +(baseCard.balance) - +(data.balance);
        bigData.idBaseCard = baseCard.id;
        bigData.baseCardLastModifiedDate = now.toLocaleString("ru", options).toString();
      }
    }

    bigData.userId = card.userId;

    const json = JSON.stringify(bigData);

    let answer = await postData("server/changeBalance.php", json);
    
    if(answer.status === "ok") {
      // модальное окошко что всё сохранилось успешно
      swal({
        title: `${answer.status}`,
        buttons: false,
        timer: 1500,
        icon: "success",
      });

      form.reset();

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
}





export default viewChanges;