import swal from 'sweetalert';
import tippy from 'tippy.js';

import pressBtn from './buttonPressAnim';
import openModalWindow from "./openModalWindow";
import checkAuth from "../services/checkAuth";
import {toMainScreen} from './modal';
import getDataFromStorage from '../services/getDataFromStorage';
import viewChanges from "./viewChanges";

/* функция вызывается при открытии приложения,
   вызывает функцию проверки и создания карт кошельков, 
   навешивает обработчик на главную кнопку стартового экрана,
   который открывает окно показа баланса кошельков */
function viewBalance() {
  createCards();

  tippy('#tippy-info-about-create-new-wallet', {
    content: 'Для создания нового кошелька нажмите на любую карту, и в открывшемся окне перейдите по нужной ссылке.'
  });

  const viewBalanceBtn = document.querySelector("#viewBalance");
  viewBalanceBtn.addEventListener("click", () => {
    pressBtn(viewBalanceBtn);

    setTimeout(openViewBalansWindow, 300);
  });
}

// функция удаляет кошельки и создаёт их с актуальными данными
// и гарантированно не задвоенным обработчиком событий
function createCards() {
  const data = getDataFromStorage();
  data.sort((a, b) => a.position - b.position);


  if(data.length == 0) {
    return;
  }

  // здесь удаляются уже существующие карты кошельков
  const ul = document.querySelector(".balance__list");
  if(ul) {
    ul.remove();
  }

  // создание новых карт кошельков
  const cardsWrapper = document.querySelector("#balance-wrapper");
  const newUl = document.createElement('ul');
  newUl.classList.add('balance__list');
  cardsWrapper.appendChild(newUl);

  const cardsList = document.querySelector('.balance__list');

  data.forEach((item) => {
    const card = document.createElement('li');
    card.classList.add('balance__card', 'card');
    card.setAttribute('id', `${item.id}`);
    let bs;
    if(item.baseStorageId == '0') {
      bs = "нет";
    } else {
      bs = data.filter(u => {
        return u.id == item.baseStorageId;
      })[0].name;
    }
    let imgClass;
    if(item.moneyType === 'bank') {
      imgClass = 'card__type-money card__type-money_bank';
    } else {
      imgClass = 'card__type-money card__type-money_cash';
    }
    card.innerHTML = `
    <div class="card__top-block">
      <div class="card__name-date">
        <h2 class="card__title">${item.name}</h2>
        <div class="card__date">${item.lastModifiedDate}</div>
      </div>
      <div class="card__base-info">
        <div class="card__base-label">Базовый кошелёк</div>
        <div class="card__base-name">${bs}</div>
      </div>
    </div>
    <div class="card__down-block">
      <div class="${imgClass}"></div>
      <div class="card__amount">${item.balance}</div>
    </div>
    `;
    // навешивание обработчика, который открывает окно редактирования баланса выбранной карты
    card.addEventListener('click', (e) => {
      e.target.classList.add('card_active');

      setTimeout(() => {
        e.target.classList.remove('card_active');
        viewChanges(e.target.id);
      }, 800)
    });
    cardsList.insertAdjacentElement('beforeend', card);
  });
}

// функция перед открытием окна карт с балансом проверяет аутентификацию пользователя 
// и наличие у него созданных карт,
// и открывает окно показа баланса карт
function openViewBalansWindow() {
  const userAuth = checkAuth();
  if(!userAuth) {
    swal({
      title: 'Вы пока нe авторизовались',
      text: 'Для этого нужно нажать на три палочки сверху справа',
      icon: 'info',
    }).then((value) => toMainScreen());
    return;
  }

  const data = getDataFromStorage();
  if(data.length == 0) {
    swal("Вы не создали пока ни один кошелёк", {
      icon: "info",
      buttons: {
        newStorage: {
          text: "Создать",
          value: "new"
        },
        defeat: {
          text: "Назад",
          value: "back"
        }
      }
    })
    .then((value) => {
      switch (value) {
        case "new":
          swal(openModalWindow(".new-storage"));
          break;
        case "back":
          swal(toMainScreen());
          break;
      }
    });
    return;
  }

  function viewBalanceInfo(){
    if(!localStorage.getItem('noMoreShow')) {
      swal('Для операций с кошельком нажмите на карточку этого кошелька', {
        icon: 'info',
        buttons: {
          cancel: 'Ok',
          noMoreShow: {
            text: 'Больше не показывать это сообщение',
            value: 'noMoreShow'
          }
        }
      })
      .then((value) => {
        if(!value) {
          return;
        }
        localStorage.setItem(`${value}`, 'true');
      });
    }
  }

  createCards();
  openModalWindow(".modal-show");
  viewBalanceInfo();
}

export {viewBalance, openViewBalansWindow, createCards};