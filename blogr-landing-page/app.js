const openMenu = document.querySelector(".open-menu");
const closeMenu = document.querySelector(".close-menu");
const navBar = document.querySelector(".nav-bar");
const mobileMenu = document.querySelector(".mobile-menu");
const subMenus = mobileMenu.querySelectorAll(".menubar-item");

openMenu.addEventListener("click", toggleMenu);

closeMenu.addEventListener("click", toggleMenu);

subMenus.forEach((menu) => {
  menu.addEventListener("click", handleSubMenuClick);
});

function toggleMenu() {
  navBar.querySelector(".mobile-menu").classList.toggle("hidden");
  navBar.querySelector(".open-menu").classList.toggle("hidden");
  navBar.querySelector(".close-menu").classList.toggle("hidden");
}

function handleSubMenuClick(event) {
  const targetMenu = event.target.parentElement.nextElementSibling;

  if (!targetMenu.classList.contains("hidden")) {
    targetMenu.classList.add("hidden");
  } else {
    subMenus.forEach((submenu) => {
      submenu.nextElementSibling.classList.add("hidden");
      submenu.querySelector(".icon").classList.remove("rotate-180");
    });

    targetMenu.classList.remove("hidden");
    targetMenu.previousElementSibling
      .querySelector(".icon")
      .classList.add("rotate-180");
  }
}
