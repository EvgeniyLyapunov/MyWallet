"use strict";

import swal from 'sweetalert';

import openModalWindow from "./openModalWindow";
import getDataFromStorage from "../services/getDataFromStorage";
import {openViewBalansWindow} from './viewBalance';
import {postData} from '../services/dataBaseQueries';
import {changeName, changeNameSubmit} from './submitEvents/update-wallet/changeNameSubmit';
import {changeBalance, changeBalanceSubmit } from './submitEvents/update-wallet/changeBalanceSubmit'

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

export {openViewEditMenu, editNameBtn, editAmountBtn};