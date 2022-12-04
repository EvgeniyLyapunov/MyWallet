"use strickt";
import pressBtn from "./buttonPressAnim";

// функция переключает показ модальных окон регистрации и входа друг из друга
function logRegBtn(btnSelector, modalSelectorTo, modalSelectorFrom) {
  const btn = document.querySelector(btnSelector),
        modalTo = document.querySelector(modalSelectorTo),
        modalFrom = document.querySelector(modalSelectorFrom),
        form = modalFrom.querySelector("form");
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    pressBtn(e.target);

    setTimeout(() => {
      form.reset();
      modalTo.classList.add("visible");
      modalFrom.classList.remove("visible");
      modalFrom.classList.add("hide");
    }, 300);
  });
}

export default logRegBtn;