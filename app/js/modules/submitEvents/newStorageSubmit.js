"use strict";

import JustValidate from 'just-validate';
import swal from 'sweetalert';
import tippy from 'tippy.js';

import {postData} from "../../services/dataBaseQueries";
import pressBtn from "../../modules/buttonPressAnim";
import {toMainScreen} from "./../modal";


const form = document.querySelector(".new-storage__form"),
      inputs = form.querySelectorAll("input"),
      btn = document.querySelector('#new-storage-flow-btn'),
      selectElem = document.querySelector('.new-storage__form-select');
let currentStep = 1;
let storage;



function newStorageSubmit() {
  tippy('#tippy-base-storage', {
    content: 'Не обязательная опция. Базовый кошелёк - кошелёк, на основе баланса которого вы создаёте новый кошелёк. При выборе этой опции, уменьшение суммы данного кошелька будет уменьшать сумму базового. Операции в базовом кошельке не будут влиять на сумму этого кошелька, пока сумма базового больше.'
  });

  btn.addEventListener('click', (e) => {newStorageFlow(e)});
  btn.textContent = 'Дальше';

  
  // валидация формы
  const validate = new JustValidate("#newStorageForm", {
    errorFieldCssClass: 'is-invalid-new-st',
    errorFieldStyle: {
      border: '1px solid #FF5C00'
    },
    errorLabelCssClass: 'is-label-invalid-new-st',
    errorLabelStyle: {
      marginTop: '-24px',
      color: '#FF5C00'
    },
    focusInvalidField: true,
    lockForm: true
  });
  validate
  .addField("#newStorageName", [
    {
      rule: 'required',
      errorMessage: 'Обязательное поле'
    },
    {
      rule: 'maxLength',
      value: 15,
      errorMessage: 'Длина названия - максимум 15 букв'
    }
  ])
  .addField("#newStorageSum", [
    {
      rule: 'required',
      errorMessage: 'Обязательное поле'
    }
  ])
  .addRequiredGroup('#new-storage-radio-group', 'Нужно выбрать тип денег в кошельке');
 
  inputs.forEach(item => {
    item.addEventListener("blur", () => {
      validate.refresh();
    });
    item.addEventListener("focus", () => {
      validate.refresh();
    });
  });

  // функция контролирует валидность ввода и переключения на следующий шаг создания кошелька
  function newStorageFlow(e) {
    e.preventDefault();
    pressBtn(e.target);
    switch(currentStep) {
      case 1:
        validate.revalidateField('#newStorageName').then(isValid => {
          if(!isValid) {
            return;
          }
          stepByStep();
        });
        break;
      case 2:
        validate.revalidateField('#newStorageName').then(isValid => {
          if(!isValid) {
            return;
          }
          stepByStep();
        });
        break;
      case 3:
        validate.revalidate('#new-storage-radio-group').then(isValid => {
          if(!isValid) {
            return;
          }
          upsertSelectBaseStorage();
          stepByStep();
        });
        break;
      case 4:
        newStorageFormSubmit();
        break;
    }  
  }

  // функция переключает значение шага создания кошелька и отрисовывает следующий компонент
  function stepByStep() {
    currentStep = currentStep + 1;
    const steps = document.querySelectorAll('.step');
    steps.forEach((item) => {
      item.classList.add('visually-hidden');
      if(item.getAttribute('data-step') == currentStep) {
        item.classList.remove('visually-hidden');
      }
    });
    if(currentStep === 4) {
      btn.textContent = 'Сохранить';
    }
  }

  // функция принимает данные формы и взаимодействует с сервером и бд по созданию нового кошелька
  async function newStorageFormSubmit() {
    const formData = new FormData(form);
    // обЪект нового хранилища для дополнения данных из формы 
    let newStorageData = Object.fromEntries(formData.entries());
    // добавляю id пользователя
    if(storage === 'localStorage') {
      newStorageData.userId = JSON.parse(localStorage.getItem("userData")).id;
    } else {
      newStorageData.userId = JSON.parse(sessionStorage.getItem("userData")).id;
    }
    // добавляю время последнего изменения (здесь - создания)
    const now = new Date();
    var options = {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    };
    newStorageData.lastModifiedDate = now.toLocaleString("ru", options).toString();
    // Json для отправки на сервер в базу данных
    const json = JSON.stringify(newStorageData);
    // отправка на сервер и получение в ответ список всех хранилищ включая созданное
    let answer = await postData("server/newstorage.php", json);
    
    if(answer.status === "ok") {
      // модальное окошко что всё сохранилось успешно
      swal({
        title: `${answer.status}`,
        buttons: false,
        timer: 1500,
        icon: "success",
      });

      form.reset();

      if(storage === 'localStorage') {
        localStorage.setItem("balanceData", `${JSON.stringify(answer.data)}`);
      } else {
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
    }
    newStorageViewToStart();
    toMainScreen();
  }
}

// функция отвечает за актуальность данных в select выбора базового кошелька
function upsertSelectBaseStorage() {
  let data = [];

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

  // определяем где хранятся данные и получаем их
  if(localStorage.getItem("userData")) {
    storage = 'localStorage';
    if(localStorage.getItem("balanceData")) {
      data = JSON.parse(localStorage.getItem("balanceData"));
    }
  } else if(sessionStorage.getItem("balanceData")) {
    storage = 'sessionStorage';
    data = JSON.parse(sessionStorage.getItem("balanceData"));
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

// функция сбрасывает flow interfece создания кошелька на начало
function newStorageViewToStart() {
  currentStep = 1;
  const steps = document.querySelectorAll('.step');
  steps.forEach((item) => {
    item.classList.add('visually-hidden');
    if(item.getAttribute('data-step') == 1) {
      item.classList.remove('visually-hidden');
    }
  });
  btn.textContent = 'Дальше';
}


export default newStorageSubmit;
export {newStorageViewToStart, upsertSelectBaseStorage};