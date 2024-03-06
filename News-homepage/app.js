let navbarBtn = document.querySelector(".navbar-btn");
let closeNavBar = document.querySelector(".close-btn");

console.log(navbarBtn);

let navBarMenu = document.querySelector(".navbar-menu");

navbarBtn.addEventListener("click", () => {
  document.body.classList.toggle("overflow-y-hidden");
  document.body.classList.toggle("after:fixed");
  document.body.classList.toggle("after:bg-black/60");
  navBarMenu.classList.remove("-right-[30rem]");
  navBarMenu.classList.add("right-0");
});

closeNavBar.addEventListener("click", () => {
  document.body.classList.toggle("overflow-y-hidden");
  document.body.classList.toggle("after:fixed");
  document.body.classList.toggle("after:bg-black/60");
  navBarMenu.classList.add("-right-[30rem]");
  navBarMenu.classList.remove("right-0");
});
