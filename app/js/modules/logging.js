'use strict';
import {toMainScreen} from './modal';
import pressBtn from './buttonPressAnim';

const closeBtn = document.querySelector('.logging-modal__btn-close'),
      clearBtn = document.querySelector('.logging-modal__btn-clear');

function logging() {
  
  log();

  closeBtn.addEventListener('click', () => {
    pressBtn(closeBtn);
    setTimeout(() => {
      toMainScreen();
    }, 300);
  });
  clearBtn.addEventListener('click', () => {
    pressBtn(clearBtn);
    setTimeout(() => {
      if(localStorage.getItem('log')) {
        localStorage.removeItem('log');
      } else {
        if(sessionStorage.getItem('log')) {
          sessionStorage.removeItem('log');
        }
      }
      log();
    }, 300);
    
  });
}

function log() {
  const oldList = document.querySelector('.logging-modal__list');
  if(oldList) {
    oldList.remove();
  }

  const list = document.createElement('ul');
  list.classList.add('logging-modal__list');

  if(localStorage.getItem('log')) {
    let logItem = JSON.parse(localStorage.getItem('log'));
    logItem.forEach(item => {
      const li = document.createElement('li');
      li.classList.add('logging-modal__item');
      li.innerHTML = `
        <span class="logging-modal__item-date">${item.date}</span>
        <span class="logging-modal__item-operation">${item.operation}</span>
        <span class="logging-modal__item-amount">${item.amount}</span>
      `;
      list.insertAdjacentElement('beforeend', li);
    });
  } else if(sessionStorage.getItem('log')) {
    let logItem = JSON.parse(sessionStorage.getItem('log'));
    logItem.forEach(item => {
      const li = document.createElement('li');
      li.classList.add('logging-modal__item');
      li.innerHTML = `
        <span class="logging-modal__item-date">${item.date}</span>
        <span class="logging-modal__item-operation">${item.operation}</span>
        <span class="logging-modal__item-amount">${item.amount}</span>
      `;
      list.insertAdjacentElement('beforeend', li);
    });
  }
  document.querySelector('.logging-modal__title').insertAdjacentElement('afterend', list);
}

export {logging, log};