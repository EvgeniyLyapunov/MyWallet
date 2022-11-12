"use strict";

function formSubmitOff(formSelector, ...inputs) {
  const form = document.querySelector(formSelector);

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    inputs.forEach(input => {
      document.querySelector(input).blur();
    });
  });

}

export default formSubmitOff;