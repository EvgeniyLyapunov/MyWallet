"use strict";

import openModalWindow from "./openModalWindow";
import {changeName, changeNameSubmit} from './submitEvents/update-wallet/updateNameSubmit';
import {changeBalance, changeBalanceSubmit } from './submitEvents/update-wallet/updateBalanceSubmit';
import {changeMoney, changeMoneySubmit} from './submitEvents/update-wallet/updateMoneySubmit';
import {changeBase, changeBaseSubmit} from './submitEvents/update-wallet/updateBaseSubmit';

let currentWallet = {};

function openViewEditMenu(card) {
  currentWallet = card;
  const subtitle = document.querySelector('.edit-menu__subtitle-current');
  subtitle.textContent = `${currentWallet.name}`;

  openModalWindow('.edit-menu');
}

function editNameBtn() {
  const toChangeNameBtn = document.querySelector('.edit-menu__name-btn'),
        editNameSubmit = document.querySelector('#change-name-submit-button');
  toChangeNameBtn.addEventListener('click', () => {
    changeName(currentWallet);
    openModalWindow('.change-name-modal');
  });
  editNameSubmit.addEventListener('click', changeNameSubmit);
}

function editAmountBtn() {
  const toChangeAmountBtn = document.querySelector('.edit-menu__balance-btn'),
        editBalanceSubmit = document.querySelector('#change-balance-submit-button');
  toChangeAmountBtn.addEventListener('click', () => {
    changeBalance(currentWallet);
    openModalWindow('.change-balance-modal');
  });
  editBalanceSubmit.addEventListener('click', changeBalanceSubmit);
}

function editMoneyBtn() {
  const toChangeMoneyBtn = document.querySelector('.edit-menu__money-btn'),
        editMoneySubmit = document.querySelector('#change-money-submit-button');
  toChangeMoneyBtn.addEventListener('click', () => {
    changeMoney(currentWallet);
    openModalWindow('.change-money-modal');
  });
  editMoneySubmit.addEventListener('click', changeMoneySubmit);
}

function editBaseBtn() {
  const toChangeBaseBtn = document.querySelector('.edit-menu__base-btn'),
        editBaseSubmit = document.querySelector('#change-base-submit-button');
  toChangeBaseBtn.addEventListener('click', () => {
    changeBase(currentWallet);
    openModalWindow('.change-base-modal');
  });
  editBaseSubmit.addEventListener('click', changeBaseSubmit);
}

export {openViewEditMenu, editNameBtn, editAmountBtn, editMoneyBtn, editBaseBtn};