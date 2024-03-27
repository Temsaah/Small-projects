const menuBtn = document.querySelector(".menu");
const mobileMenuExpand = document.querySelector(".mobile-menu-expand");
const closeMenuBtn = document.querySelector(".close-menu");
const overlay = document.querySelector("#overlay");
const featureBtn = document.querySelector(".features");
const featureMenu = document.querySelector(".feature-menu");
const companyBtn = document.querySelector(".company");
const companyMenu = document.querySelector(".company-menu");
const dropDownMenus = document.querySelectorAll(".dropdown-menu");

let openedMenu = null;

function hideMenu() {
  mobileMenuExpand.classList.add("max-md:hidden");
  overlay.classList.add("hidden");
}

function showMenu() {
  mobileMenuExpand.classList.remove("max-md:hidden");
  overlay.classList.remove("hidden");
}

function toggleMenu(menu) {
  if (openedMenu && openedMenu !== menu) {
    hideMenu(openedMenu);
  }

  if (menu === openedMenu) {
    hideMenu(openedMenu);
    openedMenu = null;
  } else {
    showMenu(menu);
    openedMenu = menu;
  }
}

function showMenu(menu) {
  menu.classList.remove("hidden");
  updateIcon(menu, "fa-chevron-down", "fa-chevron-up");
}

function hideMenu(menu) {
  menu.classList.add("hidden");
  updateIcon(menu, "fa-chevron-up", "fa-chevron-down");
}

function updateIcon(menu, oldIcon, newIcon) {
  const icon = menu.previousElementSibling.querySelector(".toggle-icon");
  if (icon.classList.contains(oldIcon)) {
    icon.classList.replace(oldIcon, newIcon);
  }
}

menuBtn.addEventListener("click", () => {
  showMenu();
});

closeMenuBtn.addEventListener("click", () => {
  hideMenu();
});

overlay.addEventListener("click", () => {
  hideMenu();
});

featureBtn.addEventListener("click", () => {
  toggleMenu(featureMenu);
});

companyBtn.addEventListener("click", () => {
  toggleMenu(companyMenu);
});
