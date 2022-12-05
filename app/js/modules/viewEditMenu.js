"use strict";

import swal from 'sweetalert';

import openModalWindow from "./openModalWindow";
import getDataFromStorage from "../services/getDataFromStorage";
import {openViewBalansWindow} from './viewBalance';
import {postData} from '../services/dataBaseQueries';

function openViewEditMenu(card) {
  let currentWallet = card;
  const subtitle = document.querySelector('.edit-menu__subtitle-current');
  subtitle.textContent = `${currentWallet.name}`;

  openModalWindow('.edit-menu');

}

export {openViewEditMenu};