"use strickt";

// burger-menu

const menuOpen = document.querySelector(".hamburger"),
      menuClose = document.querySelector(".header__menu-close"),
      menu = document.querySelector(".header__menu"),
      burgerStickTop = document.querySelector(".hamburger__stick-top"),
      burgerStickMiddle = document.querySelector(".hamburger__stick-middle"),
      burgerStickBottom = document.querySelector(".hamburger__stick-bottom");

function burger() {
  menuOpen.addEventListener("click", burgerMenuOpen);
  menuClose.addEventListener("click", () => {
    burgerClose(".header__menu-close", ".header__menu");
  });
}

// функция открытия бургер меню
function burgerMenuOpen() {
  setTimeout(() => {
    menu.classList.toggle("header__menu_active");
  }, 100);
  burgerActive();
}

// функция закрытия бургер меню
function burgerClose(closeBtnSelector, menuSelector) {
  const closeBtn = document.querySelector(closeBtnSelector);
  const menu = document.querySelector(menuSelector);
  setTimeout(() => {
    menu.classList.toggle("header__menu_active");
  }, 200);
  closeBtn.classList.add("header__menu-close_animation");
  setTimeout(burgerActive, 400);
  setTimeout(() => {
    closeBtn.classList.remove("header__menu-close_animation");
  }, 600);
}

// функция анимации поведения кнопки бургер меню при открытии и закрвтии
function burgerActive() {
  burgerStickTop.classList.toggle("hamburger__stick-top_active");
  burgerStickMiddle.classList.toggle("hamburger__stick-middle_active");
  burgerStickBottom.classList.toggle("hamburger__stick-bottom_active");
}


export default burger;
export {burgerClose};