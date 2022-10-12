"use strict";

window.addEventListener("DOMContentLoaded", () => {

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

  const btns = document.querySelectorAll(".btn");
  btns.forEach((btn) => {
    btn.addEventListener("touchstart", (e) => {
      e.preventDefault();
      pressBtn(btn);
    });
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      pressBtn(btn);
    });
  });
  
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

});