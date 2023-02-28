'use strict';

import swal from 'sweetalert';

import {postData} from "../../../services/dataBaseQueries";
import pressBtn from "../../buttonPressAnim";
import { openViewBalansWindow } from '../../viewBalance';
import getDataFromStorage from '../../../services/getDataFromStorage';

const form = document.querySelector('#edit-wallet-base-form'),
      selectElem = document.querySelector('.change-base-modal__select');
let currentCard = {};

function changeBase(card) {
  currentCard = card;
  const currentBase = document.querySelector('#edit-wallet-current-base');

  const data = getDataFromStorage();
  if(currentCard.baseStorageId != 0) {
    const baseStorageId = data.filter(item => {return item.id === currentCard.baseStorageId})[0].name;
    currentBase.textContent = baseStorageId;
  } else {
    currentBase.textContent = 'нет';
  }

  // очищаем select от options
  // оставляем только первый - placeholder
  const optionEls = selectElem.querySelectorAll('option');
  if(optionEls.length > 1) {
    optionEls.forEach((item, i) => {
      if(i > 0) {
        item.remove();
      }
    });
  }
  // проверяем количество элементов в списке кошельков и устанавливаем адекватный placeholder
  if(data.length > 0) {
    const optionElemPlaceholder = selectElem.querySelector('option');
    optionElemPlaceholder.textContent = 'Выберите:';
    data.forEach(item => {
      if(item.baseStorageId == 0 ) {
        const optionElem = document.createElement('option');
        optionElem.setAttribute('value', `${item.id}`);
        optionElem.textContent = `${item.name}`;
        selectElem.insertAdjacentElement('beforeend', optionElem);
      }
    });
  } else {
    const optionElemPlaceholder = selectElem.querySelector('option');
    optionElemPlaceholder.textContent = 'Список пуст';
  }
}

async function changeBaseSubmit(e) {
  pressBtn(e.target);

  e.preventDefault();
  e.target.disabled = true;
  e.target.classList.add('change-base-modal__btn-disable');

  const formData = new FormData(form);
  // обЪект  для дополнения к данным из формы 
  let baseUpdate = Object.fromEntries(formData.entries());

  if(baseUpdate.select == undefined || baseUpdate.select == currentCard.id) {
    baseUpdate.select = 0;
  } 

  baseUpdate.id = currentCard.id;
  baseUpdate.userId = currentCard.userId;
  const json = JSON.stringify(baseUpdate);

  let answer = await postData('server/updateBase.php', json);

  if(answer.status === "ok") {
    // модальное окошко что всё сохранилось успешно
    swal({
      title: `${answer.status}`,
      buttons: false,
      timer: 1500,
      icon: "success",
    });

    form.reset();
    e.target.disabled = false;
    e.target.classList.remove('change-base-modal__btn-disable');
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
    e.target.disabled = false;
    e.target.classList.remove('change-base-modal__btn-disable');
  }
  openViewBalansWindow();
}

export {changeBase, changeBaseSubmit}