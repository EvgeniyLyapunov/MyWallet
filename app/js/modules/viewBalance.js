"use strict";

import swal from 'sweetalert';

import {toMainScreen} from './modal';

function createCardsOfStorages() {
  let storage;
  let data = [];

  const ul = document.querySelector(".balance__list");
  if(ul) {
    ul.remove();
  }

  // определяю тип хранилища и наличие данных
  if(localStorage.getItem('userData')) {
    storage = 'localStorage';
    if(localStorage.getItem('balanceData')) {
      data =JSON.parse(localStorage.getItem('balanceData'));
    } else {
      data = [];
    }
  } else if(sessionStorage.getItem('userData')) {
    storage = 'sessionStorage';
    if(sessionStorage.getItem('balanceData')) {
      data =JSON.parse(sessionStorage.getItem('balanceData'));
    } else {
      data = [];
    }
  }

  const cardsWrapper = document.querySelector("#balance-wrapper");
  if(data.length == 0) {

    swal({
      text: "Вы не создали пока ни одного хранилища",
      icon: "info",
    }).then((value) => toMainScreen());

  } else {
    const cardsList = document.createElement("ul");
    cardsList.classList.add("balance__list");
    cardsWrapper.insertAdjacentElement("beforeend", cardsList);

    data.forEach(item => {
      const card = document.createElement("li");
      card.classList.add("balance__card", "card");
      card.innerHTML = `
        <h2 class="card__title">${item.name}</h2>
        <div class="card__date">${item.lastModifiedDate}</div>
        <div class="card__amount">${item.balance}</div>
      `;
      cardsList.insertAdjacentElement("beforeend", card);
    })
  }



}

export default createCardsOfStorages;