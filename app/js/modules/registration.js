"use strict";

import JustValidate from 'just-validate';
import regSubmit from "./submitEvents/regSubmit";


function registration() {

  const validate = new JustValidate('#reg-form', {
    errorFieldCssClass: 'is-invalid',
    errorFieldStyle: {
      border: '1px solid #FF5C00',
    },
    errorLabelCssClass: 'is-label-invalid',
    errorLabelStyle: {
      color: '#FF5C00',
    },
    focusInvalidField: true,
    lockForm: true,
    tooltip: {
      position: 'top',
    }
  });

  validate
  .addField("#reg-name", [
    {
      rule: 'customRegexp',
      value: /^[a-zа-яё]+$/i,
      errorMessage: 'Ник должен состоять только из букв',
    },
    {
      rule: 'required',
      errorMessage: 'Обязательное поле',
    },
    {
      rule: 'minLength',
      value: 2,
      errorMessage: 'Слишком короткий ник'
    },
    {
      rule: 'maxLength',
      value: 30,
      errorMessage: 'Слишком длинный ник'
    }
  ])
  .addField("#reg-pass", [
    {
      rule: 'required',
      errorMessage: 'Обязательное поле',
    },
    {
      rule: 'minLength',
      value: 5,
      errorMessage: 'Слишком короткий пароль'
    }
  ])
  .addField("#reg-confirm-pass", [
    {
      rule: 'required',
      errorMessage: 'Обязательное поле',
    },
    {
      validator: (value, fields) => {
        if (fields['#reg-pass'] && fields['#reg-pass'].elem) {
          const repeatPasswordValue = fields['#reg-pass'].elem.value;
  
          return value === repeatPasswordValue;
        }
  
        return true;
      },
      errorMessage: 'Пароль должен быть тем же',
    },
  ])
  .onSuccess(regSubmit("#reg-form", ".modal-reg__btn-enter", "server/reg.php"));

}

export default registration;