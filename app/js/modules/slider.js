"use strict";

function slider(slideItems, prev, next) {

  const slides = document.querySelectorAll(slideItems),
        prevBtn = document.querySelector(prev),
        nextBtn = document.querySelector(next);
  let slaydeIndex = 1;

  function slydePositionNumber(n) {
    if(n > slides.length) {
      slaydeIndex = 1;
    }
    if(n === 0) {
      slaydeIndex = slides.length;
    }
  }

  function showSlide() {
    slides.forEach((item) => {
      item.classList.add("hide");
      item.classList.remove("visible");
    });
    slides[slaydeIndex - 1].classList.remove("hide");
    slides[slaydeIndex - 1].classList.add("visible");
  }

  showSlide();

  nextBtn.addEventListener("click", () => {
    slydePositionNumber(slaydeIndex += 1);
    showSlide();
  });

  prevBtn.addEventListener("click", () => {
    slydePositionNumber(slaydeIndex -= 1);
    showSlide();
  });
}

export default slider;