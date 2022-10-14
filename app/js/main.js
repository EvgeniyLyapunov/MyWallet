"use strict";

window.addEventListener("DOMContentLoaded", () => {

  // burger-menu
  const menuOpen = document.querySelector(".hamburger"),
        menuClose = document.querySelector(".header__menu-close"),
        menu = document.querySelector(".header__menu"),
        burgerStickTop = menuOpen.querySelector(".hamburger__stick-top"),
        burgerStickMiddle = menuOpen.querySelector(".hamburger__stick-middle"),
        burgerStickBottom = menuOpen.querySelector(".hamburger__stick-bottom");

  menuOpen.addEventListener("click", (event) => {
    setTimeout(() => {
      menu.classList.toggle("header__menu_active");
    }, 100);
    burgerActive();
  });

  menuClose.addEventListener("click", (event) => {
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

  // buttons presses
  // const btns = document.querySelectorAll(".btn");
  // btns.forEach((btn) => {
  //   btn.addEventListener("touchstart", (e) => {
  //     e.preventDefault();
  //     pressBtn(btn);
  //   });
  //   btn.addEventListener("click", (e) => {
  //     e.preventDefault();
  //     pressBtn(btn);
  //   });
  // });
  
  function pressBtn(button) {
    button.classList.add("btn_active");
    setTimeout(() => {
      button.classList.remove("btn_active");
    }, 300);
  }

  // const body = document.querySelector("body"),
  //       header = document.querySelector(".header"),
  //       main =document.querySelector("main"),
  //       footer = document.querySelector(".footer");

  // const modalHeight = body.offsetHeight - (header.clientHeight + footer.clientHeight);
  // console.log(modalHeight);
  // console.log(document.querySelector("main").offsetHeight);

  // modals
  const viewBalanceBtn = document.querySelector("#viewBalance"),
        mainSection = document.querySelector("main"),
        modal = document.querySelector(".modal"),
        modalCloseBtn = document.querySelector(".modal__close");

  viewBalanceBtn.addEventListener("click", (event) => {
    event.preventDefault();
    pressBtn(event.target);
    setTimeout(() => {
      modal.classList.add("visible");
      mainSection.classList.add("hide");
    }, 300);
    
  });

});