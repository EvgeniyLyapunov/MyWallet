"use strict";
import {userNickOnMainScreen} from "./modules/userNickOnMainScreen";
import burger from "./modules/burger";
import {openModal} from "./modules/modal";
import logRegBtn from "./modules/logRegBtn";
import formSubmitOff from "./modules/submitEvents/formSubmitOff";
import regSubmit from "./modules/submitEvents/regSubmit";
import logSubmit from "./modules/submitEvents/logSubmit";
import newStorageSubmit from "./modules/submitEvents/newStorageSubmit";


import {viewBalance} from "./modules/viewBalance";
import viewChanges from "./modules/viewChanges";


userNickOnMainScreen();

burger();
// открытие модального окна просмотра баланса
viewBalance();
// открытие модального окна внесения изменений
// viewChanges("#addChanges");

// viewChanges();
// открытие модального окна создания нового хранилища
// openModal(".modal-changes__new-storage-btn", ".new-storage");
// открытие модального окна внесения изменений из окна создания нового хранилища
//openModal(".new-storage__modal-changes-btn", ".modal-changes");
// открытие модального окна входа/выхода в аккаунт
openModal("#to-log-btn", ".modal-log", true);
// открытие модального окна регистрации аккаунта
openModal("#to-reg-btn", ".modal-reg", true);

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
