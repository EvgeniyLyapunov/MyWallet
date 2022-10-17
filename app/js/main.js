"use strict";

window.addEventListener("DOMContentLoaded", () => {

  // burger-menu

  const menuOpen = document.querySelector(".hamburger"),
        menuClose = document.querySelector(".header__menu-close"),
        menu = document.querySelector(".header__menu"),
        burgerStickTop = menuOpen.querySelector(".hamburger__stick-top"),
        burgerStickMiddle = menuOpen.querySelector(".hamburger__stick-middle"),
        burgerStickBottom = menuOpen.querySelector(".hamburger__stick-bottom");

  menuOpen.addEventListener("click", () => {
    setTimeout(() => {
      menu.classList.toggle("header__menu_active");
    }, 100);
    burgerActive();
  });

  menuClose.addEventListener("click", () => {
    setTimeout(() => {
      menu.classList.toggle("header__menu_active");
    }, 200);
    menuClose.classList.add("header__menu-close_animation");
    setTimeout(burgerActive, 400);
    setTimeout(() => {
      menuClose.classList.remove("header__menu-close_animation");
    }, 600);
    
  });

  function burgerActive() {
    burgerStickTop.classList.toggle("hamburger__stick-top_active");
    burgerStickMiddle.classList.toggle("hamburger__stick-middle_active");
    burgerStickBottom.classList.toggle("hamburger__stick-bottom_active");
  }


  // анимация нажатия кнопки
  function pressBtn(button) {
    button.classList.add("btn_active");
    setTimeout(() => {
      button.classList.remove("btn_active");
    }, 300);
  }


  // modals

  const viewBalanceBtn = document.querySelector("#viewBalance"),
        addChangesBtn = document.querySelector("#addChanges"),
        mainSection = document.querySelector("main"),
        footerSection = document.querySelector("#footer-container"),
        toHomeBtn = document.querySelector(".btn-to-home"),
        modalShow = document.querySelector(".modal-show"),
        modalChanges = document.querySelector(".modal-changes");

  // функция открытия модального окна
  function openModal(btn, modal) {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      pressBtn(e.target);
      setTimeout(() => {
        modal.classList.add("visible");
        mainSection.classList.add("hide");
        footerSection.classList.add("footer__container");
        toHomeBtn.classList.remove("hide");
      }, 300);
    });
  }

  // открытие модального окна просмотра баланса
  openModal(viewBalanceBtn, modalShow);

  // открытие модального окна внесения изменений
  openModal(addChangesBtn, modalChanges);

  // кнопка в футере - домой
  toHomeBtn.addEventListener("click", (e) => {
    e.preventDefault();
    pressBtn(e.target);
    setTimeout(() => {
      modalShow.classList.remove("visible");
      modalChanges.classList.remove("visible");
      mainSection.classList.remove("hide");
      footerSection.classList.remove("footer__container");
      toHomeBtn.classList.add("hide");
    }, 300);
  });


  // слайдер выбора хранилища в окне внесения изменений

  const slides = document.querySelectorAll(".select-storage__item"),
        prevBtn = document.querySelector(".select-storage__prev-btn"),
        nextBtn = document.querySelector(".select-storage__next-btn");
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



});