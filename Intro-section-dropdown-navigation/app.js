const menuBtn = document.querySelector(".menu");
const mobileMenuExpand = document.querySelector(".mobile-menu-expand");
const closeMenuBtn = document.querySelector(".close-menu");
const overlay = document.querySelector("#overlay");
const featureBtn = document.querySelector(".features");
const featureMenu = document.querySelector(".feature-menu");
const companyBtn = document.querySelector(".company");
const companyMenu = document.querySelector(".company-menu");
const dropDownMenus = document.querySelectorAll(".dropdown-menu");

function hideMenu() {
  mobileMenuExpand.classList.add("max-md:hidden");
  overlay.classList.add("hidden");
}

function showMenu() {
  mobileMenuExpand.classList.remove("max-md:hidden");
  overlay.classList.remove("hidden");
}

function toggleIcon() {
  dropDownMenus.forEach((menu) => {
    const icon = menu.previousElementSibling.querySelector(".toggle-icon");
    if (menu.classList.contains("hidden")) {
      if (icon.classList.contains("fa-chevron-up")) {
        icon.classList.replace("fa-chevron-up", "fa-chevron-down");
      }
    } else {
      if (icon.classList.contains("fa-chevron-down")) {
        icon.classList.replace("fa-chevron-down", "fa-chevron-up");
      }
    }
  });
}

function collapseAll() {
  dropDownMenus.forEach((menu) => {
    if (!menu.classList.contains("hidden")) {
      menu.classList.add("hidden");
    }
  });
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
  collapseAll();
  featureMenu.classList.toggle("hidden");
  toggleIcon();
});

companyBtn.addEventListener("click", () => {
  collapseAll();
  companyMenu.classList.toggle("hidden");
  toggleIcon();
});
