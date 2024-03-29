"use strict";
import {userNickOnMainScreen} from "./modules/userNickOnMainScreen";
import burger from "./modules/burger";
import {openAuthModals, backHomeByHomeButton} from "./modules/modal";
import logRegBtn from "./modules/logRegBtn";
import formSubmitOff from "./modules/submitEvents/formSubmitOff";
import regSubmit from "./modules/submitEvents/regSubmit";
import logSubmit from "./modules/submitEvents/logSubmit";
import newStorageSubmit from "./modules/submitEvents/newStorageSubmit";
import {viewBalance} from "./modules/viewBalance";
import {editNameBtn, editAmountBtn, editMoneyBtn, editBaseBtn, deleteWalletBtn} from './modules/viewEditMenu';
import slider from './modules/slider';
import {logging} from './modules/logging';
import {changePosition} from './modules/position';


userNickOnMainScreen();

burger();
// открытие модального окна просмотра баланса
viewBalance();
// кнопка изменить позицию карты на 1 вверх
changePosition('#position-up');
// кнопка изменить позицию карты на 1 вниз
changePosition('#position-down');
// открытие модального окна входа/выхода в аккаунт
openAuthModals("#to-log-btn", ".modal-log");
// открытие модального окна регистрации аккаунта
openAuthModals("#to-reg-btn", ".modal-reg");
// открытие модального окна о проекте
openAuthModals(".header__btn-about", ".project-modal");
//кнопка в футере - домой
backHomeByHomeButton();

logRegBtn(".modal-log__modal-reg-btn", ".modal-reg", ".modal-log");
logRegBtn(".modal-reg__modal-log-btn", ".modal-log", ".modal-reg");

// отключение события submit при нажатие кнопки ввод с клавиатуры телефона и скрытие оной
formSubmitOff(".modal-changes__form", ".modal-changes__input-amount");
formSubmitOff(".new-storage__form", ".new-storage__input-name");
formSubmitOff(".modal-log__form", "#log-name", "#log-pass");
formSubmitOff("#reg-form", "#reg-name", "#reg-pass", "#reg-confirm-pass");

regSubmit("#reg-form", ".modal-reg__btn-enter", "server/reg.php");
logSubmit(".modal-log__form", ".modal-log__btn-enter", "server/log.php");
  
newStorageSubmit();

// функции инициализируют меню и окна редактирования кошелька
editNameBtn();
editAmountBtn();
editMoneyBtn();
editBaseBtn();
deleteWalletBtn();

slider({
  container: ".project-modal__slider",
  nextArrow: ".project-modal__slider-next",
  prevArrow: ".project-modal__slider-prev",
  slide: ".project-modal__slider-slide",
  totalCounter: "#total",
  currentCounter: "#current",
  wrapper: ".project-modal__slider-wrapper",
  field: ".project-modal__slider-inner"
});

logging();
