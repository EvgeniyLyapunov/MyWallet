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
    baseCard = cards.filter(item => (item.id === card.baseStorageId))[0];
  }

  // выводим на экран имя карты, баланс когорой будем менять
  const cardNameElement = document.querySelector('.modal-changes__subtitle-current');
  cardNameElement.textContent = card.name;

  const form = document.querySelector('.modal-changes__form');
  // удаляем кнопки, что бы избавиться от навешенных на них обработчиков события;
  const buttons = form.querySelectorAll('button');
  if(buttons.length != 0) {
    buttons.forEach(item => item.remove());
  }
  // заново создаём кнопки
  const btnPlus = document.createElement('button');
  btnPlus.classList.add('modal-changes__form-btn', 'modal-changes__form-btn-plus', 'btn');
  btnPlus.setAttribute('id', 'plus');
  form.insertAdjacentElement('beforeend', btnPlus);

  const btnMinus = document.createElement('button');
  btnMinus.classList.add('modal-changes__form-btn', 'modal-changes__form-btn-minus', 'btn');
  btnMinus.setAttribute('id', 'minus');
  form.insertAdjacentElement('beforeend', btnMinus);
  
  // удаляем и создаём ссылки на открытие окон, удаляя обработчики событий
  document.querySelector('#link-change').remove();
  document.querySelector('#link-create').remove();

  const linkBoxChange = document.querySelector('#link-box-change');
  linkBoxChange.innerHTML = `
                            <a class="modal-changes__link" href="#" id="link-change">
                              Редактировать текущий кошелёк
                            </a>
                          `;
  const linkBoxCreate = document.querySelector('#link-box-create');
  linkBoxCreate.innerHTML = `
                            <a class="modal-changes__link" href="#" id="link-create">
                              Создать новый кошелёк
                            </a>
                          `;

  // переходим в окно изменеия баланса
  openModalWindow(".modal-changes");

  const btns = form.querySelectorAll('button');
  btns.forEach(item => {
    item.addEventListener('click', onChangeBalanceCard);
  });

  const linkChange = document.querySelector('#link-change');
  linkChange.addEventListener('click', (e) => {
    e.preventDefault;
    // TODO => openChangeCard
  });

  const linkCreate = document.querySelector('#link-create');
  linkCreate.addEventListener('click', (e) => {
    e.preventDefault;
    openModalWindow(".new-storage");
  });

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
        if(baseCard.balance < bigData.balance) {
          swal({
            title: 'Недопустимое значение',
            text: 'Сумма базового (реального) кошелька не может быть меньше, чем сумма виртуального.',
            icon: 'error',
          }).then((value) => {
            form.reset();
            bigData = null;
            openViewBalansWindow();
          });
          return;
        }
        bigData.baseCardBalance = baseCard.balance;
        bigData.idBaseCard = baseCard.id;
        bigData.baseCardLastModifiedDate = now.toLocaleString("ru", options).toString();
      } 
    } else {
      bigData.balance = +(card.balance) - +(data.balance);
      if(baseCard != undefined) {
        if(baseCard.balance < data.balance) {
          swal({
            title: 'Недопустимое значение',
            text: 'Сумма базового (реального) кошелька не может быть меньше, чем сумма расхода из виртуального.',
            icon: 'error',
          }).then((value) => {
            form.reset();
            bigData = null;
            openViewBalansWindow();
          });
          return;
        }
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
      bigData = null;

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