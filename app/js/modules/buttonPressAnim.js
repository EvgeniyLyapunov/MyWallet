"use strict";

// анимация нажатия кнопки
function pressBtn(button) {
  button.classList.add("btn_active");
  setTimeout(() => {
    button.classList.remove("btn_active");
  }, 300);
}

export default pressBtn;