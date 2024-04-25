const hamBtn = document.querySelector(".ham-btn");
const mobileNav = document.querySelector(".mobile-navbar");


hamBtn.addEventListener("click", () => {
  mobileNav.classList.toggle("open");
});
