let shareBtn = document.querySelector(".share");

let shareActive = document.querySelector(".share-active");

let shareDeskContainer = document.querySelector(".share-desktop-container");

console.log(shareActive);

let aboutContainer = document.querySelector(".about");
let aboutShareContainer = document.querySelector(".about-share");

shareBtn.addEventListener("click", () => {
  if (window.innerWidth < 640) {
    aboutContainer.classList.add("hidden");
    aboutShareContainer.classList.remove("hidden");
    setTimeout(() => {
      aboutShareContainer.classList.add("opacity-100");
    }, 100);
  } else {
    shareDeskContainer.classList.toggle("hidden");
    shareBtn.classList.toggle("active");
    setTimeout(() => {
      shareDeskContainer.classList.toggle("opacity-100");
    }, 100);
  }
});

shareActive.addEventListener("click", () => {
  if (window.innerWidth < 640) {
    aboutContainer.classList.remove("hidden");
    aboutShareContainer.classList.add("hidden");
    setTimeout(() => {
      aboutShareContainer.classList.remove("opacity-100");
    }, 100);
  } else {
  }
});
