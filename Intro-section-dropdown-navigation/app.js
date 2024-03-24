const menuBtn = document.querySelector(".menu");
const mobileMenuExpand = document.querySelector(".mobile-menu-expand");
const closeMenuBtn = document.querySelector(".close-menu");
const overlay = document.querySelector("#overlay");
const featureBtn = document.querySelector(".features");
const featureMenu = document.querySelector(".feature-menu");
const companyBtn = document.querySelector(".company");
const companyMenu = document.querySelector(".company-menu");

function hideMenu() {
  mobileMenuExpand.classList.add("max-md:hidden");
  overlay.classList.add("hidden");
}

function showMenu() {
  mobileMenuExpand.classList.remove("max-md:hidden");
  overlay.classList.remove("hidden");
}

function toggleIcon(node) {
  const icon = node.querySelector(".toggle-icon");
  if (icon.classList.contains("fa-chevron-down")) {
    icon.classList.remove("fa-chevron-down");
    icon.classList.add("fa-chevron-up");
  } else {
    icon.classList.remove("fa-chevron-up");
    icon.classList.add("fa-chevron-down");
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
  featureMenu.classList.toggle("hidden");
  toggleIcon(featureBtn);
});

companyBtn.addEventListener("click", () => {
  companyMenu.classList.toggle("hidden");
  toggleIcon(companyBtn);
});
