let shareBtn = document.querySelector(".share");

let shareActive = document.querySelector(".share-active");

console.log(shareActive);

let aboutContainer = document.querySelector(".about");
let aboutShareContainer = document.querySelector(".about-share");

shareBtn.addEventListener("click", () => {
  if (window.innerWidth <= 640) {
    aboutContainer.classList.add("hidden");
    aboutShareContainer.classList.remove("hidden");
    setTimeout(() => {
      aboutShareContainer.classList.add("opacity-100");
    }, 100);
  } else {
  }
});

shareActive.addEventListener("click", () => {
  if (window.innerWidth <= 640) {
    aboutContainer.classList.add("hidden");
    aboutShareContainer.classList.remove("hidden");
    setTimeout(() => {
      aboutShareContainer.classList.add("opacity-100");
    }, 100);
  } else {
  }
});
