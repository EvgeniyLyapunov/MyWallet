"use strickt";
import pressBtn from "./buttonPressAnim";

function logRegBtn(btnSelector, modalSelectorTo, modalSelectorFrom) {
  const btn = document.querySelector(btnSelector),
        modalTo = document.querySelector(modalSelectorTo),
        modalFrom = document.querySelector(modalSelectorFrom);
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    pressBtn(e.target);

    setTimeout(() => {
      modalTo.classList.add("visible");
      modalFrom.classList.remove("visible");
      modalFrom.classList.add("hide");
    }, 300);
  });
}

export default logRegBtn;