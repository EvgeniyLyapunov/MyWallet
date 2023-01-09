"use strict";

import swal from 'sweetalert';

import openModalWindow from "./openModalWindow";
import getDataFromStorage from "../services/getDataFromStorage";
import {openViewBalansWindow} from './viewBalance';
import {postData} from '../services/dataBaseQueries';
import {openViewEditMenu} from './viewEditMenu';

// функция подготавливает и открывает окно изменения баланса выбранного кошелька
function viewChanges(idCard) {
  const cards = getDataFromStorage();
  // текущая карта
  let card = cards.filter(item => (item.id == idCard))[0];
  // базовая карта, если назначена
  let baseCard;
  if(card.baseStorageId != 0) {
    baseCard = cards.filter(item => (item.id === card.baseStorageId))[0];
  }
  // проверяем наличие привязанных виртуальных карт
  let virtualCards = cards.filter(item => {
    return item.baseStorageId == idCard;
  });

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
                            <button class="modal-changes__link" id="link-change">
                              Редактировать текущий кошелёк
                            </button>
                          `;
  const linkBoxCreate = document.querySelector('#link-box-create');
  linkBoxCreate.innerHTML = `
                            <button class="modal-changes__link" id="link-create">
                              Создать новый кошелёк
                            </button>
                          `;

  // переходим в окно изменеия баланса
  openModalWindow(".modal-changes");

  const btns = form.querySelectorAll('button');
  btns.forEach(item => {
    item.addEventListener('click', onChangeBalanceCard);
  });

  // ссылка открывает окно редактирования выбранной карты
  const linkChange = document.querySelector('#link-change');
  linkChange.addEventListener('click', (e) => {
    e.preventDefault;
    openViewEditMenu(card);
  });

  // ссылка открывает окно создания новой карты
  const linkCreate = document.querySelector('#link-create');
  linkCreate.addEventListener('click', (e) => {
    e.preventDefault;
    openModalWindow(".new-storage");
  });

  // функция собирает объект с данными и отправляет на сервер
  async function onChangeBalanceCard(e) {
    e.preventDefault();
    // bigData - объект, который будет отправлен на сервер
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

    // здесь происходит изменение баланса кошелька, проверка базового кошелька
    // и сообщения об ошибках 
    if(e.target.id === "plus") {
      bigData.balance = +card.balance + +data.balance;
      if(baseCard != undefined) {
        if(+baseCard.balance < +bigData.balance) {
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
      bigData.balance = +card.balance - +data.balance;
      if(virtualCards.length > 0) {
        let sumVirtualBalances = 0;
        virtualCards.forEach(item => {
          sumVirtualBalances = sumVirtualBalances + +item.balance;
        });
        let rest = +card.balance - +data.balance;
        if(rest < sumVirtualBalances) {
        await swal({
            title: "Важная информация",
            text: "Баланс кошелька после данной операции будет меньше суммы его виртуальных кошельков. Пожалуйста, отредактируйте виртуальные кошельки в соответствии с вашими дальнейшими планами на использование этих кошельков.",
            icon: "info",
            buttons: 'ok'
          });
        }
      }

      if(baseCard != undefined) {
        if(+baseCard.balance < +data.balance) {
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

      if(localStorage.getItem("balanceData")) {
        localStorage.setItem("balanceData", `${JSON.stringify(answer.data)}`);
        // записываем операцию в log
        if(localStorage.getItem('log')) {
          let log = JSON.parse(localStorage.getItem('log'));
          log.push({
            date: bigData.lastModifiedDate,
            operation: e.target.id,
            amount: data.balance
          });
          localStorage.setItem('log', `${JSON.stringify(log)}`);
        } else {
          let log = [];
          const operation = {
            date: bigData.lastModifiedDate,
            operation: e.target.id,
            amount: data.balance
          }
          log.push(operation);
          localStorage.setItem('log', `${JSON.stringify(log)}`);
        }
      } else  {
        sessionStorage.setItem("balanceData", `${JSON.stringify(answer.data)}`);
        // записываем операцию в log
        if(sessionStorage.getItem('log')) {
          let log = JSON.parse(sessionStorage.getItem('log'));
          log.push({
            date: bigData.lastModifiedDate,
            operation: e.target.id,
            amount: data.balance
          });
          sessionStorage.setItem('log', `${JSON.stringify(log)}`);
        } else {
          let log = [];
          const operation = {
            date: bigData.lastModifiedDate,
            operation: e.target.id,
            amount: data.balance
          }
          log.push(operation);
          sessionStorage.setItem('log', `${JSON.stringify(log)}`);
        }
      }

      form.reset();
      bigData = null;
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